use async_graphql::dataloader::{DataLoader, Loader};
use async_graphql::{Context, InputObject, Object, Result};
use sea_query::{Alias, Expr, Iden, PostgresQueryBuilder, Query};
use serde::Deserialize;
use sqlx::PgPool;
use std::collections::HashMap;
use std::sync::Arc;
use uuid::Uuid;

// Database identifier for tms.drivers
#[derive(Iden)]
pub enum Drivers {
    Table,
    Id,
    EmployeeId,
    FirstName,
    LastName,
    LicenseNumber,
    PhoneNumber,
    Email,
    HireDate,
    Status,
    CreatedAt,
    UpdatedAt,
}

// Node representing a driver by id
pub struct DriversNode {
    pub id: Uuid,
}

#[Object]
impl DriversNode {
    async fn id(&self) -> Uuid {
        self.id
    }

    async fn first_name(&self, ctx: &Context<'_>) -> Result<String> {
        let loader = ctx.data::<DataLoader<DriverFieldLoader>>()?;
        loader
            .load_one((self.id, "first_name".to_string()))
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn last_name(&self, ctx: &Context<'_>) -> Result<String> {
        let loader = ctx.data::<DataLoader<DriverFieldLoader>>()?;
        loader
            .load_one((self.id, "last_name".to_string()))
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn email(&self, ctx: &Context<'_>) -> Result<String> {
        let loader = ctx.data::<DataLoader<DriverFieldLoader>>()?;
        loader
            .load_one((self.id, "email".to_string()))
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn status(&self, ctx: &Context<'_>) -> Result<String> {
        let loader = ctx.data::<DataLoader<DriverFieldLoader>>()?;
        loader
            .load_one((self.id, "status".to_string()))
            .await?
            .ok_or_else(|| "Not Found".into())
    }
}

// Input types
#[derive(Deserialize, InputObject)]
pub struct InsertDrivers {
    pub employee_id: String,
    pub first_name: String,
    pub last_name: String,
    pub license_number: String,
    pub phone_number: String,
    pub email: String,
    pub hire_date: chrono::NaiveDate,
    pub status: String,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateDrivers {
    pub first_name: Option<String>,
    pub last_name: Option<String>,
    pub phone_number: Option<String>,
    pub email: Option<Option<String>>,
    pub status: Option<String>,
}

// Query struct
#[derive(Debug, Default)]
pub struct DriversQuery;

#[Object]
impl DriversQuery {
    async fn list(&self, ctx: &Context<'_>, limit: u64, offset: u64) -> Result<Vec<DriversNode>> {
        let conn = ctx.data::<PgPool>()?;

        let schema = Alias::new("tms");

        let sql = Query::select()
            .from((schema.clone(), Drivers::Table))
            .column(Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(PostgresQueryBuilder);

        let rows = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_all(conn).await?;

        Ok(rows.into_iter().map(|(id,)| DriversNode { id }).collect())
    }

    async fn view(&self, id: Uuid) -> Result<DriversNode> {
        Ok(DriversNode { id })
    }
}

// Mutation struct
#[derive(Debug, Default)]
pub struct DriversMutation;

#[Object]
impl DriversMutation {
    async fn create(&self, ctx: &Context<'_>, input: InsertDrivers) -> Result<DriversNode> {
        let conn = ctx.data::<PgPool>()?;
        let schema = Alias::new("tms");

        let sql = Query::insert()
            .into_table((schema.clone(), Drivers::Table))
            .columns([
                Drivers::EmployeeId,
                Drivers::FirstName,
                Drivers::LastName,
                Drivers::LicenseNumber,
                Drivers::PhoneNumber,
                Drivers::Email,
                Drivers::HireDate,
                Drivers::Status,
            ])
            .returning(Query::returning().column(Drivers::Id))
            .values([
                input.employee_id.into(),
                input.first_name.into(),
                input.last_name.into(),
                input.license_number.into(),
                input.phone_number.into(),
                input.email.into(),
                input.hire_date.to_string().into(),
                input.status.into(),
            ])?
            .to_string(PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;

        Ok(DriversNode { id })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateDrivers,
    ) -> Result<DriversNode> {
        let conn = ctx.data::<PgPool>()?;

        let schema = Alias::new("tms");

        let mut sql = Query::update();

        let mut sql = sql.table((schema.clone(), Drivers::Table));

        if let Some(first_name) = input.first_name {
            sql = sql.value(Drivers::FirstName, first_name);
        }
        if let Some(last_name) = input.last_name {
            sql = sql.value(Drivers::LastName, last_name);
        }
        if let Some(phone) = input.phone_number {
            sql = sql.value(Drivers::PhoneNumber, phone);
        }
        if let Some(email) = input.email {
            sql = sql.value(Drivers::Email, email);
        }
        if let Some(status) = input.status {
            sql = sql.value(Drivers::Status, status);
        }

        sql = sql
            .and_where(Expr::col(Drivers::Id).eq(id.to_string()))
            .returning(Query::returning().column(Drivers::Id));

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql.to_string(PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;

        Ok(DriversNode { id })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<String> {
        let conn = ctx.data::<PgPool>()?;

        let schema = Alias::new("tms");

        let sql = Query::delete()
            .from_table((schema.clone(), Drivers::Table))
            .and_where(Expr::col(Drivers::Id).eq(id.to_string()))
            .to_string(PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn).await?;

        if result.rows_affected() != 1 {
            Err("Failed to remove driver".into())
        } else {
            Ok("Driver removed successfully".into())
        }
    }
}

// DataLoader implementation for specific fields (simple example)
pub struct DriverFieldLoader {
    pub conn: PgPool,
}

impl Loader<(Uuid, String)> for DriverFieldLoader {
    type Value = String;
    type Error = Arc<sqlx::Error>;

    async fn load(
        &self,
        keys: &[(Uuid, String)],
    ) -> Result<HashMap<(Uuid, String), Self::Value>, Self::Error> {
        // Build unique list of ids
        let mut ids: Vec<Uuid> = keys.iter().map(|(id, _)| *id).collect();
        ids.sort();
        ids.dedup();

        // Raw SQL to batch load by ANY($1)
        let sql =
            "select id, first_name, last_name, email, status from tms.drivers where id = ANY($1)";

        let rows = sqlx::query_as::<_, (Uuid, String, String, String, String)>(sql)
            .bind(&ids)
            .fetch_all(&self.conn)
            .await
            .map_err(Arc::new)?;

        let mut map: HashMap<(Uuid, String), String> = HashMap::new();

        for (id, first, last, email, status) in rows {
            map.insert((id, "first_name".to_string()), first);
            map.insert((id, "last_name".to_string()), last);
            map.insert((id, "email".to_string()), email);
            map.insert((id, "status".to_string()), status);
        }

        Ok(map)
    }
}

// Helper to register loaders on SchemaBuilder (optional usage)
pub fn apply_loaders(
    pool: &PgPool,
    schema: async_graphql::SchemaBuilder<
        DriversQuery,
        DriversMutation,
        async_graphql::EmptySubscription,
    >,
) -> async_graphql::SchemaBuilder<DriversQuery, DriversMutation, async_graphql::EmptySubscription> {
    schema.data(DataLoader::new(
        DriverFieldLoader { conn: pool.clone() },
        tokio::spawn,
    ))
}
