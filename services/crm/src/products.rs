// Auto-generated SeaQuery identifiers for crm.products and crm.opportunity_products
// Source migrations: migrations/20250814030326_crm-products.up.sql

use sea_query::Iden;

use async_graphql::InputObject;
use async_graphql::dataloader::{DataLoader, Loader};
use chrono::{DateTime, Utc};
use serde::Deserialize;
use sqlx::PgPool;
use std::sync::Arc;
use uuid::Uuid;

// Products table
#[derive(Deserialize, InputObject)]
pub struct InsertProducts {
    pub name: String,
    pub description: Option<String>,
    pub price: f64,
    pub sku: Option<String>,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateProducts {
    pub name: Option<String>,
    pub description: Option<Option<String>>,
    pub price: Option<f64>,
    pub sku: Option<Option<String>>,
}

#[derive(Iden)]
pub enum Products {
    Table,
    Id,
    Name,
    Description,
    Price,
    Sku,
    CreatedAt,
    UpdatedAt,
}

// Opportunity products (line items)
#[derive(Deserialize, InputObject)]
pub struct InsertOpportunityProducts {
    pub opportunity_id: Uuid,
    pub product_id: Uuid,
    pub quantity: f64,
    pub unit_price: f64,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateOpportunityProducts {
    pub opportunity_id: Option<Uuid>,
    pub product_id: Option<Uuid>,
    pub quantity: Option<f64>,
    pub unit_price: Option<f64>,
}

#[derive(Iden)]
pub enum OpportunityProducts {
    Table,
    Id,
    OpportunityId,
    ProductId,
    Quantity,
    UnitPrice,
    TotalPrice,
    CreatedAt,
    UpdatedAt,
}

// DataLoaders for products
pub struct ProductIdLoader {
    conn: PgPool,
}
impl Loader<Uuid> for ProductIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from crm.products where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct ProductNameLoader {
    conn: PgPool,
}
impl Loader<Uuid> for ProductNameLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, name from crm.products where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct ProductDescriptionLoader {
    conn: PgPool,
}
impl Loader<Uuid> for ProductDescriptionLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, description from crm.products where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct ProductPriceLoader {
    conn: PgPool,
}
impl Loader<Uuid> for ProductPriceLoader {
    type Error = Arc<sqlx::Error>;
    type Value = f64;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, price from crm.products where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct ProductSkuLoader {
    conn: PgPool,
}
impl Loader<Uuid> for ProductSkuLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, sku from crm.products where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct ProductCreatedAtLoader {
    conn: PgPool,
}
impl Loader<Uuid> for ProductCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from crm.products where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct ProductUpdatedAtLoader {
    conn: PgPool,
}
impl Loader<Uuid> for ProductUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from crm.products where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

// DataLoaders for opportunity_products
pub struct OpProductIdLoader {
    conn: PgPool,
}
impl Loader<Uuid> for OpProductIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from crm.opportunity_products where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct OpProductOpportunityIdLoader {
    conn: PgPool,
}
impl Loader<Uuid> for OpProductOpportunityIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, opportunity_id from crm.opportunity_products where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct OpProductProductIdLoader {
    conn: PgPool,
}
impl Loader<Uuid> for OpProductProductIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, product_id from crm.opportunity_products where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct OpProductQuantityLoader {
    conn: PgPool,
}
impl Loader<Uuid> for OpProductQuantityLoader {
    type Error = Arc<sqlx::Error>;
    type Value = f64;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, quantity from crm.opportunity_products where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct OpProductUnitPriceLoader {
    conn: PgPool,
}
impl Loader<Uuid> for OpProductUnitPriceLoader {
    type Error = Arc<sqlx::Error>;
    type Value = f64;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, unit_price from crm.opportunity_products where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct OpProductTotalPriceLoader {
    conn: PgPool,
}
impl Loader<Uuid> for OpProductTotalPriceLoader {
    type Error = Arc<sqlx::Error>;
    type Value = f64;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, total_price from crm.opportunity_products where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct OpProductCreatedAtLoader {
    conn: PgPool,
}
impl Loader<Uuid> for OpProductCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from crm.opportunity_products where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct OpProductUpdatedAtLoader {
    conn: PgPool,
}
impl Loader<Uuid> for OpProductUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;
    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from crm.opportunity_products where id = ANY($1)",
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
    schema: async_graphql::SchemaBuilder<S, S, async_graphql::EmptySubscription>,
) -> async_graphql::SchemaBuilder<S, S, async_graphql::EmptySubscription> {
    schema
        .data(DataLoader::new(
            ProductIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            ProductNameLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            ProductDescriptionLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            ProductPriceLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            ProductSkuLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            ProductCreatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            ProductUpdatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OpProductIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OpProductOpportunityIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OpProductProductIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OpProductQuantityLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OpProductUnitPriceLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OpProductTotalPriceLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OpProductCreatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            OpProductUpdatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
}

use crate::opportunities::OpportunitiesNode;
use async_graphql::{Context, Object};

// Products node
pub struct ProductsNode {
    pub id: Uuid,
}

#[Object]
impl ProductsNode {
    async fn id(&self, ctx: &Context<'_>) -> async_graphql::Result<Uuid> {
        let loader = ctx.data::<DataLoader<ProductIdLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn name(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<ProductNameLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn description(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<ProductDescriptionLoader>>()?;
        Ok(loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))?)
    }

    async fn price(&self, ctx: &Context<'_>) -> async_graphql::Result<f64> {
        let loader = ctx.data::<DataLoader<ProductPriceLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn sku(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<ProductSkuLoader>>()?;
        Ok(loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))?)
    }

    async fn created_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<ProductCreatedAtLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn updated_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<ProductUpdatedAtLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }
}

// OpportunityProducts node
pub struct OpportunityProductsNode {
    pub id: Uuid,
}

#[Object]
impl OpportunityProductsNode {
    async fn id(&self, ctx: &Context<'_>) -> async_graphql::Result<Uuid> {
        let loader = ctx.data::<DataLoader<OpProductIdLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn opportunity(&self, ctx: &Context<'_>) -> async_graphql::Result<OpportunitiesNode> {
        let loader = ctx.data::<DataLoader<OpProductOpportunityIdLoader>>()?;
        let id = loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))?;
        Ok(OpportunitiesNode { id })
    }

    async fn product(&self, ctx: &Context<'_>) -> async_graphql::Result<ProductsNode> {
        let loader = ctx.data::<DataLoader<OpProductProductIdLoader>>()?;
        let id = loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))?;
        Ok(ProductsNode { id })
    }

    async fn quantity(&self, ctx: &Context<'_>) -> async_graphql::Result<f64> {
        let loader = ctx.data::<DataLoader<OpProductQuantityLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn unit_price(&self, ctx: &Context<'_>) -> async_graphql::Result<f64> {
        let loader = ctx.data::<DataLoader<OpProductUnitPriceLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn total_price(&self, ctx: &Context<'_>) -> async_graphql::Result<f64> {
        let loader = ctx.data::<DataLoader<OpProductTotalPriceLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn created_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<OpProductCreatedAtLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }

    async fn updated_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<OpProductUpdatedAtLoader>>()?;
        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Not Found"))
    }
}

// Queries and Mutations for products
#[derive(Debug, Default)]
pub struct ProductsQuery;

#[Object]
impl ProductsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<ProductsNode>> {
        let conn = ctx.data::<PgPool>()?;
        let sql = sea_query::Query::select()
            .from(("crm", Products::Table))
            .column(sea_query::Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| ProductsNode { id })
            .collect::<Vec<_>>())
    }

    async fn view(&self, id: Uuid) -> async_graphql::Result<ProductsNode> {
        Ok(ProductsNode { id })
    }
}

#[derive(Debug, Default)]
pub struct ProductsMutation;

#[Object]
impl ProductsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        input: InsertProducts,
    ) -> async_graphql::Result<ProductsNode> {
        let conn = ctx.data::<PgPool>()?;
        let sql = sea_query::Query::insert()
            .into_table((sea_query::Alias::new("crm"), Products::Table))
            .columns([
                Products::Name,
                Products::Description,
                Products::Price,
                Products::Sku,
            ])
            .returning(sea_query::Query::returning().column(Products::Id))
            .values([
                input.name.into(),
                input.description.into(),
                input.price.into(),
                input.sku.into(),
            ])?
            .to_string(sea_query::PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;
        Ok(ProductsNode { id })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateProducts,
    ) -> async_graphql::Result<ProductsNode> {
        let conn = ctx.data::<PgPool>()?;
        let schema_alias = sea_query::Alias::new("crm");
        let mut sql = sea_query::Query::update();

        let mut sql = sql.table((schema_alias.clone(), Products::Table));

        if let Some(name) = input.name {
            sql = sql.value(Products::Name, name);
        }
        if let Some(description) = input.description {
            match description {
                Some(desc) => sql = sql.value(Products::Description, desc),
                None => sql = sql.value(Products::Description, Option::<String>::None),
            }
        }
        if let Some(price) = input.price {
            sql = sql.value(Products::Price, price);
        }
        if let Some(sku) = input.sku {
            match sku {
                Some(s) => sql = sql.value(Products::Sku, s),
                None => sql = sql.value(Products::Sku, Option::<String>::None),
            }
        }

        sql = sql
            .and_where(sea_query::Expr::col(Products::Id).eq(id.to_string()))
            .returning(sea_query::Query::returning().column(Products::Id));

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql.to_string(sea_query::PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;
        Ok(ProductsNode { id })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;
        let sql = sea_query::Query::delete()
            .from_table((sea_query::Alias::new("crm"), Products::Table))
            .and_where(sea_query::Expr::col(Products::Id).eq(id.to_string()))
            .to_string(sea_query::PostgresQueryBuilder);
        let result = sqlx::query(&sql).execute(conn).await?;
        if result.rows_affected() != 1 {
            Err(async_graphql::Error::new("Failed to remove product"))
        } else {
            Ok("Product removed successfully".into())
        }
    }
}

// Queries and Mutations for opportunity_products
#[derive(Debug, Default)]
pub struct OpportunityProductsQuery;

#[Object]
impl OpportunityProductsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<OpportunityProductsNode>> {
        let conn = ctx.data::<PgPool>()?;
        let sql = sea_query::Query::select()
            .from(("crm", OpportunityProducts::Table))
            .column(sea_query::Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);
        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| OpportunityProductsNode { id })
            .collect::<Vec<_>>())
    }

    async fn view(&self, id: Uuid) -> async_graphql::Result<OpportunityProductsNode> {
        Ok(OpportunityProductsNode { id })
    }

    async fn by_opportunity(
        &self,
        ctx: &Context<'_>,
        opportunity_id: Uuid,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<OpportunityProductsNode>> {
        let conn = ctx.data::<PgPool>()?;
        let sql = sea_query::Query::select()
            .from(("crm", OpportunityProducts::Table))
            .column(sea_query::Alias::new("id"))
            .and_where(
                sea_query::Expr::col(OpportunityProducts::OpportunityId)
                    .eq(opportunity_id.to_string()),
            )
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);
        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| OpportunityProductsNode { id })
            .collect::<Vec<_>>())
    }
}

#[derive(Debug, Default)]
pub struct OpportunityProductsMutation;

#[Object]
impl OpportunityProductsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        input: InsertOpportunityProducts,
    ) -> async_graphql::Result<OpportunityProductsNode> {
        let conn = ctx.data::<PgPool>()?;
        let sql = sea_query::Query::insert()
            .into_table((sea_query::Alias::new("crm"), OpportunityProducts::Table))
            .columns([
                OpportunityProducts::OpportunityId,
                OpportunityProducts::ProductId,
                OpportunityProducts::Quantity,
                OpportunityProducts::UnitPrice,
            ])
            .returning(sea_query::Query::returning().column(OpportunityProducts::Id))
            .values([
                input.opportunity_id.to_string().into(),
                input.product_id.to_string().into(),
                input.quantity.into(),
                input.unit_price.into(),
            ])?
            .to_string(sea_query::PostgresQueryBuilder);
        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;
        Ok(OpportunityProductsNode { id })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateOpportunityProducts,
    ) -> async_graphql::Result<OpportunityProductsNode> {
        let conn = ctx.data::<PgPool>()?;
        let schema_alias = sea_query::Alias::new("crm");
        let mut sql = sea_query::Query::update();

        let mut sql = sql.table((schema_alias.clone(), OpportunityProducts::Table));

        if let Some(op_id) = input.opportunity_id {
            sql = sql.value(OpportunityProducts::OpportunityId, op_id.to_string());
        }
        if let Some(prod_id) = input.product_id {
            sql = sql.value(OpportunityProducts::ProductId, prod_id.to_string());
        }
        if let Some(quantity) = input.quantity {
            sql = sql.value(OpportunityProducts::Quantity, quantity);
        }
        if let Some(unit_price) = input.unit_price {
            sql = sql.value(OpportunityProducts::UnitPrice, unit_price);
        }

        sql = sql
            .and_where(sea_query::Expr::col(OpportunityProducts::Id).eq(id.to_string()))
            .returning(sea_query::Query::returning().column(OpportunityProducts::Id));
        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql.to_string(sea_query::PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;
        Ok(OpportunityProductsNode { id })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;
        let sql = sea_query::Query::delete()
            .from_table((sea_query::Alias::new("crm"), OpportunityProducts::Table))
            .and_where(sea_query::Expr::col(OpportunityProducts::Id).eq(id.to_string()))
            .to_string(sea_query::PostgresQueryBuilder);
        let result = sqlx::query(&sql).execute(conn).await?;
        if result.rows_affected() != 1 {
            Err(async_graphql::Error::new(
                "Failed to remove opportunity_product",
            ))
        } else {
            Ok("OpportunityProduct removed successfully".into())
        }
    }
}
