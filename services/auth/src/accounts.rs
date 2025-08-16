use async_graphql::InputObject;
use chrono::{DateTime, Utc};
use sea_query::Iden;
use serde::Deserialize;
use uuid::Uuid;

#[derive(Iden)]
pub enum Accounts {
    Table,
    Id,
    UserId,
    AccountId,
    ProviderId,
    AccessToken,
    RefreshToken,
    AccessTokenExpiresAt,
    RefreshTokenExpiresAt,
    Scope,
    IdToken,
    Password,
    CreatedAt,
    UpdatedAt,
}

// Iden enum for `auth.accounts` created from migrations/20250813133738_auth-account.up.sql

#[derive(Deserialize, InputObject)]
pub struct InsertAccounts {
    pub user_id: Uuid,
    pub account_id: String,
    pub provider_id: String,
    pub access_token: Option<String>,
    pub refresh_token: Option<String>,
    pub access_token_expires_at: Option<DateTime<Utc>>,
    pub refresh_token_expires_at: Option<DateTime<Utc>>,
    pub scope: Option<String>,
    pub id_token: Option<String>,
    pub password: Option<String>,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateAccounts {
    pub user_id: Option<Uuid>,
    pub account_id: Option<String>,
    pub provider_id: Option<String>,
    pub access_token: Option<Option<String>>,
    pub refresh_token: Option<Option<String>>,
    pub access_token_expires_at: Option<Option<DateTime<Utc>>>,
    pub refresh_token_expires_at: Option<Option<DateTime<Utc>>>,
    pub scope: Option<Option<String>>,
    pub id_token: Option<Option<String>>,
    pub password: Option<Option<String>>,
}

// columns

use async_graphql::dataloader::{DataLoader, Loader};
use async_graphql::{Context, Object};
use sea_query::{Alias, Expr, PostgresQueryBuilder, Query};
use sqlx::PgPool;
use std::sync::Arc;

use crate::users::UsersNode;

pub struct AccountIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for AccountIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from auth.accounts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct AccountUserIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for AccountUserIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, user_id from auth.accounts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct AccountAccountIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for AccountAccountIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, account_id from auth.accounts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct AccountProviderIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for AccountProviderIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, provider_id from auth.accounts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct AccountAccessTokenLoader {
    conn: PgPool,
}

impl Loader<Uuid> for AccountAccessTokenLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, access_token from auth.accounts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct AccountRefreshTokenLoader {
    conn: PgPool,
}

impl Loader<Uuid> for AccountRefreshTokenLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, refresh_token from auth.accounts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct AccountAccessTokenExpiresAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for AccountAccessTokenExpiresAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<DateTime<Utc>>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, access_token_expires_at from auth.accounts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct AccountRefreshTokenExpiresAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for AccountRefreshTokenExpiresAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<DateTime<Utc>>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, refresh_token_expires_at from auth.accounts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct AccountScopeLoader {
    conn: PgPool,
}

impl Loader<Uuid> for AccountScopeLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, scope from auth.accounts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct AccountIdTokenLoader {
    conn: PgPool,
}

impl Loader<Uuid> for AccountIdTokenLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id_token from auth.accounts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct AccountPasswordLoader {
    conn: PgPool,
}

impl Loader<Uuid> for AccountPasswordLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, password from auth.accounts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct AccountCreatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for AccountCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from auth.accounts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct AccountUpdatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for AccountUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from auth.accounts where id = ANY($1)",
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
            AccountIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            AccountUserIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            AccountAccountIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            AccountProviderIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            AccountAccessTokenLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            AccountRefreshTokenLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            AccountAccessTokenExpiresAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            AccountRefreshTokenExpiresAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            AccountScopeLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            AccountIdTokenLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            AccountPasswordLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            AccountCreatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            AccountUpdatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
}

// node query

pub struct AccountsNode {
    id: Uuid,
}

#[Object]
impl AccountsNode {
    async fn id(&self, ctx: &Context<'_>) -> async_graphql::Result<Uuid> {
        let loader = ctx.data::<DataLoader<AccountIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn user(&self, ctx: &Context<'_>) -> async_graphql::Result<UsersNode> {
        let loader = ctx.data::<DataLoader<AccountUserIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .map(|id| UsersNode { id })
            .ok_or_else(|| "Not Found".into())
    }

    async fn account_id(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<AccountAccountIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn provider_id(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<AccountProviderIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn access_token(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<AccountAccessTokenLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn refresh_token(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<AccountRefreshTokenLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn access_token_expires_at(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<DateTime<Utc>>> {
        let loader = ctx.data::<DataLoader<AccountAccessTokenExpiresAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn refresh_token_expires_at(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<DateTime<Utc>>> {
        let loader = ctx.data::<DataLoader<AccountRefreshTokenExpiresAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn scope(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<AccountScopeLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn id_token(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<AccountIdTokenLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn password(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<AccountPasswordLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn created_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<AccountCreatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn updated_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<AccountUpdatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }
}

// graphql query
#[derive(Debug, Default)]
pub struct AccountsQuery;

#[Object]
impl AccountsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<AccountsNode>> {
        let conn = ctx.data::<PgPool>()?;

        let sql = Query::select()
            .from(("auth", "accounts"))
            .column(Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| AccountsNode { id })
            .collect::<Vec<_>>())
    }

    async fn view(&self, id: Uuid) -> async_graphql::Result<AccountsNode> {
        Ok(AccountsNode { id })
    }
}

// graphql mutation
#[derive(Debug, Default)]
pub struct AccountsMutation;

#[Object]
impl AccountsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        input: InsertAccounts,
    ) -> async_graphql::Result<AccountsNode> {
        let conn = ctx.data::<PgPool>()?;

        let sql = Query::insert()
            .into_table((Alias::new("auth"), Accounts::Table))
            .columns([
                Accounts::UserId,
                Accounts::AccountId,
                Accounts::ProviderId,
                Accounts::AccessToken,
                Accounts::RefreshToken,
                Accounts::AccessTokenExpiresAt,
                Accounts::RefreshTokenExpiresAt,
                Accounts::Scope,
                Accounts::IdToken,
                Accounts::Password,
            ])
            .returning(Query::returning().column(Accounts::Id))
            .values([
                input.user_id.to_string().into(),
                input.account_id.into(),
                input.provider_id.into(),
                input.access_token.into(),
                input.refresh_token.into(),
                input.access_token_expires_at.map(|d| d.to_rfc3339()).into(),
                input
                    .refresh_token_expires_at
                    .map(|d| d.to_rfc3339())
                    .into(),
                input.scope.into(),
                input.id_token.into(),
                input.password.into(),
            ])?
            .to_string(PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;

        Ok(AccountsNode { id })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateAccounts,
    ) -> async_graphql::Result<AccountsNode> {
        let conn = ctx.data::<PgPool>()?;

        let mut sql = Query::update();

        let mut sql = sql.table((Alias::new("auth"), Accounts::Table));

        if let Some(user_id) = input.user_id {
            sql = sql.value(Accounts::UserId, user_id.to_string());
        }

        if let Some(account_id) = input.account_id {
            sql = sql.value(Accounts::AccountId, account_id);
        }

        if let Some(provider_id) = input.provider_id {
            sql = sql.value(Accounts::ProviderId, provider_id);
        }

        if let Some(access_token) = input.access_token {
            sql = sql.value(Accounts::AccessToken, access_token);
        }

        if let Some(refresh_token) = input.refresh_token {
            sql = sql.value(Accounts::RefreshToken, refresh_token);
        }

        if let Some(access_token_expires_at) = input.access_token_expires_at {
            sql = sql.value(
                Accounts::AccessTokenExpiresAt,
                access_token_expires_at.map(|d| d.to_rfc3339()),
            );
        }

        if let Some(refresh_token_expires_at) = input.refresh_token_expires_at {
            sql = sql.value(
                Accounts::RefreshTokenExpiresAt,
                refresh_token_expires_at.map(|d| d.to_rfc3339()),
            );
        }

        if let Some(scope) = input.scope {
            sql = sql.value(Accounts::Scope, scope);
        }

        if let Some(id_token) = input.id_token {
            sql = sql.value(Accounts::IdToken, id_token);
        }

        if let Some(password) = input.password {
            sql = sql.value(Accounts::Password, password);
        }

        sql = sql
            .and_where(Expr::col(Accounts::Id).eq(id.to_string()))
            .returning(Query::returning().column(Accounts::Id));

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql.to_string(PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;

        Ok(AccountsNode { id })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;

        let sql = Query::delete()
            .from_table((Alias::new("auth"), Accounts::Table))
            .and_where(Expr::col(Accounts::Id).eq(id.to_string()))
            .to_string(PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn).await?;

        if result.rows_affected() != 1 {
            Err("Failed to remove account".into())
        } else {
            Ok("Account removed successfully".into())
        }
    }
}
