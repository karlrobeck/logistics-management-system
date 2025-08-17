// Auto-generated SeaQuery identifiers for crm.opportunities
// Source migration: migrations/20250814024927_crm-opportunities.up.sql

use sea_query::Iden;

use async_graphql::dataloader::{DataLoader, Loader};
use async_graphql::{Enum, InputObject};
use chrono::{DateTime, NaiveDate, Utc};
use serde::Deserialize;
use sqlx::PgPool;
use std::sync::Arc;
use uuid::Uuid;

// Enum for opportunity stage
#[derive(Debug, Clone, Copy, PartialEq, Eq, Enum, Deserialize)]
pub enum OpportunityStage {
    #[graphql(name = "prospecting")]
    Prospecting,
    #[graphql(name = "qualification")]
    Qualification,
    #[graphql(name = "proposal")]
    Proposal,
    #[graphql(name = "closed-won")]
    ClosedWon,
    #[graphql(name = "closed-lost")]
    ClosedLost,
}

impl From<OpportunityStage> for String {
    fn from(stage: OpportunityStage) -> Self {
        match stage {
            OpportunityStage::Prospecting => "prospecting".to_string(),
            OpportunityStage::Qualification => "qualification".to_string(),
            OpportunityStage::Proposal => "proposal".to_string(),
            OpportunityStage::ClosedWon => "closed-won".to_string(),
            OpportunityStage::ClosedLost => "closed-lost".to_string(),
        }
    }
}

// Insert / Update InputObjects

#[derive(Deserialize, InputObject)]
pub struct InsertOpportunities {
    pub name: String,
    pub company_id: Option<Uuid>,
    pub primary_contact_id: Option<Uuid>,
    pub stage: OpportunityStage,
    pub amount: Option<f64>,
    pub close_date: Option<NaiveDate>,
    pub probability: Option<f64>,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateOpportunities {
    pub name: Option<String>,
    pub company_id: Option<Option<Uuid>>,
    pub primary_contact_id: Option<Option<Uuid>>,
    pub stage: Option<OpportunityStage>,
    pub amount: Option<f64>,
    pub close_date: Option<Option<NaiveDate>>,
    pub probability: Option<f64>,
}

// SQL identifier for `crm.opportunities` table.
#[derive(Iden)]
pub enum Opportunities {
    Table,
    Id,
    Name,
    CompanyId,
    PrimaryContactId,
    Stage,
    Amount,
    CloseDate,
    Probability,
    CreatedAt,
    UpdatedAt,
}

// DataLoaders - per column
pub struct OpportunityIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for OpportunityIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from crm.opportunities where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct OpportunityNameLoader {
    conn: PgPool,
}

impl Loader<Uuid> for OpportunityNameLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, name from crm.opportunities where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct OpportunityCompanyIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for OpportunityCompanyIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<Uuid>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, company_id from crm.opportunities where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct OpportunityPrimaryContactIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for OpportunityPrimaryContactIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<Uuid>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, primary_contact_id from crm.opportunities where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct OpportunityStageLoader {
    conn: PgPool,
}

impl Loader<Uuid> for OpportunityStageLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, stage::text from crm.opportunities where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct OpportunityAmountLoader {
    conn: PgPool,
}

impl Loader<Uuid> for OpportunityAmountLoader {
    type Error = Arc<sqlx::Error>;
    type Value = f64;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, amount from crm.opportunities where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct OpportunityCloseDateLoader {
    conn: PgPool,
}

impl Loader<Uuid> for OpportunityCloseDateLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<NaiveDate>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, close_date from crm.opportunities where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct OpportunityProbabilityLoader {
    conn: PgPool,
}

impl Loader<Uuid> for OpportunityProbabilityLoader {
    type Error = Arc<sqlx::Error>;
    type Value = f64;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, probability from crm.opportunities where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct OpportunityCreatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for OpportunityCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from crm.opportunities where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct OpportunityUpdatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for OpportunityUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from crm.opportunities where id = ANY($1)",
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
            OpportunityIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OpportunityNameLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OpportunityCompanyIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OpportunityPrimaryContactIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OpportunityStageLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OpportunityAmountLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OpportunityCloseDateLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OpportunityProbabilityLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OpportunityCreatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OpportunityUpdatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
}

use crate::companies::CompaniesNode;
use crate::contacts::ContactsNode;
use async_graphql::{Context, Object};

// Opportunities node
pub struct OpportunitiesNode {
    pub id: Uuid,
}

#[Object]
impl OpportunitiesNode {
    async fn id(&self, ctx: &Context<'_>) -> async_graphql::Result<Uuid> {
        let loader = ctx.data::<DataLoader<OpportunityIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn name(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<OpportunityNameLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn company(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<CompaniesNode>> {
        let loader = ctx.data::<DataLoader<OpportunityCompanyIdLoader>>()?;

        let company_id = loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))?;

        Ok(company_id.map(|id| CompaniesNode { id }))
    }

    async fn primary_contact(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<ContactsNode>> {
        let loader = ctx.data::<DataLoader<OpportunityPrimaryContactIdLoader>>()?;

        let contact_id = loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))?;

        Ok(contact_id.map(|id| ContactsNode { id }))
    }

    async fn stage(&self, ctx: &Context<'_>) -> async_graphql::Result<OpportunityStage> {
        let loader = ctx.data::<DataLoader<OpportunityStageLoader>>()?;

        let stage_str = loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))?;

        match stage_str.as_str() {
            "prospecting" => Ok(OpportunityStage::Prospecting),
            "qualification" => Ok(OpportunityStage::Qualification),
            "proposal" => Ok(OpportunityStage::Proposal),
            "closed-won" => Ok(OpportunityStage::ClosedWon),
            "closed-lost" => Ok(OpportunityStage::ClosedLost),
            _ => Err(async_graphql::Error::new("Invalid opportunity stage")),
        }
    }

    async fn amount(&self, ctx: &Context<'_>) -> async_graphql::Result<f64> {
        let loader = ctx.data::<DataLoader<OpportunityAmountLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn close_date(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<NaiveDate>> {
        let loader = ctx.data::<DataLoader<OpportunityCloseDateLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn probability(&self, ctx: &Context<'_>) -> async_graphql::Result<f64> {
        let loader = ctx.data::<DataLoader<OpportunityProbabilityLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn created_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<OpportunityCreatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn updated_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<OpportunityUpdatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }
}

impl OpportunitiesNode {
    pub fn new(id: Uuid) -> Self {
        OpportunitiesNode { id }
    }
}

// Opportunities query
#[derive(Debug, Default)]
pub struct OpportunitiesQuery;

#[Object]
impl OpportunitiesQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<OpportunitiesNode>> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::select()
            .from(("crm", "opportunities"))
            .column(sea_query::Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| OpportunitiesNode { id })
            .collect::<Vec<_>>())
    }

    async fn view(&self, id: Uuid) -> async_graphql::Result<OpportunitiesNode> {
        Ok(OpportunitiesNode { id })
    }

    async fn by_company(
        &self,
        ctx: &Context<'_>,
        company_id: Uuid,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<OpportunitiesNode>> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::select()
            .from(("crm", "opportunities"))
            .column(sea_query::Alias::new("id"))
            .and_where(sea_query::Expr::col(Opportunities::CompanyId).eq(company_id.to_string()))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| OpportunitiesNode { id })
            .collect::<Vec<_>>())
    }

    async fn by_stage(
        &self,
        ctx: &Context<'_>,
        stage: OpportunityStage,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<OpportunitiesNode>> {
        let conn = ctx.data::<PgPool>()?;

        let stage_str: String = stage.into();
        let sql = sea_query::Query::select()
            .from(("crm", "opportunities"))
            .column(sea_query::Alias::new("id"))
            .and_where(sea_query::Expr::col(Opportunities::Stage).eq(stage_str))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| OpportunitiesNode { id })
            .collect::<Vec<_>>())
    }
}

// Opportunities mutations
#[derive(Debug, Default)]
pub struct OpportunitiesMutation;

#[Object]
impl OpportunitiesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        input: InsertOpportunities,
    ) -> async_graphql::Result<OpportunitiesNode> {
        let conn = ctx.data::<PgPool>()?;

        let stage_str: String = input.stage.into();
        let sql = sea_query::Query::insert()
            .into_table(("crm", "opportunities"))
            .columns([
                Opportunities::Name,
                Opportunities::CompanyId,
                Opportunities::PrimaryContactId,
                Opportunities::Stage,
                Opportunities::Amount,
                Opportunities::CloseDate,
                Opportunities::Probability,
            ])
            .returning(sea_query::Query::returning().column(Opportunities::Id))
            .values([
                input.name.into(),
                input.company_id.map(|id| id.to_string()).into(),
                input.primary_contact_id.map(|id| id.to_string()).into(),
                stage_str.into(),
                input.amount.unwrap_or(0.0).into(),
                input.close_date.map(|d| d.to_string()).into(),
                input.probability.unwrap_or(0.0).into(),
            ])?
            .to_string(sea_query::PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;

        Ok(OpportunitiesNode { id })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateOpportunities,
    ) -> async_graphql::Result<OpportunitiesNode> {
        let conn = ctx.data::<PgPool>()?;

        let mut upd = sea_query::Query::update();
        let mut upd = upd.table(("crm", "opportunities"));

        if let Some(name) = input.name {
            upd = upd.value(Opportunities::Name, name);
        }

        if let Some(company_id) = input.company_id {
            match company_id {
                Some(uuid) => upd = upd.value(Opportunities::CompanyId, uuid.to_string()),
                None => upd = upd.value(Opportunities::CompanyId, Option::<String>::None),
            }
        }

        if let Some(primary_contact_id) = input.primary_contact_id {
            match primary_contact_id {
                Some(uuid) => upd = upd.value(Opportunities::PrimaryContactId, uuid.to_string()),
                None => upd = upd.value(Opportunities::PrimaryContactId, Option::<String>::None),
            }
        }

        if let Some(stage) = input.stage {
            let stage_str: String = stage.into();
            upd = upd.value(Opportunities::Stage, stage_str);
        }

        if let Some(amount) = input.amount {
            upd = upd.value(Opportunities::Amount, amount);
        }

        if let Some(close_date) = input.close_date {
            match close_date {
                Some(date) => upd = upd.value(Opportunities::CloseDate, date.to_string()),
                None => upd = upd.value(Opportunities::CloseDate, Option::<String>::None),
            }
        }

        if let Some(probability) = input.probability {
            upd = upd.value(Opportunities::Probability, probability);
        }

        upd = upd
            .and_where(sea_query::Expr::col(Opportunities::Id).eq(id.to_string()))
            .returning(sea_query::Query::returning().column(Opportunities::Id));

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&upd.to_string(sea_query::PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;

        Ok(OpportunitiesNode { id })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::delete()
            .from_table(("crm", "opportunities"))
            .and_where(sea_query::Expr::col(Opportunities::Id).eq(id.to_string()))
            .to_string(sea_query::PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn).await?;

        if result.rows_affected() != 1 {
            Err("Failed to remove opportunity".into())
        } else {
            Ok("Opportunity removed successfully".into())
        }
    }
}
