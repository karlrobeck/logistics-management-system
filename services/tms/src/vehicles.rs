use async_graphql::dataloader::{DataLoader, Loader};
use async_graphql::{Context, InputObject, Object, Result};
use sea_query::{Alias, Expr, Iden, PostgresQueryBuilder, Query};
use serde::Deserialize;
use sqlx::PgPool;
use sqlx::QueryBuilder;
use std::collections::HashMap;
use std::sync::Arc;
use uuid::Uuid;

// Database identifier for tms.vehicles
#[derive(Iden)]
pub enum Vehicles {
    Table,
    Id,
    VehicleNumber,
    LicensePlate,
    VehicleType,
    Make,
    Model,
    Year,
    CapacityWeight,
    CapacityVolume,
    Status,
    CreatedAt,
    UpdatedAt,
}

// Node representing a vehicle by id
pub struct VehiclesNode {
    pub id: Uuid,
}

#[Object]
impl VehiclesNode {
    async fn id(&self) -> Uuid {
        self.id
    }

    async fn vehicle_number(&self, ctx: &Context<'_>) -> Result<String> {
        let loader = ctx.data::<DataLoader<VehicleFieldLoader>>()?;
        let loaded = loader
            .load_one((self.id, "vehicle_number".to_string()))
            .await?;
        match loaded {
            Some(Some(s)) => Ok(s),
            _ => Err("Not Found".into()),
        }
    }

    async fn license_plate(&self, ctx: &Context<'_>) -> Result<String> {
        let loader = ctx.data::<DataLoader<VehicleFieldLoader>>()?;
        let loaded = loader
            .load_one((self.id, "license_plate".to_string()))
            .await?;
        match loaded {
            Some(Some(s)) => Ok(s),
            _ => Err("Not Found".into()),
        }
    }

    async fn vehicle_type(&self, ctx: &Context<'_>) -> Result<String> {
        let loader = ctx.data::<DataLoader<VehicleFieldLoader>>()?;
        let loaded = loader
            .load_one((self.id, "vehicle_type".to_string()))
            .await?;
        match loaded {
            Some(Some(s)) => Ok(s),
            _ => Err("Not Found".into()),
        }
    }

    async fn make(&self, ctx: &Context<'_>) -> Result<String> {
        let loader = ctx.data::<DataLoader<VehicleFieldLoader>>()?;
        let loaded = loader.load_one((self.id, "make".to_string())).await?;
        match loaded {
            Some(Some(s)) => Ok(s),
            _ => Err("Not Found".into()),
        }
    }

    async fn model(&self, ctx: &Context<'_>) -> Result<String> {
        let loader = ctx.data::<DataLoader<VehicleFieldLoader>>()?;
        let loaded = loader.load_one((self.id, "model".to_string())).await?;
        match loaded {
            Some(Some(s)) => Ok(s),
            _ => Err("Not Found".into()),
        }
    }

    async fn year(&self, ctx: &Context<'_>) -> Result<i32> {
        let loader = ctx.data::<DataLoader<VehicleFieldLoader>>()?;
        let loaded = loader.load_one((self.id, "year".to_string())).await?;
        match loaded {
            Some(Some(s)) => {
                let parsed = s.parse::<i32>().map_err(|_| "Parse error")?;
                Ok(parsed)
            }
            _ => Err("Not Found".into()),
        }
    }

    async fn capacity_weight(&self, ctx: &Context<'_>) -> Result<Option<f64>> {
        let loader = ctx.data::<DataLoader<VehicleFieldLoader>>()?;
        let loaded = loader
            .load_one((self.id, "capacity_weight".to_string()))
            .await?;
        match loaded {
            Some(Some(s)) => Ok(s.parse::<f64>().ok()),
            _ => Ok(None),
        }
    }

    async fn capacity_volume(&self, ctx: &Context<'_>) -> Result<Option<f64>> {
        let loader = ctx.data::<DataLoader<VehicleFieldLoader>>()?;
        let loaded = loader
            .load_one((self.id, "capacity_volume".to_string()))
            .await?;
        match loaded {
            Some(Some(s)) => Ok(s.parse::<f64>().ok()),
            _ => Ok(None),
        }
    }

    async fn status(&self, ctx: &Context<'_>) -> Result<String> {
        let loader = ctx.data::<DataLoader<VehicleFieldLoader>>()?;
        let loaded = loader.load_one((self.id, "status".to_string())).await?;
        match loaded {
            Some(Some(s)) => Ok(s),
            _ => Err("Not Found".into()),
        }
    }
}

// Input types
#[derive(Deserialize, InputObject)]
pub struct InsertVehicles {
    pub vehicle_number: String,
    pub license_plate: String,
    pub vehicle_type: String,
    pub make: String,
    pub model: String,
    pub year: i32,
    pub capacity_weight: Option<f64>,
    pub capacity_volume: Option<f64>,
    pub status: String,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateVehicles {
    pub vehicle_number: Option<String>,
    pub license_plate: Option<String>,
    pub vehicle_type: Option<String>,
    pub make: Option<String>,
    pub model: Option<String>,
    pub year: Option<i32>,
    pub capacity_weight: Option<Option<f64>>,
    pub capacity_volume: Option<Option<f64>>,
    pub status: Option<String>,
}

// Query struct
#[derive(Debug, Default)]
pub struct VehiclesQuery;

#[Object]
impl VehiclesQuery {
    async fn list(&self, ctx: &Context<'_>, limit: u64, offset: u64) -> Result<Vec<VehiclesNode>> {
        let conn = ctx.data::<PgPool>()?;
        let schema = Alias::new("tms");

        let sql = Query::select()
            .from((schema.clone(), Vehicles::Table))
            .column(Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(PostgresQueryBuilder);

        let rows = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_all(conn).await?;

        Ok(rows.into_iter().map(|(id,)| VehiclesNode { id }).collect())
    }

    async fn view(&self, id: Uuid) -> Result<VehiclesNode> {
        Ok(VehiclesNode { id })
    }
}

// Mutation struct
#[derive(Debug, Default)]
pub struct VehiclesMutation;

#[Object]
impl VehiclesMutation {
    async fn create(&self, ctx: &Context<'_>, input: InsertVehicles) -> Result<VehiclesNode> {
        let conn = ctx.data::<PgPool>()?;

        let mut qb = QueryBuilder::new(
            "INSERT INTO tms.vehicles (vehicle_number, license_plate, vehicle_type, make, model, year, capacity_weight, capacity_volume, status) VALUES (",
        );
        qb.push_bind(input.vehicle_number)
            .push(", ")
            .push_bind(input.license_plate)
            .push(", ")
            .push_bind(input.vehicle_type)
            .push(", ")
            .push_bind(input.make)
            .push(", ")
            .push_bind(input.model)
            .push(", ")
            .push_bind(input.year)
            .push(", ")
            .push_bind(input.capacity_weight)
            .push(", ")
            .push_bind(input.capacity_volume)
            .push(", ")
            .push_bind(input.status)
            .push(") RETURNING id");

        let (id,) = qb.build_query_as::<(Uuid,)>().fetch_one(conn).await?;
        Ok(VehiclesNode { id })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateVehicles,
    ) -> Result<VehiclesNode> {
        let conn = ctx.data::<PgPool>()?;

        let mut qb = QueryBuilder::new("UPDATE tms.vehicles SET ");
        let mut first = true;

        if let Some(v) = input.vehicle_number {
            if !first {
                qb.push(", ");
            }
            qb.push("vehicle_number = ").push_bind(v);
            first = false;
        }
        if let Some(v) = input.license_plate {
            if !first {
                qb.push(", ");
            }
            qb.push("license_plate = ").push_bind(v);
            first = false;
        }
        if let Some(v) = input.vehicle_type {
            if !first {
                qb.push(", ");
            }
            qb.push("vehicle_type = ").push_bind(v);
            first = false;
        }
        if let Some(v) = input.make {
            if !first {
                qb.push(", ");
            }
            qb.push("make = ").push_bind(v);
            first = false;
        }
        if let Some(v) = input.model {
            if !first {
                qb.push(", ");
            }
            qb.push("model = ").push_bind(v);
            first = false;
        }
        if let Some(v) = input.year {
            if !first {
                qb.push(", ");
            }
            qb.push("year = ").push_bind(v);
            first = false;
        }
        if let Some(v) = input.capacity_weight {
            if !first {
                qb.push(", ");
            }
            qb.push("capacity_weight = ").push_bind(v);
            first = false;
        }
        if let Some(v) = input.capacity_volume {
            if !first {
                qb.push(", ");
            }
            qb.push("capacity_volume = ").push_bind(v);
            first = false;
        }
        if let Some(v) = input.status {
            if !first {
                qb.push(", ");
            }
            qb.push("status = ").push_bind(v);
            first = false;
        }

        qb.push(" WHERE id = ").push_bind(id).push(" RETURNING id");

        let (id,) = qb.build_query_as::<(Uuid,)>().fetch_one(conn).await?;
        Ok(VehiclesNode { id })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<String> {
        let conn = ctx.data::<PgPool>()?;
        let schema = Alias::new("tms");

        let sql = Query::delete()
            .from_table((schema.clone(), Vehicles::Table))
            .and_where(Expr::col(Vehicles::Id).eq(id.to_string()))
            .to_string(PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn).await?;

        if result.rows_affected() != 1 {
            Err("Failed to remove vehicle".into())
        } else {
            Ok("Vehicle removed successfully".into())
        }
    }
}

// DataLoader implementation for vehicles
pub struct VehicleFieldLoader {
    pub conn: PgPool,
}

impl Loader<(Uuid, String)> for VehicleFieldLoader {
    type Value = Option<String>;
    type Error = Arc<sqlx::Error>;

    async fn load(
        &self,
        keys: &[(Uuid, String)],
    ) -> Result<HashMap<(Uuid, String), Self::Value>, Self::Error> {
        let mut ids: Vec<Uuid> = keys.iter().map(|(id, _)| *id).collect();
        ids.sort();
        ids.dedup();

        // Cast numeric columns to text for safe retrieval and parsing in loaders
        let sql = "select id, vehicle_number, license_plate, vehicle_type, make, model, year, capacity_weight::text as capacity_weight, capacity_volume::text as capacity_volume, status from tms.vehicles where id = ANY($1)";

        let rows = sqlx::query_as::<
            _,
            (
                Uuid,
                String,
                String,
                String,
                String,
                String,
                i32,
                Option<String>,
                Option<String>,
                String,
            ),
        >(sql)
        .bind(&ids)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?;

        let mut map: HashMap<(Uuid, String), Option<String>> = HashMap::new();

        for (
            id,
            vehicle_number,
            license_plate,
            vehicle_type,
            make,
            model,
            year,
            cap_w,
            cap_v,
            status,
        ) in rows
        {
            map.insert((id, "vehicle_number".to_string()), Some(vehicle_number));
            map.insert((id, "license_plate".to_string()), Some(license_plate));
            map.insert((id, "vehicle_type".to_string()), Some(vehicle_type));
            map.insert((id, "make".to_string()), Some(make));
            map.insert((id, "model".to_string()), Some(model));
            map.insert((id, "year".to_string()), Some(year.to_string()));
            map.insert((id, "capacity_weight".to_string()), cap_w);
            map.insert((id, "capacity_volume".to_string()), cap_v);
            map.insert((id, "status".to_string()), Some(status));
        }

        Ok(map)
    }
}

pub fn apply_loaders(
    pool: &PgPool,
    schema: async_graphql::SchemaBuilder<
        VehiclesQuery,
        VehiclesMutation,
        async_graphql::EmptySubscription,
    >,
) -> async_graphql::SchemaBuilder<VehiclesQuery, VehiclesMutation, async_graphql::EmptySubscription>
{
    schema.data(DataLoader::new(
        VehicleFieldLoader { conn: pool.clone() },
        tokio::spawn,
    ))
}
