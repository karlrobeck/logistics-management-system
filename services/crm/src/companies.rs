// Auto-generated SeaQuery identifiers for crm.companies
// Source migration: migrations/20250814024259_crm-companies.up.sql

use sea_query::Iden;

use async_graphql::InputObject;
use async_graphql::dataloader::{DataLoader, Loader};
use chrono::{DateTime, Utc};
use serde::Deserialize;
use sqlx::PgPool;
use std::sync::Arc;
use uuid::Uuid;

// Insert / Update InputObjects

#[derive(Deserialize, InputObject)]
pub struct InsertCompanies {
    pub name: String,
    pub description: Option<String>,
    pub email: Option<String>,
    pub website: Option<String>,
    pub industry: Option<String>,
    pub phone_number: Option<String>,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateCompanies {
    pub name: Option<String>,
    pub description: Option<Option<String>>,
    pub email: Option<Option<String>>,
    pub website: Option<Option<String>>,
    pub industry: Option<Option<String>>,
    pub phone_number: Option<Option<String>>,
}

// SQL identifier for `crm.companies` table.
#[derive(Iden)]
pub enum Companies {
    Table,
    Id,
    Name,
    Description,
    Email,
    Website,
    Industry,
    PhoneNumber,
    CreatedAt,
    UpdatedAt,
}

// DataLoaders - per column
pub struct CompanyIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for CompanyIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from crm.companies where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CompanyNameLoader {
    conn: PgPool,
}

impl Loader<Uuid> for CompanyNameLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, name from crm.companies where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CompanyDescriptionLoader {
    conn: PgPool,
}

impl Loader<Uuid> for CompanyDescriptionLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, description from crm.companies where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CompanyEmailLoader {
    conn: PgPool,
}

impl Loader<Uuid> for CompanyEmailLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, email from crm.companies where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CompanyWebsiteLoader {
    conn: PgPool,
}

impl Loader<Uuid> for CompanyWebsiteLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, website from crm.companies where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CompanyIndustryLoader {
    conn: PgPool,
}

impl Loader<Uuid> for CompanyIndustryLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, industry from crm.companies where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CompanyPhoneNumberLoader {
    conn: PgPool,
}

impl Loader<Uuid> for CompanyPhoneNumberLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, phone_number from crm.companies where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CompanyCreatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for CompanyCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from crm.companies where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CompanyUpdatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for CompanyUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from crm.companies where id = ANY($1)",
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
            CompanyIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CompanyNameLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CompanyDescriptionLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CompanyEmailLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CompanyWebsiteLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CompanyIndustryLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CompanyPhoneNumberLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CompanyCreatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CompanyUpdatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
}

use async_graphql::{Context, Object};

// Companies node
pub struct CompaniesNode {
    pub id: Uuid,
}

#[Object]
impl CompaniesNode {
    async fn id(&self, ctx: &Context<'_>) -> async_graphql::Result<Uuid> {
        let loader = ctx.data::<DataLoader<CompanyIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn name(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<CompanyNameLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn description(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<CompanyDescriptionLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn email(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<CompanyEmailLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn website(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<CompanyWebsiteLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn industry(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<CompanyIndustryLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn phone_number(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<CompanyPhoneNumberLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn created_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<CompanyCreatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn updated_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<CompanyUpdatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }
}

impl CompaniesNode {
    pub fn new(id: Uuid) -> Self {
        CompaniesNode { id }
    }
}

// Companies query
#[derive(Debug, Default)]
pub struct CompaniesQuery;

#[Object]
impl CompaniesQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<CompaniesNode>> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::select()
            .from(("crm", "companies"))
            .column(sea_query::Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| CompaniesNode { id })
            .collect::<Vec<_>>())
    }

    async fn view(&self, id: Uuid) -> async_graphql::Result<CompaniesNode> {
        Ok(CompaniesNode { id })
    }
}

// Companies mutations
#[derive(Debug, Default)]
pub struct CompaniesMutation;

#[Object]
impl CompaniesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        input: InsertCompanies,
    ) -> async_graphql::Result<CompaniesNode> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::insert()
            .into_table(("crm", "companies"))
            .columns([
                Companies::Name,
                Companies::Description,
                Companies::Email,
                Companies::Website,
                Companies::Industry,
                Companies::PhoneNumber,
            ])
            .returning(sea_query::Query::returning().column(Companies::Id))
            .values([
                input.name.into(),
                input.description.into(),
                input.email.into(),
                input.website.into(),
                input.industry.into(),
                input.phone_number.into(),
            ])?
            .to_string(sea_query::PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;

        Ok(CompaniesNode { id })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateCompanies,
    ) -> async_graphql::Result<CompaniesNode> {
        let conn = ctx.data::<PgPool>()?;

        let mut upd = sea_query::Query::update();
        let mut upd = upd.table(("crm", "companies"));

        if let Some(name) = input.name {
            upd = upd.value(Companies::Name, name);
        }

        if let Some(description) = input.description {
            upd = upd.value(Companies::Description, description);
        }

        if let Some(email) = input.email {
            upd = upd.value(Companies::Email, email);
        }

        if let Some(website) = input.website {
            upd = upd.value(Companies::Website, website);
        }

        if let Some(industry) = input.industry {
            upd = upd.value(Companies::Industry, industry);
        }

        if let Some(phone_number) = input.phone_number {
            upd = upd.value(Companies::PhoneNumber, phone_number);
        }

        upd = upd
            .and_where(sea_query::Expr::col(Companies::Id).eq(id.to_string()))
            .returning(sea_query::Query::returning().column(Companies::Id));

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&upd.to_string(sea_query::PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;

        Ok(CompaniesNode { id })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::delete()
            .from_table(("crm", "companies"))
            .and_where(sea_query::Expr::col(Companies::Id).eq(id.to_string()))
            .to_string(sea_query::PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn).await?;

        if result.rows_affected() != 1 {
            Err("Failed to remove company".into())
        } else {
            Ok("Company removed successfully".into())
        }
    }
}
