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

#[derive(Iden)]
pub enum Verification {
    Table,
    Id,
    Identifier,
    Value,
    ExpiresAt,
    CreatedAt,
    UpdatedAt,
}

#[derive(Deserialize, InputObject)]
pub struct InsertVerification {
    pub identifier: String,
    pub value: String,
    pub expires_at: DateTime<Utc>,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateVerification {
    pub identifier: Option<String>,
    pub value: Option<String>,
    pub expires_at: Option<DateTime<Utc>>,
}

// columns

pub struct VerificationIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for VerificationIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from auth.verification where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct VerificationIdentifierLoader {
    conn: PgPool,
}

impl Loader<Uuid> for VerificationIdentifierLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, identifier from auth.verification where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct VerificationValueLoader {
    conn: PgPool,
}

impl Loader<Uuid> for VerificationValueLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, value from auth.verification where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct VerificationExpiresAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for VerificationExpiresAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, expires_at from auth.verification where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct VerificationCreatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for VerificationCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from auth.verification where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct VerificationUpdatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for VerificationUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from auth.verification where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub fn apply_loaders<Q, M>(
    pool: &sqlx::PgPool,
    schema: async_graphql::SchemaBuilder<Q, M, async_graphql::EmptySubscription>,
) -> async_graphql::SchemaBuilder<Q, M, async_graphql::EmptySubscription>
where
    Q: 'static,
    M: 'static,
{
    schema
        .data(DataLoader::new(
            VerificationIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            VerificationIdentifierLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            VerificationValueLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            VerificationExpiresAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            VerificationCreatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            VerificationUpdatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
}

// node query

pub struct VerificationNode {
    id: Uuid,
}

#[Object]
impl VerificationNode {
    async fn id(&self, ctx: &Context<'_>) -> async_graphql::Result<Uuid> {
        let loader = ctx.data::<DataLoader<VerificationIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn identifier(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<VerificationIdentifierLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn value(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<VerificationValueLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn expires_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<VerificationExpiresAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn created_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<VerificationCreatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn updated_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<VerificationUpdatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }
}

// graphql query
#[derive(Debug, Default)]
pub struct VerificationQuery;

#[Object]
impl VerificationQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<VerificationNode>> {
        let conn = ctx.data::<PgPool>()?;

        let sql = Query::select()
            .from(("auth", "verification"))
            .column(Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| VerificationNode { id })
            .collect::<Vec<_>>())
    }

    async fn view(&self, id: Uuid) -> async_graphql::Result<VerificationNode> {
        Ok(VerificationNode { id })
    }
}

// graphql mutation
#[derive(Default)]
pub struct VerificationMutation;

#[Object]
impl VerificationMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        input: InsertVerification,
    ) -> async_graphql::Result<VerificationNode> {
        let conn = ctx.data::<PgPool>()?;

        let sql = Query::insert()
            .into_table((Alias::new("auth"), Verification::Table))
            .columns([
                Verification::Identifier,
                Verification::Value,
                Verification::ExpiresAt,
            ])
            .returning(Query::returning().column(Verification::Id))
            .values([
                input.identifier.into(),
                input.value.into(),
                input.expires_at.to_rfc3339().into(),
            ])?
            .to_string(PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;

        Ok(VerificationNode { id })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateVerification,
    ) -> async_graphql::Result<VerificationNode> {
        let conn = ctx.data::<PgPool>()?;

        let mut sql = Query::update();

        let mut sql = sql.table((Alias::new("auth"), Verification::Table));

        if let Some(identifier) = input.identifier {
            sql = sql.value(Verification::Identifier, identifier);
        }

        if let Some(value) = input.value {
            sql = sql.value(Verification::Value, value);
        }

        if let Some(expires_at) = input.expires_at {
            sql = sql.value(Verification::ExpiresAt, expires_at.to_rfc3339());
        }

        sql = sql
            .and_where(Expr::col(Verification::Id).eq(id.to_string()))
            .returning(Query::returning().column(Verification::Id));

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql.to_string(PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;

        Ok(VerificationNode { id })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;

        let sql = Query::delete()
            .from_table((Alias::new("auth"), Verification::Table))
            .and_where(Expr::col(Verification::Id).eq(id.to_string()))
            .to_string(PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn).await?;

        if result.rows_affected() != 1 {
            Err("Failed to remove verification".into())
        } else {
            Ok("Verification removed successfully".into())
        }
    }
}
