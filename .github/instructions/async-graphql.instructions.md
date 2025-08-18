---
applyTo: "./services/**/*.rs"
---
# Async-GraphQL Best Practices & Guidelines


## Overview
This document outlines best practices for implementing GraphQL schemas and resolvers using the async-graphql crate in our Rust microservices architecture. Each service exports Query/Mutation structs that are aggregated by the Pylon TypeScript gateway.

## Core Architecture Patterns

### Service Structure
Each domain service follows this structure:
```
services/{domain}/
├── Cargo.toml              # Workspace member
├── src/
│   ├── lib.rs              # Domain Query/Mutation exports
│   └── {entity}.rs         # Entity resolvers with async-graphql
```

### Domain Module Exports (`lib.rs`)
```rust
use async_graphql::{MergedObject, SimpleObject};

// Export individual entity queries/mutations
use crate::{
    users::{UsersMutation, UsersQuery},
    sessions::{SessionsMutation, SessionsQuery},
};

pub mod users;
pub mod sessions;

// Aggregate queries using SimpleObject
#[derive(SimpleObject, Default)]
pub struct Query {
    users: UsersQuery,
    sessions: SessionsQuery,
}

// Aggregate mutations using MergedObject for flattening
#[derive(Default, MergedObject)]
pub struct Mutation(
    UsersMutation,
    SessionsMutation,
);
```

**Key Principles:**
- Use `SimpleObject` for Query aggregation (nested structure)
- Use `MergedObject` for Mutation aggregation (flat structure)
- Always implement `Default` trait
- Export both individual modules and aggregated structs

## Entity Implementation Patterns

### Required Imports
```rust
use async_graphql::{
    Context, EmptySubscription, InputObject, Object, SchemaBuilder,
    dataloader::{DataLoader, Loader},
};
use chrono::{DateTime, Utc};
use sea_query::{Alias, Expr, Iden, PostgresQueryBuilder, Query};
use serde::Deserialize;
use sqlx::PgPool;
use std::sync::Arc;
use uuid::Uuid;
```

### Database Schema Definition
```rust
// Use sea-query Iden for type-safe column references
#[derive(Iden)]
pub enum Users {
    Table,
    Id,
    Name,
    Email,
    EmailVerified,
    Image,
    CreatedAt,
    UpdatedAt,
}
```

### Input Types
```rust
// Use InputObject for GraphQL inputs, Deserialize for JSON
#[derive(Deserialize, InputObject)]
pub struct InsertUsers {
    name: String,
    email: String,
    image: Option<String>,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateUsers {
    name: Option<String>,
    email: Option<String>,
    image: Option<Option<String>>, // Option<Option<T>> for nullable updates
}
```

**Guidelines:**
- Always derive both `Deserialize` and `InputObject`
- Use `Option<Option<T>>` for nullable field updates
- Keep input structs focused and minimal
- Use descriptive names: `Insert*`, `Update*`, `Filter*`

## DataLoader Implementation

### Loader Pattern
```rust
pub struct UserNameLoader {
    conn: PgPool,
}

impl Loader<Uuid> for UserNameLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, name from auth.users where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}
```

### Loader Registration
```rust
pub fn apply_loaders(
    pool: &sqlx::PgPool,
    schema: SchemaBuilder<UsersQuery, UsersMutation, EmptySubscription>,
) -> SchemaBuilder<UsersQuery, UsersMutation, EmptySubscription> {
    schema
        .data(DataLoader::new(
            UserNameLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            UserEmailLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        // ... more loaders
}
```

**Best Practices:**
- Create one loader per field that requires database access
- Use `Arc<sqlx::Error>` for error type consistency
- Always use `tokio::spawn` for async executor
- Use SQL `ANY($1)` for batch loading efficiency
- Wrap sqlx errors with `Arc::new` for thread safety

## Node Pattern Implementation

### Node Struct
```rust
pub struct UsersNode {
    pub id: Uuid,
}

#[Object]
impl UsersNode {
    // Use loaders for all field resolution
    async fn name(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<UserNameLoader>>()?;
        
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn email(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<UserEmailLoader>>()?;
        
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }
}
```

**Node Guidelines:**
- Store only the entity ID in the node struct
- Resolve all other fields through DataLoaders
- Use consistent error handling: `"Not Found".into()`
- Make all fields async for uniform interface

## Query Implementation

### Query Struct
```rust
#[derive(Debug, Default)]
pub struct UsersQuery;

#[Object]
impl UsersQuery {
    // List with pagination
    async fn list(
        &self,
        ctx: &Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<UsersNode>> {
        let conn = ctx.data::<PgPool>()?;

        let sql = Query::select()
            .from(("auth", "users"))
            .column(Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| UsersNode { id })
            .collect::<Vec<_>>())
    }

    // Single entity by ID
    async fn view(&self, id: Uuid) -> async_graphql::Result<UsersNode> {
        Ok(UsersNode { id })
    }
}
```

**Query Patterns:**
- Always implement `Debug` and `Default`
- Use sea-query for type-safe SQL generation
- Return only IDs from queries, let loaders handle field resolution
- Include standard operations: `list` (with pagination), `view`
- Use schema-qualified table names: `("auth", "users")`

## Mutation Implementation

### Mutation Struct
```rust
#[derive(Debug, Default)]
pub struct UsersMutation;

#[Object]
impl UsersMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        input: InsertUsers,
    ) -> async_graphql::Result<UsersNode> {
        let conn = ctx.data::<PgPool>()?;

        let sql = Query::insert()
            .into_table((Alias::new("auth"), Users::Table))
            .columns([Users::Name, Users::Email, Users::Image])
            .returning(Query::returning().column(Users::Id))
            .values([
                input.name.into(), 
                input.email.into(), 
                input.image.into()
            ])?
            .to_string(PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_one(conn)
            .await?;

        Ok(UsersNode { id })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateUsers,
    ) -> async_graphql::Result<UsersNode> {
        let conn = ctx.data::<PgPool>()?;

        let mut sql = Query::update()
            .table((Alias::new("auth"), Users::Table));

        // Conditional field updates
        if let Some(name) = input.name {
            sql = sql.value(Users::Name, name);
        }
        if let Some(email) = input.email {
            sql = sql.value(Users::Email, email);
        }
        if let Some(image) = input.image {
            sql = sql.value(Users::Image, image);
        }

        sql = sql
            .and_where(Expr::col(Users::Id).eq(id.to_string()))
            .returning(Query::returning().column(Users::Id));

        let (id,) = sqlx::query_as::<_, (Uuid,)>(
            &sql.to_string(PostgresQueryBuilder)
        )
        .fetch_one(conn)
        .await?;

        Ok(UsersNode { id })
    }

    async fn delete(
        &self, 
        ctx: &Context<'_>, 
        id: Uuid
    ) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;

        let sql = Query::delete()
            .from_table((Alias::new("auth"), Users::Table))
            .and_where(Expr::col(Users::Id).eq(id.to_string()))
            .to_string(PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn).await?;

        if result.rows_affected() != 1 {
            Err("Failed to remove user".into())
        } else {
            Ok("User removed successfully".into())
        }
    }
}
```

**Mutation Guidelines:**
- Always use `RETURNING` clause to get updated entity ID
- Implement conditional updates for partial field updates
- Use descriptive error messages for business logic failures
- Return success messages for delete operations
- Validate rows affected for delete/update operations

## Error Handling

### Consistent Error Patterns
```rust
// DataLoader not found
.ok_or_else(|| "Not Found".into())

// Business logic errors
Err("Failed to remove user".into())

// Database connection errors (auto-handled by ?)
ctx.data::<PgPool>()?

// SQLx query errors (auto-handled by ?)
sqlx::query(&sql).execute(conn).await?
```

**Error Guidelines:**
- Use `?` operator for propagating SQLx and context errors
- Use descriptive error messages for business logic
- Prefer `"Not Found".into()` for missing entities
- Let async-graphql handle error formatting automatically

## Testing Patterns

### Test Structure
```rust
#[cfg(test)]
mod test {
    use async_graphql::{
        EmptySubscription, Request, Schema, SchemaBuilder,
    };
    use sqlx::PgPool;

    use crate::users::{UsersMutation, UsersQuery, apply_loaders};

    type AuthUserSchema = SchemaBuilder<UsersQuery, UsersMutation, EmptySubscription>;

    #[rstest::fixture]
    fn schema() -> AuthUserSchema {
        Schema::build(UsersQuery, UsersMutation, EmptySubscription)
    }

    #[rstest::rstest]
    #[case::list_query(
        r#"mutation { create(input:{name:"john doe",email:"johndoe@email.com"}) { id } }"#, // setup
        "query listUsers($offset: Int!,$limit: Int!) { list(offset:$offset,limit:$limit) { name } }", // query
        serde_json::json!({"offset":0,"limit":1}), // variables
        serde_json::json!({"list":[{"name":"john doe"}]}), // expected
    )]
    async fn test_user_operations(
        #[case] setup_query: &str,
        #[case] test_query: &str,
        #[case] variables: serde_json::Value,
        #[case] expected: serde_json::Value,
        schema: AuthUserSchema,
    ) {
        // Test implementation
    }
}
```

**Testing Guidelines:**
- Use `rstest` for parameterized tests
- Test both setup and actual operations
- Use JSON for variables and expected outputs
- Create type aliases for schema builders
- Focus on integration tests over unit tests

## Performance Optimization

### DataLoader Best Practices
1. **Batch Loading**: Always load multiple entities in single query
2. **Connection Pooling**: Reuse PgPool connections across loaders
3. **Minimal Queries**: Select only required columns
4. **Async Execution**: Use `tokio::spawn` for parallel loading

### Query Optimization
1. **Pagination**: Always implement limit/offset for list queries
2. **Schema Qualification**: Use `("schema", "table")` format
3. **Type Safety**: Use sea-query Iden enums for columns
4. **Connection Reuse**: Extract PgPool from context once per resolver

## Security Considerations

### Context Access
```rust
// Always validate context data access
let conn = ctx.data::<PgPool>()?;
let user_id = ctx.data::<UserId>()?; // For authentication
```

### SQL Injection Prevention
- Use sea-query parameterized queries exclusively
- Never concatenate user input into SQL strings
- Use `.bind()` for dynamic values
- Validate UUIDs and other inputs before query construction

## Common Anti-Patterns to Avoid

### ❌ Don't Do This
```rust
// Direct SQL string concatenation
let sql = format!("SELECT * FROM users WHERE id = '{}'", user_id);

// Synchronous field resolution
fn name(&self) -> String { ... }

// Missing error handling
let loader = ctx.data::<DataLoader<UserLoader>>().unwrap();

// Loading individual fields
async fn name(&self, ctx: &Context<'_>) -> String {
    let conn = ctx.data::<PgPool>().unwrap();
    // Direct database query per field
}
```

### ✅ Do This Instead
```rust
// Use sea-query or parameterized queries
let sql = Query::select()
    .from(Users::Table)
    .and_where(Expr::col(Users::Id).eq(user_id))
    .to_string(PostgresQueryBuilder);

// Async field resolution
async fn name(&self, ctx: &Context<'_>) -> async_graphql::Result<String> { ... }

// Proper error handling
let loader = ctx.data::<DataLoader<UserLoader>>()?;

// Use DataLoaders for efficient batching
async fn name(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
    let loader = ctx.data::<DataLoader<UserNameLoader>>()?;
    loader.load_one(self.id).await?.ok_or_else(|| "Not Found".into())
}
```

## Workspace Dependencies
All services use shared workspace dependencies from root `Cargo.toml`:
- `async-graphql = "7.0.17"` with dataloader, uuid, chrono features
- `sqlx = "0.8.6"` with postgres, uuid, chrono features  
- `sea-query = "0.32.7"` with postgres backend, uuid, chrono features
- `uuid = "1.18.0"` with serde, v4 features
- `chrono = "0.4.41"` with serde features

Follow these patterns consistently across all domain services for maintainable, performant GraphQL APIs.