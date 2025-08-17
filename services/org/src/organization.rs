use async_graphql::InputObject;
use async_graphql::dataloader::{DataLoader, Loader};
use async_graphql::{Context, Object};
use chrono::{DateTime, Utc};
use sea_query::Iden;
use sea_query::{Alias, Expr, PostgresQueryBuilder, Query};
use serde::Deserialize;
use sqlx::PgPool;
use std::sync::Arc;
use uuid::Uuid;

/// SQL identifier for `org.organization` table used with SeaQuery builders.
#[derive(Iden)]
pub enum Organization {
    Table,
    Id,
    Name,
    OwnerId,
    CreatedAt,
    UpdatedAt,
}

#[derive(Deserialize, InputObject)]
pub struct InsertOrganization {
    pub name: String,
    pub owner_id: Uuid,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateOrganization {
    pub name: Option<String>,
    pub owner_id: Option<Uuid>,
}

// columns

pub struct OrganizationIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for OrganizationIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from org.organization where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct OrganizationNameLoader {
    conn: PgPool,
}

impl Loader<Uuid> for OrganizationNameLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, name from org.organization where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct OrganizationOwnerIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for OrganizationOwnerIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, owner_id from org.organization where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct OrganizationCreatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for OrganizationCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from org.organization where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct OrganizationUpdatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for OrganizationUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from org.organization where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub fn apply_loaders<S>(
    pool: &sqlx::PgPool,
    schema: async_graphql::SchemaBuilder<(), (), async_graphql::EmptySubscription>,
) -> async_graphql::SchemaBuilder<(), (), async_graphql::EmptySubscription> {
    schema
        .data(DataLoader::new(
            OrganizationIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OrganizationNameLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OrganizationOwnerIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OrganizationCreatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OrganizationUpdatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
}

use auth::users::UsersNode;

// node query

pub struct OrganizationNode {
    pub id: Uuid,
}

#[Object]
impl OrganizationNode {
    async fn id(&self, ctx: &Context<'_>) -> async_graphql::Result<Uuid> {
        let loader = ctx.data::<DataLoader<OrganizationIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn name(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<OrganizationNameLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn owner(&self, ctx: &Context<'_>) -> async_graphql::Result<UsersNode> {
        let loader = ctx.data::<DataLoader<OrganizationOwnerIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .map(|id| UsersNode { id })
            .ok_or_else(|| "Not Found".into())
    }

    async fn created_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<OrganizationCreatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn updated_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<OrganizationUpdatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }
}

// graphql query
#[derive(Debug, Default)]
pub struct OrganizationQuery;

#[Object]
impl OrganizationQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<OrganizationNode>> {
        let conn = ctx.data::<PgPool>()?;

        let sql = Query::select()
            .from(("org", "organization"))
            .column(Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| OrganizationNode { id })
            .collect::<Vec<_>>())
    }

    async fn view(&self, id: Uuid) -> async_graphql::Result<OrganizationNode> {
        Ok(OrganizationNode { id })
    }
}

// graphql mutation
#[derive(Debug, Default)]
pub struct OrganizationMutation;

#[Object]
impl OrganizationMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        input: InsertOrganization,
    ) -> async_graphql::Result<OrganizationNode> {
        let conn = ctx.data::<PgPool>()?;

        let sql = Query::insert()
            .into_table((Alias::new("org"), Organization::Table))
            .columns([Organization::Name, Organization::OwnerId])
            .returning(Query::returning().column(Organization::Id))
            .values([input.name.into(), input.owner_id.to_string().into()])?
            .to_string(PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;

        Ok(OrganizationNode { id })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateOrganization,
    ) -> async_graphql::Result<OrganizationNode> {
        let conn = ctx.data::<PgPool>()?;

        let mut sql = Query::update();

        let mut sql = sql.table((Alias::new("org"), Organization::Table));

        if let Some(name) = input.name {
            sql = sql.value(Organization::Name, name);
        }

        if let Some(owner_id) = input.owner_id {
            sql = sql.value(Organization::OwnerId, owner_id.to_string());
        }

        sql = sql
            .and_where(Expr::col(Organization::Id).eq(id.to_string()))
            .returning(Query::returning().column(Organization::Id));

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql.to_string(PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;

        Ok(OrganizationNode { id })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;

        let sql = Query::delete()
            .from_table((Alias::new("org"), Organization::Table))
            .and_where(Expr::col(Organization::Id).eq(id.to_string()))
            .to_string(PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn).await?;

        if result.rows_affected() != 1 {
            Err("Failed to remove organization".into())
        } else {
            Ok("Organization removed successfully".into())
        }
    }
}
