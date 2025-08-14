use async_graphql::{
    Context, InputObject, Object,
    dataloader::{DataLoader, Loader},
};
use chrono::{DateTime, Utc};
use sea_query::{Alias, ConditionalStatement, Expr, Iden, PostgresQueryBuilder, Query};
use serde::Deserialize;
use sqlx::PgConnection;
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
    conn: Arc<Mutex<PgConnection>>,
}

impl Loader<Uuid> for UserIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        let mut mutex_conn = self.conn.lock().await;

        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from auth.users where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(mutex_conn.as_mut())
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct UserNameLoader {
    conn: Arc<Mutex<PgConnection>>,
}

impl Loader<Uuid> for UserNameLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        let mut mutex_conn = self.conn.lock().await;

        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, name from auth.users where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(mutex_conn.as_mut())
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct UserEmailLoader {
    conn: Arc<Mutex<PgConnection>>,
}

impl Loader<Uuid> for UserEmailLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        let mut mutex_conn = self.conn.lock().await;

        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, email from auth.users where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(mutex_conn.as_mut())
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct UserEmailVerifiedLoader {
    conn: Arc<Mutex<PgConnection>>,
}

impl Loader<Uuid> for UserEmailVerifiedLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<DateTime<Utc>>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        let mut mutex_conn = self.conn.lock().await;

        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, email_verified from auth.users where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(mutex_conn.as_mut())
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct UserImageLoader {
    conn: Arc<Mutex<PgConnection>>,
}

impl Loader<Uuid> for UserImageLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        let mut mutex_conn = self.conn.lock().await;

        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, image from auth.users where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(mutex_conn.as_mut())
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct UserCreatedAtLoader {
    conn: Arc<Mutex<PgConnection>>,
}

impl Loader<Uuid> for UserCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        let mut mutex_conn = self.conn.lock().await;

        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from auth.users where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(mutex_conn.as_mut())
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct UserUpdatedAtLoader {
    conn: Arc<Mutex<PgConnection>>,
}

impl Loader<Uuid> for UserUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        let mut mutex_conn = self.conn.lock().await;

        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from auth.users where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(mutex_conn.as_mut())
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

// node query

pub struct UsersNode {
    id: Uuid,
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
pub struct UsersQuery;

#[Object]
impl UsersQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<UsersNode>> {
        let mut conn = ctx.data::<Arc<Mutex<PgConnection>>>()?.lock().await;

        let sql = Query::select()
            .from("auth.users")
            .column(Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn.as_mut())
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

pub struct UsersMutation;

#[Object]
impl UsersMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        input: InsertUsers,
    ) -> async_graphql::Result<UsersNode> {
        let mut conn = ctx.data::<Arc<Mutex<PgConnection>>>()?.lock().await;

        let sql = Query::insert()
            .into_table((Alias::new("auth"), Users::Table))
            .columns([Users::Name, Users::Email, Users::Image])
            .returning(Query::returning().column(Users::Id))
            .values([input.name.into(), input.email.into(), input.image.into()])?
            .to_string(PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_one(conn.as_mut())
            .await?;

        Ok(UsersNode { id })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateUsers,
    ) -> async_graphql::Result<UsersNode> {
        let mut conn = ctx.data::<Arc<Mutex<PgConnection>>>()?.lock().await;

        let mut sql = Query::update();

        let mut sql = sql.from((Alias::new("auth"), Users::Table));

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
            .fetch_one(conn.as_mut())
            .await?;

        Ok(UsersNode { id })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let mut conn = ctx.data::<Arc<Mutex<PgConnection>>>()?.lock().await;

        let sql = Query::delete()
            .from_table((Alias::new("auth"), Users::Table))
            .and_where(Expr::col(Users::Id).eq(id.to_string()))
            .to_string(PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn.as_mut()).await?;

        if result.rows_affected() != 1 {
            Err("Failed to remove user".into())
        } else {
            Ok("User removed successfully".into())
        }
    }
}
