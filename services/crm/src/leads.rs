// Auto-generated SeaQuery identifiers for crm.leads
// Source migration: migrations/20250814024544_crm-leads.up.sql

use sea_query::Iden;

use async_graphql::Enum;
use async_graphql::InputObject;
use async_graphql::dataloader::{DataLoader, Loader};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use std::sync::Arc;
use uuid::Uuid;

/// Rust representation of Postgres enum `crm.lead_status`.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Serialize, Enum)]
pub enum LeadStatus {
    New,
    Qualified,
    Contacted,
    Unqualified,
}

// Insert / Update InputObjects

#[derive(Deserialize, InputObject)]
pub struct InsertLeads {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub phone_number: Option<String>,
    pub company_name: Option<String>,
    pub lead_source: Option<String>,
    pub lead_status: LeadStatus,
    pub lead_score: Option<i32>,
    pub converted_to_contact_id: Option<Uuid>,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateLeads {
    pub first_name: Option<String>,
    pub last_name: Option<String>,
    pub email: Option<String>,
    pub phone_number: Option<Option<String>>,
    pub company_name: Option<Option<String>>,
    pub lead_source: Option<Option<String>>,
    pub lead_status: Option<LeadStatus>,
    pub lead_score: Option<i32>,
    pub converted_to_contact_id: Option<Option<Uuid>>,
}

// SQL identifier for `crm.leads` table.
#[derive(Iden)]
pub enum Leads {
    Table,
    Id,
    FirstName,
    LastName,
    Email,
    PhoneNumber,
    CompanyName,
    LeadSource,
    LeadStatus,
    LeadScore,
    ConvertedToContactId,
    CreatedAt,
    UpdatedAt,
}

// DataLoaders - per column
pub struct LeadIdLoader {
    conn: PgPool,
}
impl Loader<Uuid> for LeadIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from crm.leads where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct LeadFirstNameLoader {
    conn: PgPool,
}
impl Loader<Uuid> for LeadFirstNameLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, first_name from crm.leads where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct LeadLastNameLoader {
    conn: PgPool,
}
impl Loader<Uuid> for LeadLastNameLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, last_name from crm.leads where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct LeadEmailLoader {
    conn: PgPool,
}
impl Loader<Uuid> for LeadEmailLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, email from crm.leads where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct LeadPhoneLoader {
    conn: PgPool,
}
impl Loader<Uuid> for LeadPhoneLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, phone_number from crm.leads where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct LeadCompanyNameLoader {
    conn: PgPool,
}
impl Loader<Uuid> for LeadCompanyNameLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, company_name from crm.leads where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct LeadLeadSourceLoader {
    conn: PgPool,
}
impl Loader<Uuid> for LeadLeadSourceLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, lead_source from crm.leads where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct LeadStatusLoader {
    conn: PgPool,
}
impl Loader<Uuid> for LeadStatusLoader {
    type Error = Arc<sqlx::Error>;
    type Value = LeadStatus;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        let rows = sqlx::query_as::<_, (Uuid, String)>(
            "select id, lead_status::text from crm.leads where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?;

        Ok(rows
            .into_iter()
            .map(|(id, s)| {
                let st = match s.as_str() {
                    "new" => LeadStatus::New,
                    "qualified" => LeadStatus::Qualified,
                    "contacted" => LeadStatus::Contacted,
                    "unqualified" => LeadStatus::Unqualified,
                    _ => LeadStatus::New,
                };
                (id, st)
            })
            .collect())
    }
}

pub struct LeadScoreLoader {
    conn: PgPool,
}
impl Loader<Uuid> for LeadScoreLoader {
    type Error = Arc<sqlx::Error>;
    type Value = i32;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, lead_score from crm.leads where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct LeadConvertedToContactLoader {
    conn: PgPool,
}
impl Loader<Uuid> for LeadConvertedToContactLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<Uuid>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, converted_to_contact_id from crm.leads where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct LeadCreatedAtLoader {
    conn: PgPool,
}
impl Loader<Uuid> for LeadCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from crm.leads where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct LeadUpdatedAtLoader {
    conn: PgPool,
}
impl Loader<Uuid> for LeadUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from crm.leads where id = ANY($1)",
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
            LeadIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            LeadFirstNameLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            LeadLastNameLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            LeadEmailLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            LeadPhoneLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            LeadCompanyNameLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            LeadLeadSourceLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            LeadStatusLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            LeadScoreLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            LeadConvertedToContactLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            LeadCreatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            LeadUpdatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
}

use crate::contacts::ContactsNode;
use async_graphql::{Context, Object};

// Leads node
pub struct LeadsNode {
    pub id: Uuid,
}

impl LeadsNode {
    pub fn new(id: Uuid) -> Self {
        LeadsNode { id }
    }
}

#[Object]
impl LeadsNode {
    async fn id(&self, ctx: &Context<'_>) -> async_graphql::Result<Uuid> {
        let loader = ctx.data::<DataLoader<LeadIdLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn first_name(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<LeadFirstNameLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn last_name(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<LeadLastNameLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn email(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<LeadEmailLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn phone_number(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<LeadPhoneLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn company_name(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<LeadCompanyNameLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn lead_source(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<LeadLeadSourceLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn lead_status(&self, ctx: &Context<'_>) -> async_graphql::Result<LeadStatus> {
        let loader = ctx.data::<DataLoader<LeadStatusLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn lead_score(&self, ctx: &Context<'_>) -> async_graphql::Result<i32> {
        let loader = ctx.data::<DataLoader<LeadScoreLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn converted_to_contact(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<ContactsNode>> {
        let loader = ctx.data::<DataLoader<LeadConvertedToContactLoader>>()?;
        match loader.load_one(self.id).await? {
            Some(opt) => match opt {
                Some(cid) => Ok(Some(ContactsNode::new(cid))),
                None => Ok(None),
            },
            None => Ok(None),
        }
    }

    async fn created_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<LeadCreatedAtLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn updated_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<LeadUpdatedAtLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }
}

// Leads query
#[derive(Debug, Default)]
pub struct LeadsQuery;

#[Object]
impl LeadsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<LeadsNode>> {
        let conn = ctx.data::<PgPool>()?;
        let sql = sea_query::Query::select()
            .from(("crm", "leads"))
            .column(sea_query::Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| LeadsNode { id })
            .collect::<Vec<_>>())
    }

    async fn view(&self, id: Uuid) -> async_graphql::Result<LeadsNode> {
        Ok(LeadsNode { id })
    }
}

// Leads mutations
#[derive(Debug, Default)]
pub struct LeadsMutation;

impl LeadsMutation {
    fn status_to_text(s: LeadStatus) -> &'static str {
        match s {
            LeadStatus::New => "new",
            LeadStatus::Qualified => "qualified",
            LeadStatus::Contacted => "contacted",
            LeadStatus::Unqualified => "unqualified",
        }
    }
}

#[Object]
impl LeadsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        input: InsertLeads,
    ) -> async_graphql::Result<LeadsNode> {
        let conn = ctx.data::<PgPool>()?;

        let status_text = Self::status_to_text(input.lead_status);

        let converted_val: Option<String> = input.converted_to_contact_id.map(|u| u.to_string());

        let sql = sea_query::Query::insert()
            .into_table(("crm", "leads"))
            .columns([
                Leads::FirstName,
                Leads::LastName,
                Leads::Email,
                Leads::PhoneNumber,
                Leads::CompanyName,
                Leads::LeadSource,
                Leads::LeadStatus,
                Leads::LeadScore,
                Leads::ConvertedToContactId,
            ])
            .returning(sea_query::Query::returning().column(Leads::Id))
            .values([
                input.first_name.into(),
                input.last_name.into(),
                input.email.into(),
                input.phone_number.into(),
                input.company_name.into(),
                input.lead_source.into(),
                status_text.into(),
                input.lead_score.into(),
                converted_val.into(),
            ])?
            .to_string(sea_query::PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;

        Ok(LeadsNode { id })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateLeads,
    ) -> async_graphql::Result<LeadsNode> {
        let conn = ctx.data::<PgPool>()?;

        let mut upd = sea_query::Query::update();
        let mut upd = upd.table(("crm", "leads"));

        if let Some(first_name) = input.first_name {
            upd = upd.value(Leads::FirstName, first_name);
        }

        if let Some(last_name) = input.last_name {
            upd = upd.value(Leads::LastName, last_name);
        }

        if let Some(email) = input.email {
            upd = upd.value(Leads::Email, email);
        }

        if let Some(phone_number_opt) = input.phone_number {
            upd = upd.value(Leads::PhoneNumber, phone_number_opt);
        }

        if let Some(company_name_opt) = input.company_name {
            upd = upd.value(Leads::CompanyName, company_name_opt);
        }

        if let Some(lead_source_opt) = input.lead_source {
            upd = upd.value(Leads::LeadSource, lead_source_opt);
        }

        if let Some(lead_status) = input.lead_status {
            let status_text = Self::status_to_text(lead_status);
            upd = upd.value(Leads::LeadStatus, status_text);
        }

        if let Some(lead_score) = input.lead_score {
            upd = upd.value(Leads::LeadScore, lead_score);
        }

        if let Some(converted_opt) = input.converted_to_contact_id {
            match converted_opt {
                Some(cid) => upd = upd.value(Leads::ConvertedToContactId, cid.to_string()),
                None => upd = upd.value(Leads::ConvertedToContactId, None::<String>),
            }
        }

        upd = upd
            .and_where(sea_query::Expr::col(Leads::Id).eq(id.to_string()))
            .returning(sea_query::Query::returning().column(Leads::Id));

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&upd.to_string(sea_query::PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;

        Ok(LeadsNode { id })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::delete()
            .from_table(("crm", "leads"))
            .and_where(sea_query::Expr::col(Leads::Id).eq(id.to_string()))
            .to_string(sea_query::PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn).await?;

        if result.rows_affected() != 1 {
            Err("Failed to remove lead".into())
        } else {
            Ok("Lead removed successfully".into())
        }
    }
}
