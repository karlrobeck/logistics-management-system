// Auto-generated SeaQuery identifiers for crm.cases
// Source migration: migrations/20250814030212_crm-cases.up.sql

use sea_query::Iden;

use async_graphql::dataloader::{DataLoader, Loader};
use async_graphql::{Enum, InputObject};
use chrono::{DateTime, Utc};
use serde::Deserialize;
use sqlx::PgPool;
use std::sync::Arc;
use uuid::Uuid;

// Case status enum
#[derive(Debug, Clone, Copy, PartialEq, Eq, Enum, Deserialize)]
pub enum CaseStatus {
    #[graphql(name = "open")]
    Open,
    #[graphql(name = "in_progress")]
    InProgress,
    #[graphql(name = "pending_customer")]
    PendingCustomer,
    #[graphql(name = "closed")]
    Closed,
}

impl From<CaseStatus> for String {
    fn from(s: CaseStatus) -> Self {
        match s {
            CaseStatus::Open => "open".to_string(),
            CaseStatus::InProgress => "in_progress".to_string(),
            CaseStatus::PendingCustomer => "pending_customer".to_string(),
            CaseStatus::Closed => "closed".to_string(),
        }
    }
}

// Case priority enum
#[derive(Debug, Clone, Copy, PartialEq, Eq, Enum, Deserialize)]
pub enum CasePriority {
    #[graphql(name = "low")]
    Low,
    #[graphql(name = "medium")]
    Medium,
    #[graphql(name = "high")]
    High,
    #[graphql(name = "critical")]
    Critical,
}

impl From<CasePriority> for String {
    fn from(p: CasePriority) -> Self {
        match p {
            CasePriority::Low => "low".to_string(),
            CasePriority::Medium => "medium".to_string(),
            CasePriority::High => "high".to_string(),
            CasePriority::Critical => "critical".to_string(),
        }
    }
}

// Input objects
#[derive(Deserialize, InputObject)]
pub struct InsertCases {
    pub subject: String,
    pub description: String,
    pub status: CaseStatus,
    pub priority: CasePriority,
    pub contact_id: Uuid,
    pub closed_at: Option<DateTime<Utc>>,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateCases {
    pub subject: Option<String>,
    pub description: Option<String>,
    pub status: Option<CaseStatus>,
    pub priority: Option<CasePriority>,
    pub contact_id: Option<Uuid>,
    pub closed_at: Option<Option<DateTime<Utc>>>,
}

// SQL identifier
#[derive(Iden)]
pub enum Cases {
    Table,
    Id,
    Subject,
    Description,
    Status,
    Priority,
    ContactId,
    ClosedAt,
    CreatedAt,
    UpdatedAt,
}

// DataLoaders
pub struct CaseIdLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CaseIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from crm.cases where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CaseSubjectLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CaseSubjectLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, subject from crm.cases where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CaseDescriptionLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CaseDescriptionLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, description from crm.cases where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CaseStatusLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CaseStatusLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, status::text from crm.cases where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CasePriorityLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CasePriorityLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, priority::text from crm.cases where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CaseContactIdLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CaseContactIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, contact_id from crm.cases where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CaseClosedAtLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CaseClosedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<DateTime<Utc>>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, closed_at from crm.cases where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CaseCreatedAtLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CaseCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from crm.cases where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct CaseUpdatedAtLoader {
    conn: PgPool,
}
impl Loader<Uuid> for CaseUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from crm.cases where id = ANY($1)",
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
            CaseIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CaseSubjectLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CaseDescriptionLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CaseStatusLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CasePriorityLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CaseContactIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CaseClosedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CaseCreatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            CaseUpdatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
}

use crate::contacts::ContactsNode;
use async_graphql::{Context, Object};

// Cases node
pub struct CasesNode {
    pub id: Uuid,
}

#[Object]
impl CasesNode {
    async fn id(&self, ctx: &Context<'_>) -> async_graphql::Result<Uuid> {
        let loader = ctx.data::<DataLoader<CaseIdLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn subject(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<CaseSubjectLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn description(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<CaseDescriptionLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn status(&self, ctx: &Context<'_>) -> async_graphql::Result<CaseStatus> {
        let loader = ctx.data::<DataLoader<CaseStatusLoader>>()?;
        let s = loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))?;
        match s.as_str() {
            "open" => Ok(CaseStatus::Open),
            "in_progress" => Ok(CaseStatus::InProgress),
            "pending_customer" => Ok(CaseStatus::PendingCustomer),
            "closed" => Ok(CaseStatus::Closed),
            _ => Err(async_graphql::Error::new("Unknown status")),
        }
    }

    async fn priority(&self, ctx: &Context<'_>) -> async_graphql::Result<CasePriority> {
        let loader = ctx.data::<DataLoader<CasePriorityLoader>>()?;
        let p = loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))?;
        match p.as_str() {
            "low" => Ok(CasePriority::Low),
            "medium" => Ok(CasePriority::Medium),
            "high" => Ok(CasePriority::High),
            "critical" => Ok(CasePriority::Critical),
            _ => Err(async_graphql::Error::new("Unknown priority")),
        }
    }

    async fn contact(&self, ctx: &Context<'_>) -> async_graphql::Result<ContactsNode> {
        let loader = ctx.data::<DataLoader<CaseContactIdLoader>>()?;
        let id = loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))?;
        Ok(ContactsNode { id })
    }

    async fn closed_at(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<DateTime<Utc>>> {
        let loader = ctx.data::<DataLoader<CaseClosedAtLoader>>()?;
        Ok(loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))?)
    }

    async fn created_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<CaseCreatedAtLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn updated_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<CaseUpdatedAtLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }
}

// Query and Mutation
#[derive(Debug, Default)]
pub struct CasesQuery;

#[Object]
impl CasesQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<CasesNode>> {
        let conn = ctx.data::<PgPool>()?;
        let sql = sea_query::Query::select()
            .from(("crm", Cases::Table))
            .column(sea_query::Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| CasesNode { id })
            .collect::<Vec<_>>())
    }

    async fn view(&self, id: Uuid) -> async_graphql::Result<CasesNode> {
        Ok(CasesNode { id })
    }

    async fn by_contact(
        &self,
        ctx: &Context<'_>,
        contact_id: Uuid,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<CasesNode>> {
        let conn = ctx.data::<PgPool>()?;
        let sql = sea_query::Query::select()
            .from(("crm", Cases::Table))
            .column(sea_query::Alias::new("id"))
            .and_where(sea_query::Expr::col(Cases::ContactId).eq(contact_id.to_string()))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| CasesNode { id })
            .collect::<Vec<_>>())
    }
}

#[derive(Debug, Default)]
pub struct CasesMutation;

#[Object]
impl CasesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        input: InsertCases,
    ) -> async_graphql::Result<CasesNode> {
        let conn = ctx.data::<PgPool>()?;
        let sql = sea_query::Query::insert()
            .into_table((sea_query::Alias::new("crm"), Cases::Table))
            .columns([
                Cases::Subject,
                Cases::Description,
                Cases::Status,
                Cases::Priority,
                Cases::ContactId,
                Cases::ClosedAt,
            ])
            .returning(sea_query::Query::returning().column(Cases::Id))
            .values([
                input.subject.into(),
                input.description.into(),
                String::from(input.status).into(),
                String::from(input.priority).into(),
                input.contact_id.to_string().into(),
                input.closed_at.map(|d| d.to_rfc3339()).into(),
            ])?
            .to_string(sea_query::PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;
        Ok(CasesNode { id })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateCases,
    ) -> async_graphql::Result<CasesNode> {
        let conn = ctx.data::<PgPool>()?;
        let schema_alias = sea_query::Alias::new("crm");
        let mut sql = sea_query::Query::update();
        let mut sql = sql.table((schema_alias.clone(), Cases::Table));

        if let Some(subject) = input.subject {
            sql = sql.value(Cases::Subject, subject);
        }
        if let Some(description) = input.description {
            sql = sql.value(Cases::Description, description);
        }
        if let Some(status) = input.status {
            sql = sql.value(Cases::Status, String::from(status));
        }
        if let Some(priority) = input.priority {
            sql = sql.value(Cases::Priority, String::from(priority));
        }
        if let Some(contact_id) = input.contact_id {
            sql = sql.value(Cases::ContactId, contact_id.to_string());
        }
        if let Some(closed_at) = input.closed_at {
            // Option<Option<DateTime>> pattern
            match closed_at {
                Some(dt) => sql = sql.value(Cases::ClosedAt, dt.to_rfc3339()),
                None => sql = sql.value(Cases::ClosedAt, Option::<String>::None),
            }
        }

        sql = sql
            .and_where(sea_query::Expr::col(Cases::Id).eq(id.to_string()))
            .returning(sea_query::Query::returning().column(Cases::Id));

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql.to_string(sea_query::PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;

        Ok(CasesNode { id })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;
        let sql = sea_query::Query::delete()
            .from_table((sea_query::Alias::new("crm"), Cases::Table))
            .and_where(sea_query::Expr::col(Cases::Id).eq(id.to_string()))
            .to_string(sea_query::PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn).await?;
        if result.rows_affected() != 1 {
            Err(async_graphql::Error::new("Failed to remove case"))
        } else {
            Ok("Case removed successfully".into())
        }
    }
}
