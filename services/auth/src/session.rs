use async_graphql::InputObject;
use chrono::{DateTime, Utc};
use sea_query::Iden;
use serde::Deserialize;
use uuid::Uuid;

use async_graphql::dataloader::{DataLoader, Loader};
use async_graphql::{Context, Object};
use sea_query::{Alias, Expr, PostgresQueryBuilder, Query};
use sqlx::PgPool;
use std::sync::Arc;

#[derive(Iden)]
pub enum Sessions {
    Table,
    Id,
    UserId,
    Token,
    ExpiresAt,
    IpAddress,
    UserAgent,
    CreatedAt,
    UpdatedAt,
}

// Iden enum for `auth.sessions` created from migrations/20250813133540_auth-session.up.sql

#[derive(Deserialize, InputObject)]
pub struct InsertSessions {
    pub user_id: Uuid,
    pub token: String,
    pub expires_at: DateTime<Utc>,
    pub ip_address: Option<String>,
    pub user_agent: Option<String>,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateSessions {
    pub user_id: Option<Uuid>,
    pub token: Option<String>,
    pub expires_at: Option<DateTime<Utc>>,
    pub ip_address: Option<Option<String>>,
    pub user_agent: Option<Option<String>>,
}

// columns

pub struct SessionIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for SessionIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from auth.sessions where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct SessionUserIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for SessionUserIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, user_id from auth.sessions where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct SessionTokenLoader {
    conn: PgPool,
}

impl Loader<Uuid> for SessionTokenLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, token from auth.sessions where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct SessionExpiresAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for SessionExpiresAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, expires_at from auth.sessions where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct SessionIpAddressLoader {
    conn: PgPool,
}

impl Loader<Uuid> for SessionIpAddressLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, ip_address from auth.sessions where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct SessionUserAgentLoader {
    conn: PgPool,
}

impl Loader<Uuid> for SessionUserAgentLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, user_agent from auth.sessions where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct SessionCreatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for SessionCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from auth.sessions where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct SessionUpdatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for SessionUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from auth.sessions where id = ANY($1)",
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
            SessionIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            SessionUserIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            SessionTokenLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            SessionExpiresAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            SessionIpAddressLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            SessionUserAgentLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            SessionCreatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            SessionUpdatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
}

// node query

pub struct SessionsNode {
    id: Uuid,
}

#[Object]
impl SessionsNode {
    async fn id(&self, ctx: &Context<'_>) -> async_graphql::Result<Uuid> {
        let loader = ctx.data::<DataLoader<SessionIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn user(&self, ctx: &Context<'_>) -> async_graphql::Result<crate::users::UsersNode> {
        let loader = ctx.data::<DataLoader<SessionUserIdLoader>>()?;

        let user_id = loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))?;

        Ok(crate::users::UsersNode { id: user_id })
    }

    async fn token(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<SessionTokenLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn expires_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<SessionExpiresAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn ip_address(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<SessionIpAddressLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn user_agent(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<SessionUserAgentLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn created_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<SessionCreatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn updated_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<SessionUpdatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }
}

// graphql query
pub struct SessionsQuery;

#[Object]
impl SessionsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<SessionsNode>> {
        let conn = ctx.data::<PgPool>()?;

        let sql = Query::select()
            .from(("auth", "sessions"))
            .column(Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| SessionsNode { id })
            .collect::<Vec<_>>())
    }

    async fn view(&self, id: Uuid) -> async_graphql::Result<SessionsNode> {
        Ok(SessionsNode { id })
    }
}

// graphql mutation

pub struct SessionsMutation;

#[Object]
impl SessionsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        input: InsertSessions,
    ) -> async_graphql::Result<SessionsNode> {
        let conn = ctx.data::<PgPool>()?;

        let sql = Query::insert()
            .into_table((Alias::new("auth"), Sessions::Table))
            .columns([
                Sessions::UserId,
                Sessions::Token,
                Sessions::ExpiresAt,
                Sessions::IpAddress,
                Sessions::UserAgent,
            ])
            .returning(Query::returning().column(Sessions::Id))
            .values([
                input.user_id.to_string().into(),
                input.token.into(),
                input.expires_at.to_rfc3339().into(),
                input.ip_address.into(),
                input.user_agent.into(),
            ])?
            .to_string(PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;

        Ok(SessionsNode { id })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateSessions,
    ) -> async_graphql::Result<SessionsNode> {
        let conn = ctx.data::<PgPool>()?;

        let mut sql = Query::update();

        let mut sql = sql.table((Alias::new("auth"), Sessions::Table));

        if let Some(user_id) = input.user_id {
            sql = sql.value(Sessions::UserId, user_id.to_string());
        }

        if let Some(token) = input.token {
            sql = sql.value(Sessions::Token, token);
        }

        if let Some(expires_at) = input.expires_at {
            sql = sql.value(Sessions::ExpiresAt, expires_at.to_rfc3339());
        }

        if let Some(ip_address) = input.ip_address {
            sql = sql.value(Sessions::IpAddress, ip_address);
        }

        if let Some(user_agent) = input.user_agent {
            sql = sql.value(Sessions::UserAgent, user_agent);
        }

        sql = sql
            .and_where(Expr::col(Sessions::Id).eq(id.to_string()))
            .returning(Query::returning().column(Sessions::Id));

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql.to_string(PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;

        Ok(SessionsNode { id })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;

        let sql = Query::delete()
            .from_table((Alias::new("auth"), Sessions::Table))
            .and_where(Expr::col(Sessions::Id).eq(id.to_string()))
            .to_string(PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn).await?;

        if result.rows_affected() != 1 {
            Err("Failed to remove session".into())
        } else {
            Ok("Session removed successfully".into())
        }
    }
}
