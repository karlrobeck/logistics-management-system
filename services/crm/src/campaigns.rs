// Auto-generated SeaQuery identifiers for crm.campaigns and crm.campaign_contacts
// Source migration: migrations/20250814025703_crm-campaigns.up.sql

use sea_query::Iden;

use async_graphql::dataloader::{DataLoader, Loader};
use async_graphql::{Enum, InputObject};
use chrono::{DateTime, NaiveDate, Utc};
use serde::Deserialize;
use sqlx::PgPool;
use std::sync::Arc;
use uuid::Uuid;

// Campaign status enum
#[derive(Debug, Clone, Copy, PartialEq, Eq, Enum, Deserialize)]
pub enum CampaignStatus {
    #[graphql(name = "planned")]
    Planned,
    #[graphql(name = "active")]
    Active,
    #[graphql(name = "completed")]
    Completed,
    #[graphql(name = "paused")]
    Paused,
}

impl From<CampaignStatus> for String {
    fn from(s: CampaignStatus) -> Self {
        match s {
            CampaignStatus::Planned => "planned".to_string(),
            CampaignStatus::Active => "active".to_string(),
            CampaignStatus::Completed => "completed".to_string(),
            CampaignStatus::Paused => "paused".to_string(),
        }
    }
}

// Campaign-contacts status enum
#[derive(Debug, Clone, Copy, PartialEq, Eq, Enum, Deserialize)]
pub enum CampaignContactStatus {
    #[graphql(name = "sent")]
    Sent,
    #[graphql(name = "opened")]
    Opened,
    #[graphql(name = "clicked")]
    Clicked,
    #[graphql(name = "responded")]
    Responded,
    #[graphql(name = "unsubscribe")]
    Unsubscribe,
}

impl From<CampaignContactStatus> for String {
    fn from(s: CampaignContactStatus) -> Self {
        match s {
            CampaignContactStatus::Sent => "sent".to_string(),
            CampaignContactStatus::Opened => "opened".to_string(),
            CampaignContactStatus::Clicked => "clicked".to_string(),
            CampaignContactStatus::Responded => "responded".to_string(),
            CampaignContactStatus::Unsubscribe => "unsubscribe".to_string(),
        }
    }
}

// Insert / Update InputObjects for campaigns
#[derive(Deserialize, InputObject)]
pub struct InsertCampaigns {
    pub name: String,
    pub description: Option<String>,
    pub start_date: NaiveDate,
    pub end_date: Option<NaiveDate>,
    pub budget: Option<f64>,
    pub status: CampaignStatus,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateCampaigns {
    pub name: Option<String>,
    pub description: Option<Option<String>>,
    pub start_date: Option<NaiveDate>,
    pub end_date: Option<Option<NaiveDate>>,
    pub budget: Option<f64>,
    pub status: Option<CampaignStatus>,
}

// Insert / Update InputObjects for campaign_contacts
#[derive(Deserialize, InputObject)]
pub struct InsertCampaignContacts {
    pub campaign_id: Uuid,
    pub contact_id: Uuid,
    pub status: CampaignContactStatus,
    pub interaction_date: Option<DateTime<Utc>>,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateCampaignContacts {
    pub campaign_id: Option<Uuid>,
    pub contact_id: Option<Uuid>,
    pub status: Option<CampaignContactStatus>,
    pub interaction_date: Option<Option<DateTime<Utc>>>,
}

// SQL identifiers
#[derive(Iden)]
pub enum Campaigns {
    Table,
    Id,
    Name,
    Description,
    StartDate,
    EndDate,
    Budget,
    Status,
    CreatedAt,
    UpdatedAt,
}

#[derive(Iden)]
pub enum CampaignContacts {
    Table,
    Id,
    CampaignId,
    ContactId,
    Status,
    InteractionDate,
    CreatedAt,
    UpdatedAt,
}

// DataLoaders for campaigns
pub struct CampaignIdLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CampaignIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from crm.campaigns where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CampaignNameLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CampaignNameLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, name from crm.campaigns where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CampaignDescriptionLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CampaignDescriptionLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, description from crm.campaigns where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CampaignStartDateLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CampaignStartDateLoader {
    type Error = Arc<sqlx::Error>;
    type Value = NaiveDate;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, start_date from crm.campaigns where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CampaignEndDateLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CampaignEndDateLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<NaiveDate>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, end_date from crm.campaigns where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CampaignBudgetLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CampaignBudgetLoader {
    type Error = Arc<sqlx::Error>;
    type Value = f64;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, budget from crm.campaigns where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CampaignStatusLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CampaignStatusLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, status::text from crm.campaigns where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CampaignCreatedAtLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CampaignCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from crm.campaigns where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CampaignUpdatedAtLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CampaignUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from crm.campaigns where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

// DataLoaders for campaign_contacts
pub struct CampaignContactIdLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CampaignContactIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from crm.campaign_contacts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CampaignContactCampaignIdLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CampaignContactCampaignIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, campaign_id from crm.campaign_contacts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CampaignContactContactIdLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CampaignContactContactIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, contact_id from crm.campaign_contacts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CampaignContactStatusLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CampaignContactStatusLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, status::text from crm.campaign_contacts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CampaignContactInteractionDateLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CampaignContactInteractionDateLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<DateTime<Utc>>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, interaction_date from crm.campaign_contacts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CampaignContactCreatedAtLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CampaignContactCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from crm.campaign_contacts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CampaignContactUpdatedAtLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CampaignContactUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from crm.campaign_contacts where id = ANY($1)",
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
            CampaignIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CampaignNameLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CampaignDescriptionLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CampaignStartDateLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CampaignEndDateLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CampaignBudgetLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CampaignStatusLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CampaignCreatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CampaignUpdatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CampaignContactIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CampaignContactCampaignIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CampaignContactContactIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CampaignContactStatusLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CampaignContactInteractionDateLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CampaignContactCreatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CampaignContactUpdatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
}

use crate::contacts::ContactsNode;
use async_graphql::{Context, Object};

// Campaigns node
pub struct CampaignsNode {
    pub id: Uuid,
}

#[Object]
impl CampaignsNode {
    async fn id(&self, ctx: &Context<'_>) -> async_graphql::Result<Uuid> {
        let loader = ctx.data::<DataLoader<CampaignIdLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn name(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<CampaignNameLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn description(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<CampaignDescriptionLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn start_date(&self, ctx: &Context<'_>) -> async_graphql::Result<NaiveDate> {
        let loader = ctx.data::<DataLoader<CampaignStartDateLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn end_date(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<NaiveDate>> {
        let loader = ctx.data::<DataLoader<CampaignEndDateLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn budget(&self, ctx: &Context<'_>) -> async_graphql::Result<f64> {
        let loader = ctx.data::<DataLoader<CampaignBudgetLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn status(&self, ctx: &Context<'_>) -> async_graphql::Result<CampaignStatus> {
        let loader = ctx.data::<DataLoader<CampaignStatusLoader>>()?;
        let s = loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))?;
        match s.as_str() {
            "planned" => Ok(CampaignStatus::Planned),
            "active" => Ok(CampaignStatus::Active),
            "completed" => Ok(CampaignStatus::Completed),
            "paused" => Ok(CampaignStatus::Paused),
            _ => Err(async_graphql::Error::new("Invalid campaign status")),
        }
    }

    async fn created_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<CampaignCreatedAtLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn updated_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<CampaignUpdatedAtLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }
}

impl CampaignsNode {
    pub fn new(id: Uuid) -> Self {
        CampaignsNode { id }
    }
}

// Campaigns query and mutation
#[derive(Debug, Default)]
pub struct CampaignsQuery;

#[Object]
impl CampaignsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<CampaignsNode>> {
        let conn = ctx.data::<PgPool>()?;
        let sql = sea_query::Query::select()
            .from(("crm", "campaigns"))
            .column(sea_query::Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);
        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| CampaignsNode { id })
            .collect::<Vec<_>>())
    }

    async fn view(&self, id: Uuid) -> async_graphql::Result<CampaignsNode> {
        Ok(CampaignsNode { id })
    }

    async fn by_status(
        &self,
        ctx: &Context<'_>,
        status: CampaignStatus,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<CampaignsNode>> {
        let conn = ctx.data::<PgPool>()?;
        let s: String = status.into();
        let sql = sea_query::Query::select()
            .from(("crm", "campaigns"))
            .column(sea_query::Alias::new("id"))
            .and_where(sea_query::Expr::col(Campaigns::Status).eq(s))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);
        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| CampaignsNode { id })
            .collect::<Vec<_>>())
    }
}

#[derive(Debug, Default)]
pub struct CampaignsMutation;

#[Object]
impl CampaignsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        input: InsertCampaigns,
    ) -> async_graphql::Result<CampaignsNode> {
        let conn = ctx.data::<PgPool>()?;
        let status_str: String = input.status.into();
        let sql = sea_query::Query::insert()
            .into_table(("crm", "campaigns"))
            .columns([
                Campaigns::Name,
                Campaigns::Description,
                Campaigns::StartDate,
                Campaigns::EndDate,
                Campaigns::Budget,
                Campaigns::Status,
            ])
            .returning(sea_query::Query::returning().column(Campaigns::Id))
            .values([
                input.name.into(),
                input.description.into(),
                input.start_date.to_string().into(),
                input.end_date.map(|d| d.to_string()).into(),
                input.budget.unwrap_or(0.0).into(),
                status_str.into(),
            ])?
            .to_string(sea_query::PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;
        Ok(CampaignsNode { id })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateCampaigns,
    ) -> async_graphql::Result<CampaignsNode> {
        let conn = ctx.data::<PgPool>()?;
        let mut upd = sea_query::Query::update();
        let mut upd = upd.table(("crm", "campaigns"));

        if let Some(name) = input.name {
            upd = upd.value(Campaigns::Name, name);
        }
        if let Some(description) = input.description {
            upd = upd.value(Campaigns::Description, description);
        }
        if let Some(start_date) = input.start_date {
            upd = upd.value(Campaigns::StartDate, start_date.to_string());
        }
        if let Some(end_date) = input.end_date {
            match end_date {
                Some(d) => upd = upd.value(Campaigns::EndDate, d.to_string()),
                None => upd = upd.value(Campaigns::EndDate, Option::<String>::None),
            }
        }
        if let Some(budget) = input.budget {
            upd = upd.value(Campaigns::Budget, budget);
        }
        if let Some(status) = input.status {
            let s: String = status.into();
            upd = upd.value(Campaigns::Status, s);
        }

        upd = upd
            .and_where(sea_query::Expr::col(Campaigns::Id).eq(id.to_string()))
            .returning(sea_query::Query::returning().column(Campaigns::Id));
        let (id,) = sqlx::query_as::<_, (Uuid,)>(&upd.to_string(sea_query::PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;
        Ok(CampaignsNode { id })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;
        let sql = sea_query::Query::delete()
            .from_table(("crm", "campaigns"))
            .and_where(sea_query::Expr::col(Campaigns::Id).eq(id.to_string()))
            .to_string(sea_query::PostgresQueryBuilder);
        let result = sqlx::query(&sql).execute(conn).await?;
        if result.rows_affected() != 1 {
            Err("Failed to remove campaign".into())
        } else {
            Ok("Campaign removed successfully".into())
        }
    }
}

// CampaignContacts node
pub struct CampaignContactsNode {
    pub id: Uuid,
}

#[Object]
impl CampaignContactsNode {
    async fn id(&self, ctx: &Context<'_>) -> async_graphql::Result<Uuid> {
        let loader = ctx.data::<DataLoader<CampaignContactIdLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn campaign(&self, ctx: &Context<'_>) -> async_graphql::Result<CampaignsNode> {
        let loader = ctx.data::<DataLoader<CampaignContactCampaignIdLoader>>()?;
        let cid = loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))?;
        Ok(CampaignsNode { id: cid })
    }

    async fn contact(&self, ctx: &Context<'_>) -> async_graphql::Result<ContactsNode> {
        let loader = ctx.data::<DataLoader<CampaignContactContactIdLoader>>()?;
        let cid = loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))?;
        Ok(ContactsNode { id: cid })
    }

    async fn status(&self, ctx: &Context<'_>) -> async_graphql::Result<CampaignContactStatus> {
        let loader = ctx.data::<DataLoader<CampaignContactStatusLoader>>()?;
        let s = loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))?;
        match s.as_str() {
            "sent" => Ok(CampaignContactStatus::Sent),
            "opened" => Ok(CampaignContactStatus::Opened),
            "clicked" => Ok(CampaignContactStatus::Clicked),
            "responded" => Ok(CampaignContactStatus::Responded),
            "unsubscribe" => Ok(CampaignContactStatus::Unsubscribe),
            _ => Err(async_graphql::Error::new("Invalid status")),
        }
    }

    async fn interaction_date(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<DateTime<Utc>>> {
        let loader = ctx.data::<DataLoader<CampaignContactInteractionDateLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn created_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<CampaignContactCreatedAtLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn updated_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<CampaignContactUpdatedAtLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }
}

impl CampaignContactsNode {
    pub fn new(id: Uuid) -> Self {
        CampaignContactsNode { id }
    }
}

#[derive(Debug, Default)]
pub struct CampaignContactsQuery;

#[Object]
impl CampaignContactsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<CampaignContactsNode>> {
        let conn = ctx.data::<PgPool>()?;
        let sql = sea_query::Query::select()
            .from(("crm", "campaign_contacts"))
            .column(sea_query::Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);
        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| CampaignContactsNode { id })
            .collect::<Vec<_>>())
    }

    async fn view(&self, id: Uuid) -> async_graphql::Result<CampaignContactsNode> {
        Ok(CampaignContactsNode { id })
    }

    async fn by_campaign(
        &self,
        ctx: &Context<'_>,
        campaign_id: Uuid,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<CampaignContactsNode>> {
        let conn = ctx.data::<PgPool>()?;
        let sql = sea_query::Query::select()
            .from(("crm", "campaign_contacts"))
            .column(sea_query::Alias::new("id"))
            .and_where(
                sea_query::Expr::col(CampaignContacts::CampaignId).eq(campaign_id.to_string()),
            )
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);
        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| CampaignContactsNode { id })
            .collect::<Vec<_>>())
    }

    async fn by_contact(
        &self,
        ctx: &Context<'_>,
        contact_id: Uuid,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<CampaignContactsNode>> {
        let conn = ctx.data::<PgPool>()?;
        let sql = sea_query::Query::select()
            .from(("crm", "campaign_contacts"))
            .column(sea_query::Alias::new("id"))
            .and_where(sea_query::Expr::col(CampaignContacts::ContactId).eq(contact_id.to_string()))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);
        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| CampaignContactsNode { id })
            .collect::<Vec<_>>())
    }

    async fn by_status(
        &self,
        ctx: &Context<'_>,
        status: CampaignContactStatus,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<CampaignContactsNode>> {
        let conn = ctx.data::<PgPool>()?;
        let s: String = status.into();
        let sql = sea_query::Query::select()
            .from(("crm", "campaign_contacts"))
            .column(sea_query::Alias::new("id"))
            .and_where(sea_query::Expr::col(CampaignContacts::Status).eq(s))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);
        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| CampaignContactsNode { id })
            .collect::<Vec<_>>())
    }
}

#[derive(Debug, Default)]
pub struct CampaignContactsMutation;

#[Object]
impl CampaignContactsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        input: InsertCampaignContacts,
    ) -> async_graphql::Result<CampaignContactsNode> {
        let conn = ctx.data::<PgPool>()?;
        let s: String = input.status.into();
        let sql = sea_query::Query::insert()
            .into_table(("crm", "campaign_contacts"))
            .columns([
                CampaignContacts::CampaignId,
                CampaignContacts::ContactId,
                CampaignContacts::Status,
                CampaignContacts::InteractionDate,
            ])
            .returning(sea_query::Query::returning().column(CampaignContacts::Id))
            .values([
                input.campaign_id.to_string().into(),
                input.contact_id.to_string().into(),
                s.into(),
                input.interaction_date.map(|d| d.to_rfc3339()).into(),
            ])?
            .to_string(sea_query::PostgresQueryBuilder);
        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;
        Ok(CampaignContactsNode { id })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateCampaignContacts,
    ) -> async_graphql::Result<CampaignContactsNode> {
        let conn = ctx.data::<PgPool>()?;
        let mut upd = sea_query::Query::update();
        let mut upd = upd.table(("crm", "campaign_contacts"));
        if let Some(campaign_id) = input.campaign_id {
            upd = upd.value(CampaignContacts::CampaignId, campaign_id.to_string());
        }
        if let Some(contact_id) = input.contact_id {
            upd = upd.value(CampaignContacts::ContactId, contact_id.to_string());
        }
        if let Some(status) = input.status {
            let s: String = status.into();
            upd = upd.value(CampaignContacts::Status, s);
        }
        if let Some(interaction_date) = input.interaction_date {
            match interaction_date {
                Some(d) => upd = upd.value(CampaignContacts::InteractionDate, d.to_rfc3339()),
                None => upd = upd.value(CampaignContacts::InteractionDate, Option::<String>::None),
            }
        }
        upd = upd
            .and_where(sea_query::Expr::col(CampaignContacts::Id).eq(id.to_string()))
            .returning(sea_query::Query::returning().column(CampaignContacts::Id));
        let (id,) = sqlx::query_as::<_, (Uuid,)>(&upd.to_string(sea_query::PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;
        Ok(CampaignContactsNode { id })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;
        let sql = sea_query::Query::delete()
            .from_table(("crm", "campaign_contacts"))
            .and_where(sea_query::Expr::col(CampaignContacts::Id).eq(id.to_string()))
            .to_string(sea_query::PostgresQueryBuilder);
        let result = sqlx::query(&sql).execute(conn).await?;
        if result.rows_affected() != 1 {
            Err("Failed to remove campaign_contact".into())
        } else {
            Ok("Campaign contact removed successfully".into())
        }
    }
}
