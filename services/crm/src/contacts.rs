// Auto-generated SeaQuery identifiers for crm.contacts
// Source migration: migrations/20250814024418_crm-contacts.up.sql

use sea_query::Iden;

use async_graphql::Enum;
use async_graphql::InputObject;
use async_graphql::dataloader::{DataLoader, Loader};
use chrono::{DateTime, NaiveDate, Utc};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use std::sync::Arc;
use uuid::Uuid;

/// Rust representation of Postgres enum `crm.contact_status`.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Serialize, Enum)]
pub enum ContactStatus {
    Lead,
    Prospect,
    Customer,
    Inactive,
}

// Insert / Update InputObjects

#[derive(Deserialize, InputObject)]
pub struct InsertContacts {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub phone_number: Option<String>,
    pub job_title: Option<String>,
    pub lead_source: Option<String>,
    pub status: ContactStatus,
    pub birth_date: Option<NaiveDate>,
    pub company_id: Option<Uuid>,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateContacts {
    pub first_name: Option<String>,
    pub last_name: Option<String>,
    pub email: Option<String>,
    pub phone_number: Option<Option<String>>,
    pub job_title: Option<Option<String>>,
    pub lead_source: Option<Option<String>>,
    pub status: Option<ContactStatus>,
    pub birth_date: Option<Option<NaiveDate>>,
    pub company_id: Option<Option<Uuid>>,
}

// SQL identifier for `crm.contacts` table.
#[derive(Iden)]
pub enum Contacts {
    Table,
    Id,
    FirstName,
    LastName,
    Email,
    PhoneNumber,
    JobTitle,
    LeadSource,
    Status,
    BirthDate,
    CompanyId,
    CreatedAt,
    UpdatedAt,
}

// DataLoaders - per column
pub struct ContactIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for ContactIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from crm.contacts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct ContactFirstNameLoader {
    conn: PgPool,
}
impl Loader<Uuid> for ContactFirstNameLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, first_name from crm.contacts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct ContactLastNameLoader {
    conn: PgPool,
}
impl Loader<Uuid> for ContactLastNameLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, last_name from crm.contacts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct ContactEmailLoader {
    conn: PgPool,
}
impl Loader<Uuid> for ContactEmailLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, email from crm.contacts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct ContactPhoneLoader {
    conn: PgPool,
}
impl Loader<Uuid> for ContactPhoneLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, phone_number from crm.contacts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct ContactJobTitleLoader {
    conn: PgPool,
}
impl Loader<Uuid> for ContactJobTitleLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, job_title from crm.contacts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct ContactLeadSourceLoader {
    conn: PgPool,
}
impl Loader<Uuid> for ContactLeadSourceLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, lead_source from crm.contacts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct ContactStatusLoader {
    conn: PgPool,
}
impl Loader<Uuid> for ContactStatusLoader {
    type Error = Arc<sqlx::Error>;
    type Value = ContactStatus;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        let rows = sqlx::query_as::<_, (Uuid, String)>(
            "select id, status::text from crm.contacts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?;

        Ok(rows
            .into_iter()
            .map(|(id, s)| {
                let status = match s.as_str() {
                    "lead" => ContactStatus::Lead,
                    "prospect" => ContactStatus::Prospect,
                    "customer" => ContactStatus::Customer,
                    "inactive" => ContactStatus::Inactive,
                    _ => ContactStatus::Lead,
                };
                (id, status)
            })
            .collect())
    }
}

pub struct ContactBirthDateLoader {
    conn: PgPool,
}
impl Loader<Uuid> for ContactBirthDateLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<NaiveDate>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, birth_date from crm.contacts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct ContactCompanyIdLoader {
    conn: PgPool,
}
impl Loader<Uuid> for ContactCompanyIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<Uuid>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, company_id from crm.contacts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct ContactCreatedAtLoader {
    conn: PgPool,
}
impl Loader<Uuid> for ContactCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from crm.contacts where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct ContactUpdatedAtLoader {
    conn: PgPool,
}
impl Loader<Uuid> for ContactUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from crm.contacts where id = ANY($1)",
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
            ContactIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            ContactFirstNameLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            ContactLastNameLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            ContactEmailLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            ContactPhoneLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            ContactJobTitleLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            ContactLeadSourceLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            ContactStatusLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            ContactBirthDateLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            ContactCompanyIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            ContactCreatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            ContactUpdatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
}

use crate::companies::CompaniesNode;
use async_graphql::{Context, Object};

// Contacts node
pub struct ContactsNode {
    pub id: Uuid,
}

impl ContactsNode {
    pub fn new(id: Uuid) -> Self {
        ContactsNode { id }
    }
}

#[Object]
impl ContactsNode {
    async fn id(&self, ctx: &Context<'_>) -> async_graphql::Result<Uuid> {
        let loader = ctx.data::<DataLoader<ContactIdLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn first_name(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<ContactFirstNameLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn last_name(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<ContactLastNameLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn email(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<ContactEmailLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn phone_number(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<ContactPhoneLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn job_title(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<ContactJobTitleLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn lead_source(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<ContactLeadSourceLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn status(&self, ctx: &Context<'_>) -> async_graphql::Result<ContactStatus> {
        let loader = ctx.data::<DataLoader<ContactStatusLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn birth_date(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<NaiveDate>> {
        let loader = ctx.data::<DataLoader<ContactBirthDateLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn company(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<CompaniesNode>> {
        let loader = ctx.data::<DataLoader<ContactCompanyIdLoader>>()?;
        match loader.load_one(self.id).await? {
            Some(cid_opt) => match cid_opt {
                Some(cid) => Ok(Some(CompaniesNode::new(cid))),
                None => Ok(None),
            },
            None => Ok(None),
        }
    }

    async fn created_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<ContactCreatedAtLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn updated_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<ContactUpdatedAtLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }
}

// Contacts query
#[derive(Debug, Default)]
pub struct ContactsQuery;

#[Object]
impl ContactsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<ContactsNode>> {
        let conn = ctx.data::<PgPool>()?;
        let sql = sea_query::Query::select()
            .from(("crm", "contacts"))
            .column(sea_query::Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| ContactsNode { id })
            .collect::<Vec<_>>())
    }

    async fn view(&self, id: Uuid) -> async_graphql::Result<ContactsNode> {
        Ok(ContactsNode { id })
    }
}

// Contacts mutations
#[derive(Debug, Default)]
pub struct ContactsMutation;

impl ContactsMutation {
    fn status_to_text(s: ContactStatus) -> &'static str {
        match s {
            ContactStatus::Lead => "lead",
            ContactStatus::Prospect => "prospect",
            ContactStatus::Customer => "customer",
            ContactStatus::Inactive => "inactive",
        }
    }
}

#[Object]
impl ContactsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        input: InsertContacts,
    ) -> async_graphql::Result<ContactsNode> {
        let conn = ctx.data::<PgPool>()?;

        let status_text = Self::status_to_text(input.status);

        let company_val: Option<String> = input.company_id.map(|u| u.to_string());

        let sql = sea_query::Query::insert()
            .into_table(("crm", "contacts"))
            .columns([
                Contacts::FirstName,
                Contacts::LastName,
                Contacts::Email,
                Contacts::PhoneNumber,
                Contacts::JobTitle,
                Contacts::LeadSource,
                Contacts::Status,
                Contacts::BirthDate,
                Contacts::CompanyId,
            ])
            .returning(sea_query::Query::returning().column(Contacts::Id))
            .values([
                input.first_name.into(),
                input.last_name.into(),
                input.email.into(),
                input.phone_number.into(),
                input.job_title.into(),
                input.lead_source.into(),
                status_text.into(),
                input.birth_date.map(|d| d.to_string()).into(),
                company_val.into(),
            ])?
            .to_string(sea_query::PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;

        Ok(ContactsNode { id })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateContacts,
    ) -> async_graphql::Result<ContactsNode> {
        let conn = ctx.data::<PgPool>()?;

        let mut upd = sea_query::Query::update();
        let mut upd = upd.table(("crm", "contacts"));

        if let Some(first_name) = input.first_name {
            upd = upd.value(Contacts::FirstName, first_name);
        }

        if let Some(last_name) = input.last_name {
            upd = upd.value(Contacts::LastName, last_name);
        }

        if let Some(email) = input.email {
            upd = upd.value(Contacts::Email, email);
        }

        if let Some(phone_number_opt) = input.phone_number {
            upd = upd.value(Contacts::PhoneNumber, phone_number_opt);
        }

        if let Some(job_title_opt) = input.job_title {
            upd = upd.value(Contacts::JobTitle, job_title_opt);
        }

        if let Some(lead_source_opt) = input.lead_source {
            upd = upd.value(Contacts::LeadSource, lead_source_opt);
        }

        if let Some(status) = input.status {
            let status_text = Self::status_to_text(status);
            upd = upd.value(Contacts::Status, status_text);
        }

        if let Some(birth_date_opt) = input.birth_date {
            upd = upd.value(Contacts::BirthDate, birth_date_opt.map(|d| d.to_string()));
        }

        if let Some(company_id_option) = input.company_id {
            match company_id_option {
                Some(cid) => upd = upd.value(Contacts::CompanyId, cid.to_string()),
                None => upd = upd.value(Contacts::CompanyId, None::<String>),
            }
        }

        upd = upd
            .and_where(sea_query::Expr::col(Contacts::Id).eq(id.to_string()))
            .returning(sea_query::Query::returning().column(Contacts::Id));

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&upd.to_string(sea_query::PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;

        Ok(ContactsNode { id })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::delete()
            .from_table(("crm", "contacts"))
            .and_where(sea_query::Expr::col(Contacts::Id).eq(id.to_string()))
            .to_string(sea_query::PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn).await?;

        if result.rows_affected() != 1 {
            Err("Failed to remove contact".into())
        } else {
            Ok("Contact removed successfully".into())
        }
    }
}
