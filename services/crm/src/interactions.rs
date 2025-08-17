// Auto-generated SeaQuery identifiers for crm.interactions
// Source migration: migrations/20250814025148_crm-interactions.up.sql

use sea_query::Iden;

use async_graphql::dataloader::{DataLoader, Loader};
use async_graphql::{Enum, InputObject};
use chrono::{DateTime, Utc};
use serde::Deserialize;
use sqlx::PgPool;
use std::sync::Arc;
use uuid::Uuid;

// Enum for interaction type
#[derive(Debug, Clone, Copy, PartialEq, Eq, Enum, Deserialize)]
pub enum InteractionType {
    #[graphql(name = "call")]
    Call,
    #[graphql(name = "email")]
    Email,
    #[graphql(name = "meeting")]
    Meeting,
    #[graphql(name = "chat")]
    Chat,
    #[graphql(name = "note")]
    Note,
}

impl From<InteractionType> for String {
    fn from(t: InteractionType) -> Self {
        match t {
            InteractionType::Call => "call".to_string(),
            InteractionType::Email => "email".to_string(),
            InteractionType::Meeting => "meeting".to_string(),
            InteractionType::Chat => "chat".to_string(),
            InteractionType::Note => "note".to_string(),
        }
    }
}

// Insert / Update InputObjects

#[derive(Deserialize, InputObject)]
pub struct InsertInteractions {
    pub r#type: InteractionType,
    pub subject: Option<String>,
    pub description: Option<String>,
    pub interaction_date: DateTime<Utc>,
    pub contact_id: Option<Uuid>,
    pub opportunity_id: Option<Uuid>,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateInteractions {
    pub r#type: Option<InteractionType>,
    pub subject: Option<Option<String>>,
    pub description: Option<Option<String>>,
    pub interaction_date: Option<DateTime<Utc>>,
    pub contact_id: Option<Option<Uuid>>,
    pub opportunity_id: Option<Option<Uuid>>,
}

// SQL identifier for `crm.interactions` table.
#[derive(Iden)]
pub enum Interactions {
    Table,
    Id,
    Type,
    Subject,
    Description,
    InteractionDate,
    ContactId,
    OpportunityId,
    CreatedAt,
    UpdatedAt,
}

// DataLoaders - per column
pub struct InteractionIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for InteractionIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from crm.interactions where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct InteractionTypeLoader {
    conn: PgPool,
}

impl Loader<Uuid> for InteractionTypeLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, type::text from crm.interactions where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct InteractionSubjectLoader {
    conn: PgPool,
}

impl Loader<Uuid> for InteractionSubjectLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, subject from crm.interactions where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct InteractionDescriptionLoader {
    conn: PgPool,
}

impl Loader<Uuid> for InteractionDescriptionLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, description from crm.interactions where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct InteractionDateLoader {
    conn: PgPool,
}

impl Loader<Uuid> for InteractionDateLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, interaction_date from crm.interactions where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct InteractionContactIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for InteractionContactIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<Uuid>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, contact_id from crm.interactions where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct InteractionOpportunityIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for InteractionOpportunityIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<Uuid>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, opportunity_id from crm.interactions where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct InteractionCreatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for InteractionCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from crm.interactions where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct InteractionUpdatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for InteractionUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from crm.interactions where id = ANY($1)",
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
            InteractionIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            InteractionTypeLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            InteractionSubjectLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            InteractionDescriptionLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            InteractionDateLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            InteractionContactIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            InteractionOpportunityIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            InteractionCreatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            InteractionUpdatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
}

use crate::contacts::ContactsNode;
use crate::opportunities::OpportunitiesNode;
use async_graphql::{Context, Object};

// Interactions node
pub struct InteractionsNode {
    pub id: Uuid,
}

#[Object]
impl InteractionsNode {
    async fn id(&self, ctx: &Context<'_>) -> async_graphql::Result<Uuid> {
        let loader = ctx.data::<DataLoader<InteractionIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn r#type(&self, ctx: &Context<'_>) -> async_graphql::Result<InteractionType> {
        let loader = ctx.data::<DataLoader<InteractionTypeLoader>>()?;

        let t = loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))?;

        match t.as_str() {
            "call" => Ok(InteractionType::Call),
            "email" => Ok(InteractionType::Email),
            "meeting" => Ok(InteractionType::Meeting),
            "chat" => Ok(InteractionType::Chat),
            "note" => Ok(InteractionType::Note),
            _ => Err(async_graphql::Error::new("Invalid interaction type")),
        }
    }

    async fn subject(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<InteractionSubjectLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn description(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<InteractionDescriptionLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn interaction_date(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<InteractionDateLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn contact(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<ContactsNode>> {
        let loader = ctx.data::<DataLoader<InteractionContactIdLoader>>()?;

        let contact_id = loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))?;

        Ok(contact_id.map(|id| ContactsNode { id }))
    }

    async fn opportunity(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<OpportunitiesNode>> {
        let loader = ctx.data::<DataLoader<InteractionOpportunityIdLoader>>()?;

        let opp_id = loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))?;

        Ok(opp_id.map(|id| OpportunitiesNode { id }))
    }

    async fn created_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<InteractionCreatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn updated_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<InteractionUpdatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }
}

impl InteractionsNode {
    pub fn new(id: Uuid) -> Self {
        InteractionsNode { id }
    }
}

// Interactions query
#[derive(Debug, Default)]
pub struct InteractionsQuery;

#[Object]
impl InteractionsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<InteractionsNode>> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::select()
            .from(("crm", "interactions"))
            .column(sea_query::Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| InteractionsNode { id })
            .collect::<Vec<_>>())
    }

    async fn view(&self, id: Uuid) -> async_graphql::Result<InteractionsNode> {
        Ok(InteractionsNode { id })
    }

    async fn by_contact(
        &self,
        ctx: &Context<'_>,
        contact_id: Uuid,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<InteractionsNode>> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::select()
            .from(("crm", "interactions"))
            .column(sea_query::Alias::new("id"))
            .and_where(sea_query::Expr::col(Interactions::ContactId).eq(contact_id.to_string()))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| InteractionsNode { id })
            .collect::<Vec<_>>())
    }

    async fn by_opportunity(
        &self,
        ctx: &Context<'_>,
        opportunity_id: Uuid,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<InteractionsNode>> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::select()
            .from(("crm", "interactions"))
            .column(sea_query::Alias::new("id"))
            .and_where(
                sea_query::Expr::col(Interactions::OpportunityId).eq(opportunity_id.to_string()),
            )
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| InteractionsNode { id })
            .collect::<Vec<_>>())
    }

    async fn by_type(
        &self,
        ctx: &Context<'_>,
        r#type: InteractionType,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<InteractionsNode>> {
        let conn = ctx.data::<PgPool>()?;

        let t_str: String = r#type.into();
        let sql = sea_query::Query::select()
            .from(("crm", "interactions"))
            .column(sea_query::Alias::new("id"))
            .and_where(sea_query::Expr::col(Interactions::Type).eq(t_str))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| InteractionsNode { id })
            .collect::<Vec<_>>())
    }
}

// Interactions mutations
#[derive(Debug, Default)]
pub struct InteractionsMutation;

#[Object]
impl InteractionsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        input: InsertInteractions,
    ) -> async_graphql::Result<InteractionsNode> {
        let conn = ctx.data::<PgPool>()?;

        let t_str: String = input.r#type.into();
        let sql = sea_query::Query::insert()
            .into_table(("crm", "interactions"))
            .columns([
                Interactions::Type,
                Interactions::Subject,
                Interactions::Description,
                Interactions::InteractionDate,
                Interactions::ContactId,
                Interactions::OpportunityId,
            ])
            .returning(sea_query::Query::returning().column(Interactions::Id))
            .values([
                t_str.into(),
                input.subject.into(),
                input.description.into(),
                input.interaction_date.to_rfc3339().into(),
                input.contact_id.map(|id| id.to_string()).into(),
                input.opportunity_id.map(|id| id.to_string()).into(),
            ])?
            .to_string(sea_query::PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;

        Ok(InteractionsNode { id })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateInteractions,
    ) -> async_graphql::Result<InteractionsNode> {
        let conn = ctx.data::<PgPool>()?;

        let mut upd = sea_query::Query::update();
        let mut upd = upd.table(("crm", "interactions"));

        if let Some(t) = input.r#type {
            let t_str: String = t.into();
            upd = upd.value(Interactions::Type, t_str);
        }

        if let Some(subject) = input.subject {
            upd = upd.value(Interactions::Subject, subject);
        }

        if let Some(description) = input.description {
            upd = upd.value(Interactions::Description, description);
        }

        if let Some(interaction_date) = input.interaction_date {
            upd = upd.value(Interactions::InteractionDate, interaction_date.to_rfc3339());
        }

        if let Some(contact_id) = input.contact_id {
            match contact_id {
                Some(uuid) => upd = upd.value(Interactions::ContactId, uuid.to_string()),
                None => upd = upd.value(Interactions::ContactId, Option::<String>::None),
            }
        }

        if let Some(opportunity_id) = input.opportunity_id {
            match opportunity_id {
                Some(uuid) => upd = upd.value(Interactions::OpportunityId, uuid.to_string()),
                None => upd = upd.value(Interactions::OpportunityId, Option::<String>::None),
            }
        }

        upd = upd
            .and_where(sea_query::Expr::col(Interactions::Id).eq(id.to_string()))
            .returning(sea_query::Query::returning().column(Interactions::Id));

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&upd.to_string(sea_query::PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;

        Ok(InteractionsNode { id })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::delete()
            .from_table(("crm", "interactions"))
            .and_where(sea_query::Expr::col(Interactions::Id).eq(id.to_string()))
            .to_string(sea_query::PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn).await?;

        if result.rows_affected() != 1 {
            Err("Failed to remove interaction".into())
        } else {
            Ok("Interaction removed successfully".into())
        }
    }
}
