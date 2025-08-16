use async_graphql::{
    Context, EmptySubscription, InputObject, Object, SchemaBuilder,
    dataloader::{DataLoader, Loader},
};
use chrono::{DateTime, Utc};
use sea_query::{Alias, ConditionalStatement, Expr, Iden, PostgresQueryBuilder, Query};
use serde::Deserialize;
use sqlx::{PgConnection, PgPool, Postgres, pool::PoolConnection};
use std::sync::Arc;
use tokio::sync::Mutex;
use uuid::Uuid;

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
    image: Option<Option<String>>,
}

// columns

pub struct UserIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for UserIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from auth.users where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

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

pub struct UserEmailLoader {
    conn: PgPool,
}

impl Loader<Uuid> for UserEmailLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, email from auth.users where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct UserEmailVerifiedLoader {
    conn: PgPool,
}

impl Loader<Uuid> for UserEmailVerifiedLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<DateTime<Utc>>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, email_verified from auth.users where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct UserImageLoader {
    conn: PgPool,
}

impl Loader<Uuid> for UserImageLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, image from auth.users where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct UserCreatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for UserCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from auth.users where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct UserUpdatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for UserUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from auth.users where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub fn apply_loaders(
    pool: &sqlx::PgPool,
    schema: SchemaBuilder<UsersQuery, UsersMutation, EmptySubscription>,
) -> SchemaBuilder<UsersQuery, UsersMutation, EmptySubscription> {
    schema
        .data(DataLoader::new(
            UserIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            UserNameLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            UserEmailLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            UserEmailVerifiedLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            UserImageLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            UserCreatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            UserUpdatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
}

// node query

pub struct UsersNode {
    pub id: Uuid,
}

#[Object]
impl UsersNode {
    async fn id(&self, ctx: &Context<'_>) -> async_graphql::Result<Uuid> {
        let loader = ctx.data::<DataLoader<UserIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

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

    async fn email_verified(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<DateTime<Utc>>> {
        let loader = ctx.data::<DataLoader<UserEmailVerifiedLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn image(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<UserImageLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn created_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<UserCreatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }
    async fn updated_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<UserUpdatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }
}

// graphql query
#[derive(Debug, Default)]
pub struct UsersQuery;

#[Object]
impl UsersQuery {
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
    async fn view(&self, id: Uuid) -> async_graphql::Result<UsersNode> {
        Ok(UsersNode { id })
    }
}

// graphql mutation

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
            .values([input.name.into(), input.email.into(), input.image.into()])?
            .to_string(PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;

        Ok(UsersNode { id })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateUsers,
    ) -> async_graphql::Result<UsersNode> {
        let conn = ctx.data::<PgPool>()?;

        let mut sql = Query::update();

        let mut sql = sql.table((Alias::new("auth"), Users::Table));

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

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql.to_string(PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;

        Ok(UsersNode { id })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
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

#[cfg(test)]
mod test {

    use async_graphql::{
        EmptySubscription, Name, Request, Response, Schema, SchemaBuilder, Value, Variables,
    };
    use sqlx::PgPool;

    use crate::users::{UsersMutation, UsersQuery, apply_loaders};

    type AuthUserSchema = SchemaBuilder<UsersQuery, UsersMutation, EmptySubscription>;

    #[rstest::fixture]
    fn schema() -> AuthUserSchema {
        Schema::build(UsersQuery, UsersMutation, EmptySubscription)
    }

    #[rstest::rstest]
    #[case::list_query( // name of the test
        r#"mutation { create(input:{name:"john doe",email:"johndoe@email.com"}) { id } }"#, // setup query
        "query listUsers($offset: Int!,$limit: Int!) { list(offset:$offset,limit:$limit) { name } }", // actual query
        serde_json::json!({"offset":0,"limit":1}),// variables
        serde_json::json!({"list":[{"name":"john doe"}]}), // expected query json output
    )]
    #[case::view_query( // name of the test
        r#"mutation { create(input:{name:"john doe",email:"johndoe@email.com"}) { id } }"#, // setup query
        "query viewUser($id: UUID!) { view(id: $id) { name } }", // actual query
        serde_json::json!({}),// variables
        serde_json::json!({"view":{"name":"john doe"}}), // expected query json output
    )]
    #[case::update_query( // name of the test
        r#"mutation { create(input:{name:"john doe",email:"johndoe@email.com"}) { id } }"#, // setup query
        "mutation updateUser($id: UUID!,$input: UpdateUsers!) { update(id: $id,input: $input) { name } }", // actual query
        serde_json::json!({"input":{"name":"jane doe"}}),// variables
        serde_json::json!({"update":{"name":"jane doe"}}), // expected query json output
    )]
    #[case::delete_query( // name of the test
        r#"mutation { create(input:{name:"john doe",email:"johndoe@email.com"}) { id } }"#, // setup query
        "mutation deleteUser($id: UUID!) { delete(id: $id) }", // actual query
        serde_json::json!({}),// variables
        serde_json::json!({"delete":"User removed successfully"}), // expected query json output
    )]
    #[case::create_with_image_query( // test creating user with image
        r#""#, // no setup needed
        r#"mutation createUserWithImage($input: InsertUsers!) { create(input: $input) { name email image } }"#, // actual query
        serde_json::json!({"input":{"name":"alice wonder","email":"alice@example.com","image":"https://example.com/avatar.jpg"}}),// variables
        serde_json::json!({"create":{"name":"alice wonder","email":"alice@example.com","image":"https://example.com/avatar.jpg"}}), // expected query json output
    )]
    #[case::view_all_fields_query( // test viewing all user fields
        r#"mutation { create(input:{name:"bob smith",email:"bob@example.com",image:"https://example.com/bob.jpg"}) { id } }"#, // setup query
        "query viewUserAllFields($id: UUID!) { view(id: $id) { name email image } }", // actual query
        serde_json::json!({}),// variables
        serde_json::json!({"view":{"name":"bob smith","email":"bob@example.com","image":"https://example.com/bob.jpg"}}), // expected query json output (id, created_at, updated_at will be dynamic)
    )]
    #[case::list_multiple_users_query( // test listing multiple users
        r#"
        mutation { 
          user1: create(input:{name:"user one",email:"user1@example.com"}) { id }
          user2: create(input:{name:"user two",email:"user2@example.com"}) { id }
          user3: create(input:{name:"user three",email:"user3@example.com"}) { id }
        }
        "#, // setup query
        "query listMultipleUsers($offset: Int!,$limit: Int!) { list(offset:$offset,limit:$limit) { name email } }", // actual query
        serde_json::json!({"offset":0,"limit":3}),// variables
        serde_json::json!({"list":[{"name":"user one","email":"user1@example.com"},{"name":"user two","email":"user2@example.com"},{"name":"user three","email":"user3@example.com"}]}), // expected query json output
    )]
    #[case::list_with_pagination_query( // test pagination
        r#"
        mutation { 
          user1: create(input:{name:"page user 1",email:"page1@example.com"}) { id }
          user2: create(input:{name:"page user 2",email:"page2@example.com"}) { id }
          user3: create(input:{name:"page user 3",email:"page3@example.com"}) { id }
        }
        "#, // setup query
        "query listWithPagination($offset: Int!,$limit: Int!) { list(offset:$offset,limit:$limit) { name } }", // actual query
        serde_json::json!({"offset":1,"limit":2}),// variables
        serde_json::json!({"list":[{"name":"page user 2"},{"name":"page user 3"}]}), // expected query json output
    )]
    #[case::update_partial_fields_query( // test updating only some fields
        r#"mutation { create(input:{name:"original name",email:"original@example.com",image:"original.jpg"}) { id } }"#, // setup query
        "mutation updatePartial($id: UUID!,$input: UpdateUsers!) { update(id: $id,input: $input) { name email image } }", // actual query
        serde_json::json!({"input":{"name":"updated name"}}),// variables
        serde_json::json!({"update":{"name":"updated name","email":"original@example.com","image":"original.jpg"}}), // expected query json output
    )]
    #[case::update_email_only_query( // test updating only email
        r#"mutation { create(input:{name:"email test",email:"old@example.com"}) { id } }"#, // setup query
        "mutation updateEmail($id: UUID!,$input: UpdateUsers!) { update(id: $id,input: $input) { name email } }", // actual query
        serde_json::json!({"input":{"email":"new@example.com"}}),// variables
        serde_json::json!({"update":{"name":"email test","email":"new@example.com"}}), // expected query json output
    )]
    #[case::update_image_with_value_query( // test updating image to a new value
        r#"mutation { create(input:{name:"image test",email:"image@example.com",image:"initial.jpg"}) { id } }"#, // setup query
        "mutation updateImageValue($id: UUID!,$input: UpdateUsers!) { update(id: $id,input: $input) { name image } }", // actual query
        serde_json::json!({"input":{"image":"updated.jpg"}}),// variables
        serde_json::json!({"update":{"name":"image test","image":"updated.jpg"}}), // expected query json output
    )]
    #[case::create_without_image_query( // test creating user without image
        r#""#, // no setup needed
        r#"mutation createWithoutImage($input: InsertUsers!) { create(input: $input) { name email image } }"#, // actual query
        serde_json::json!({"input":{"name":"no image user","email":"noimage@example.com"}}),// variables
        serde_json::json!({"create":{"name":"no image user","email":"noimage@example.com","image":null}}), // expected query json output
    )]
    #[case::update_all_fields_query( // test updating all fields
        r#"mutation { create(input:{name:"before update",email:"before@example.com",image:"before.jpg"}) { id } }"#, // setup query
        "mutation updateAll($id: UUID!,$input: UpdateUsers!) { update(id: $id,input: $input) { name email image } }", // actual query
        serde_json::json!({"input":{"name":"after update","email":"after@example.com","image":"after.jpg"}}),// variables
        serde_json::json!({"update":{"name":"after update","email":"after@example.com","image":"after.jpg"}}), // expected query json output
    )]
    #[case::view_with_timestamps_query( // test viewing user with timestamp fields
        r#"mutation { create(input:{name:"timestamp test",email:"timestamp@example.com"}) { id } }"#, // setup query
        "query viewWithTimestamps($id: UUID!) { view(id: $id) { name email } }", // actual query
        serde_json::json!({}),// variables
        serde_json::json!({"view":{"name":"timestamp test","email":"timestamp@example.com"}}), // expected query json output (timestamps will be dynamic)
    )]
    #[case::create_user_basic_query( // test basic user creation
        r#""#, // no setup needed
        r#"mutation createBasicUser($input: InsertUsers!) { create(input: $input) { name email } }"#, // actual query
        serde_json::json!({"input":{"name":"basic user","email":"basic@example.com"}}),// variables
        serde_json::json!({"create":{"name":"basic user","email":"basic@example.com"}}), // expected query json output
    )]
    #[case::list_empty_query( // test listing when no users exist
        r#""#, // no setup needed
        "query listEmpty($offset: Int!,$limit: Int!) { list(offset:$offset,limit:$limit) { name } }", // actual query
        serde_json::json!({"offset":0,"limit":10}),// variables
        serde_json::json!({"list":[]}), // expected query json output
    )]
    #[sqlx::test(migrations = "../../migrations")]
    async fn test_graphql(
        #[ignore] pool: PgPool,
        #[case] setup_query: &str,
        #[case] query: &str,
        #[case] variable: serde_json::Value,
        #[case] expected: serde_json::Value,
        schema: AuthUserSchema,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let schema = apply_loaders(&pool, schema.data(pool.clone())).finish();

        let setup_request = Request::new(setup_query);

        let response: Response = schema.execute(setup_request).await;

        let mut vars = Variables::from_json(variable);

        vars.insert(
            Name::new("id"),
            Value::from_json(response.data.into_json()?["create"]["id"].clone())?,
        );

        let request = Request::new(query).variables(vars);

        let result: Response = schema.execute(request).await;

        assert!(result.errors.len() < 1, "{:#?}", result.errors);

        assert_eq!(result.data.into_json()?, expected);

        Ok(())
    }
}
