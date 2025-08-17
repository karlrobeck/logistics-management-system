// Auto-generated SeaQuery identifiers for org ABAC tables.
// Source migration: migrations/20250813141654_org-abac.up.sql

// Auto-generated SeaQuery identifiers for org ABAC tables.
// Source migration: migrations/20250813141654_org-abac.up.sql

use sea_query::Iden;

use async_graphql::Enum;
use async_graphql::InputObject;
use async_graphql::dataloader::{DataLoader, Loader};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use std::sync::Arc;
use uuid::Uuid;

/// Rust representation of Postgres enum `org.permission_actions`.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Serialize, Enum)]
pub enum PermissionActions {
    Select,
    Read,
    Update,
    Delete,
}

// Insert / Update InputObjects

#[derive(Deserialize, InputObject)]
pub struct InsertRoles {
    pub org_id: Uuid,
    pub name: String,
    pub description: Option<String>,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateRoles {
    pub org_id: Option<Uuid>,
    pub name: Option<String>,
    pub description: Option<Option<String>>,
}

#[derive(Deserialize, InputObject)]
pub struct InsertTeamRoles {
    pub role_id: Uuid,
    pub team_id: Uuid,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateTeamRoles {
    pub role_id: Option<Uuid>,
    pub team_id: Option<Uuid>,
}

#[derive(Deserialize, InputObject)]
pub struct InsertRoleActions {
    pub role_id: Uuid,
    pub action: PermissionActions,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateRoleActions {
    pub role_id: Option<Uuid>,
    pub action: Option<PermissionActions>,
}

#[derive(Deserialize, InputObject)]
pub struct InsertTeamResouces {
    pub resource: String,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateTeamResouces {
    pub resource: Option<String>,
}

/// SQL identifier for `org.roles` table.
#[derive(Iden)]
pub enum Roles {
    Table,
    Id,
    OrgId,
    Name,
    Description,
    CreatedAt,
    UpdatedAt,
}

/// SQL identifier for `org.team_roles` table.
#[derive(Iden)]
pub enum TeamRoles {
    Table,
    RoleId,
    TeamId,
}

/// SQL identifier for `org.role_actions` table.
#[derive(Iden)]
pub enum RoleActions {
    Table,
    Id,
    RoleId,
    Action,
    CreatedAt,
    UpdatedAt,
}

/// SQL identifier for `org.team_resouces` table (note: typo preserved).
#[derive(Iden)]
pub enum TeamResouces {
    Table,
    Id,
    Resource,
    CreatedAt,
    UpdatedAt,
}

// columns - Roles

pub struct RoleIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for RoleIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from org.roles where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct RoleOrgIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for RoleOrgIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, org_id from org.roles where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct RoleNameLoader {
    conn: PgPool,
}

impl Loader<Uuid> for RoleNameLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, name from org.roles where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct RoleDescriptionLoader {
    conn: PgPool,
}

impl Loader<Uuid> for RoleDescriptionLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, description from org.roles where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct RoleCreatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for RoleCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from org.roles where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct RoleUpdatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for RoleUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from org.roles where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

// columns - TeamRoles

pub struct TeamRoleRoleIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for TeamRoleRoleIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select role_id, role_id from org.team_roles where role_id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct TeamRoleTeamIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for TeamRoleTeamIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select team_id, team_id from org.team_roles where team_id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

// columns - RoleActions

pub struct RoleActionIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for RoleActionIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from org.role_actions where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct RoleActionRoleIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for RoleActionRoleIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, role_id from org.role_actions where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct RoleActionActionLoader {
    conn: PgPool,
}

impl Loader<Uuid> for RoleActionActionLoader {
    type Error = Arc<sqlx::Error>;
    type Value = PermissionActions;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        let rows = sqlx::query_as::<_, (Uuid, String)>(
            "select id, action::text from org.role_actions where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?;

        Ok(rows
            .into_iter()
            .map(|(id, action_text)| {
                let action = match action_text.as_str() {
                    "select" => PermissionActions::Select,
                    "read" => PermissionActions::Read,
                    "update" => PermissionActions::Update,
                    "delete" => PermissionActions::Delete,
                    _ => PermissionActions::Select,
                };

                (id, action)
            })
            .collect())
    }
}

pub struct RoleActionCreatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for RoleActionCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from org.role_actions where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct RoleActionUpdatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for RoleActionUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from org.role_actions where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

// columns - TeamResouces

pub struct TeamResouceIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for TeamResouceIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from org.team_resouces where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct TeamResouceResourceLoader {
    conn: PgPool,
}

impl Loader<Uuid> for TeamResouceResourceLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, resource from org.team_resouces where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct TeamResouceCreatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for TeamResouceCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from org.team_resouces where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct TeamResouceUpdatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for TeamResouceUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from org.team_resouces where id = ANY($1)",
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
        // roles
        .data(DataLoader::new(
            RoleIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            RoleOrgIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            RoleNameLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            RoleDescriptionLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            RoleCreatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            RoleUpdatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        // team_roles
        .data(DataLoader::new(
            TeamRoleRoleIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            TeamRoleTeamIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        // role_actions
        .data(DataLoader::new(
            RoleActionIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            RoleActionRoleIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            RoleActionActionLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            RoleActionCreatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            RoleActionUpdatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        // team_resouces
        .data(DataLoader::new(
            TeamResouceIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            TeamResouceResourceLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            TeamResouceCreatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            TeamResouceUpdatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
}

use crate::organization::OrganizationNode;
use crate::teams::TeamsNode;
use async_graphql::{Context, Object};

// Roles node
pub struct RolesNode {
    id: Uuid,
}

#[Object]
impl RolesNode {
    async fn id(&self, ctx: &Context<'_>) -> async_graphql::Result<Uuid> {
        let loader = ctx.data::<DataLoader<RoleIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn org(&self, ctx: &Context<'_>) -> async_graphql::Result<OrganizationNode> {
        let loader = ctx.data::<DataLoader<RoleOrgIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .map(|id| OrganizationNode { id })
            .ok_or_else(|| "Not Found".into())
    }

    async fn name(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<RoleNameLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn description(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<RoleDescriptionLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn created_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<RoleCreatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn updated_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<RoleUpdatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }
}

// Roles query
#[derive(Debug, Default)]
pub struct RolesQuery;

#[Object]
impl RolesQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<RolesNode>> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::select()
            .from(("org", "roles"))
            .column(sea_query::Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| RolesNode { id })
            .collect::<Vec<_>>())
    }

    async fn view(&self, id: Uuid) -> async_graphql::Result<RolesNode> {
        Ok(RolesNode { id })
    }
}

// RoleActions node
pub struct RoleActionsNode {
    id: Uuid,
}

#[Object]
impl RoleActionsNode {
    async fn id(&self, ctx: &Context<'_>) -> async_graphql::Result<Uuid> {
        let loader = ctx.data::<DataLoader<RoleActionIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn role(&self, ctx: &Context<'_>) -> async_graphql::Result<RolesNode> {
        let loader = ctx.data::<DataLoader<RoleActionRoleIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .map(|id| RolesNode { id })
            .ok_or_else(|| "Not Found".into())
    }

    async fn action(&self, ctx: &Context<'_>) -> async_graphql::Result<PermissionActions> {
        let loader = ctx.data::<DataLoader<RoleActionActionLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn created_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<RoleActionCreatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn updated_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<RoleActionUpdatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }
}

// RoleActions query
#[derive(Debug, Default)]
pub struct RoleActionsQuery;

#[Object]
impl RoleActionsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<RoleActionsNode>> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::select()
            .from(("org", "role_actions"))
            .column(sea_query::Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| RoleActionsNode { id })
            .collect::<Vec<_>>())
    }

    async fn view(&self, id: Uuid) -> async_graphql::Result<RoleActionsNode> {
        Ok(RoleActionsNode { id })
    }
}

// TeamResouces node
pub struct TeamResoucesNode {
    id: Uuid,
}

#[Object]
impl TeamResoucesNode {
    async fn id(&self, ctx: &Context<'_>) -> async_graphql::Result<Uuid> {
        let loader = ctx.data::<DataLoader<TeamResouceIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn resource(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<TeamResouceResourceLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn created_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<TeamResouceCreatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn updated_at(&self, ctx: &Context<'_>) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<TeamResouceUpdatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }
}

// TeamResouces query
#[derive(Debug, Default)]
pub struct TeamResoucesQuery;

#[Object]
impl TeamResoucesQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<TeamResoucesNode>> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::select()
            .from(("org", "team_resouces"))
            .column(sea_query::Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| TeamResoucesNode { id })
            .collect::<Vec<_>>())
    }

    async fn view(&self, id: Uuid) -> async_graphql::Result<TeamResoucesNode> {
        Ok(TeamResoucesNode { id })
    }
}

// TeamRoles pair type and query (junction table has no single id)
pub struct TeamRolePair {
    pub role_id: Uuid,
    pub team_id: Uuid,
}

#[Object]
impl TeamRolePair {
    async fn role(&self) -> RolesNode {
        RolesNode { id: self.role_id }
    }

    async fn team(&self) -> TeamsNode {
        TeamsNode { id: self.team_id }
    }
}

#[derive(Debug, Default)]
pub struct TeamRolesQuery;

#[Object]
impl TeamRolesQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<TeamRolePair>> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::select()
            .from(("org", "team_roles"))
            .column(sea_query::Alias::new("role_id"))
            .column(sea_query::Alias::new("team_id"))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid, Uuid)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(role_id, team_id)| TeamRolePair { role_id, team_id })
            .collect::<Vec<_>>())
    }

    async fn view(
        &self,
        ctx: &Context<'_>,
        role_id: Uuid,
        team_id: Uuid,
    ) -> async_graphql::Result<TeamRolePair> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::select()
            .from(("org", "team_roles"))
            .column(sea_query::Alias::new("role_id"))
            .column(sea_query::Alias::new("team_id"))
            .and_where(
                sea_query::Expr::col(("org", "team_roles", "role_id")).eq(role_id.to_string()),
            )
            .and_where(
                sea_query::Expr::col(("org", "team_roles", "team_id")).eq(team_id.to_string()),
            )
            .to_string(sea_query::PostgresQueryBuilder);

        let (r_id, t_id) = sqlx::query_as::<_, (Uuid, Uuid)>(&sql)
            .fetch_one(conn)
            .await?;

        Ok(TeamRolePair {
            role_id: r_id,
            team_id: t_id,
        })
    }
}

// ----------------
// GraphQL Mutations
// ----------------

#[derive(Debug, Default)]
pub struct RolesMutation;

#[Object]
impl RolesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        input: InsertRoles,
    ) -> async_graphql::Result<RolesNode> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::insert()
            .into_table(("org", "roles"))
            .columns([Roles::OrgId, Roles::Name, Roles::Description])
            .returning(sea_query::Query::returning().column(Roles::Id))
            .values([
                input.org_id.to_string().into(),
                input.name.into(),
                input.description.into(),
            ])?
            .to_string(sea_query::PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;

        Ok(RolesNode { id })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateRoles,
    ) -> async_graphql::Result<RolesNode> {
        let conn = ctx.data::<PgPool>()?;

        let mut upd = sea_query::Query::update();
        let mut upd = upd.table(("org", "roles"));

        if let Some(org_id) = input.org_id {
            upd = upd.value(Roles::OrgId, org_id.to_string());
        }

        if let Some(name) = input.name {
            upd = upd.value(Roles::Name, name);
        }

        if let Some(description) = input.description {
            upd = upd.value(Roles::Description, description);
        }

        upd = upd
            .and_where(sea_query::Expr::col(Roles::Id).eq(id.to_string()))
            .returning(sea_query::Query::returning().column(Roles::Id));

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&upd.to_string(sea_query::PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;

        Ok(RolesNode { id })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::delete()
            .from_table(("org", "roles"))
            .and_where(sea_query::Expr::col(Roles::Id).eq(id.to_string()))
            .to_string(sea_query::PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn).await?;

        if result.rows_affected() != 1 {
            Err("Failed to remove role".into())
        } else {
            Ok("Role removed successfully".into())
        }
    }
}

#[derive(Debug, Default)]
pub struct TeamRolesMutation;

#[Object]
impl TeamRolesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        input: InsertTeamRoles,
    ) -> async_graphql::Result<TeamRolePair> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::insert()
            .into_table(("org", "team_roles"))
            .columns([TeamRoles::RoleId, TeamRoles::TeamId])
            .values([
                input.role_id.to_string().into(),
                input.team_id.to_string().into(),
            ])?
            .to_string(sea_query::PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn).await?;

        if result.rows_affected() != 1 {
            Err("Failed to create team_role".into())
        } else {
            Ok(TeamRolePair {
                role_id: input.role_id,
                team_id: input.team_id,
            })
        }
    }

    async fn delete(
        &self,
        ctx: &Context<'_>,
        role_id: Uuid,
        team_id: Uuid,
    ) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::delete()
            .from_table(("org", "team_roles"))
            .and_where(
                sea_query::Expr::col(("org", "team_roles", "role_id")).eq(role_id.to_string()),
            )
            .and_where(
                sea_query::Expr::col(("org", "team_roles", "team_id")).eq(team_id.to_string()),
            )
            .to_string(sea_query::PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn).await?;

        if result.rows_affected() != 1 {
            Err("Failed to remove team_role".into())
        } else {
            Ok("TeamRole removed successfully".into())
        }
    }
}

#[derive(Debug, Default)]
pub struct RoleActionsMutation;

impl RoleActionsMutation {
    fn action_to_text(a: PermissionActions) -> &'static str {
        match a {
            PermissionActions::Select => "select",
            PermissionActions::Read => "read",
            PermissionActions::Update => "update",
            PermissionActions::Delete => "delete",
        }
    }
}

#[Object]
impl RoleActionsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        input: InsertRoleActions,
    ) -> async_graphql::Result<RoleActionsNode> {
        let conn = ctx.data::<PgPool>()?;

        let action_text = Self::action_to_text(input.action);

        let sql = sea_query::Query::insert()
            .into_table(("org", "role_actions"))
            .columns([RoleActions::RoleId, RoleActions::Action])
            .returning(sea_query::Query::returning().column(RoleActions::Id))
            .values([input.role_id.to_string().into(), action_text.into()])?
            .to_string(sea_query::PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;

        Ok(RoleActionsNode { id })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateRoleActions,
    ) -> async_graphql::Result<RoleActionsNode> {
        let conn = ctx.data::<PgPool>()?;

        let mut upd = sea_query::Query::update();
        let mut upd = upd.table(("org", "role_actions"));

        if let Some(role_id) = input.role_id {
            upd = upd.value(RoleActions::RoleId, role_id.to_string());
        }

        if let Some(action) = input.action {
            let action_text = Self::action_to_text(action);
            upd = upd.value(RoleActions::Action, action_text);
        }

        upd = upd
            .and_where(sea_query::Expr::col(RoleActions::Id).eq(id.to_string()))
            .returning(sea_query::Query::returning().column(RoleActions::Id));

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&upd.to_string(sea_query::PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;

        Ok(RoleActionsNode { id })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::delete()
            .from_table(("org", "role_actions"))
            .and_where(sea_query::Expr::col(RoleActions::Id).eq(id.to_string()))
            .to_string(sea_query::PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn).await?;

        if result.rows_affected() != 1 {
            Err("Failed to remove role_action".into())
        } else {
            Ok("RoleAction removed successfully".into())
        }
    }
}

#[derive(Debug, Default)]
pub struct TeamResoucesMutation;

#[Object]
impl TeamResoucesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        input: InsertTeamResouces,
    ) -> async_graphql::Result<TeamResoucesNode> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::insert()
            .into_table(("org", "team_resouces"))
            .columns([TeamResouces::Resource])
            .returning(sea_query::Query::returning().column(TeamResouces::Id))
            .values([input.resource.into()])?
            .to_string(sea_query::PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;

        Ok(TeamResoucesNode { id })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        input: UpdateTeamResouces,
    ) -> async_graphql::Result<TeamResoucesNode> {
        let conn = ctx.data::<PgPool>()?;

        let mut upd = sea_query::Query::update();
        let mut upd = upd.table(("org", "team_resouces"));

        if let Some(resource) = input.resource {
            upd = upd.value(TeamResouces::Resource, resource);
        }

        upd = upd
            .and_where(sea_query::Expr::col(TeamResouces::Id).eq(id.to_string()))
            .returning(sea_query::Query::returning().column(TeamResouces::Id));

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&upd.to_string(sea_query::PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;

        Ok(TeamResoucesNode { id })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::delete()
            .from_table(("org", "team_resouces"))
            .and_where(sea_query::Expr::col(TeamResouces::Id).eq(id.to_string()))
            .to_string(sea_query::PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn).await?;

        if result.rows_affected() != 1 {
            Err("Failed to remove team_resouce".into())
        } else {
            Ok("TeamResouce removed successfully".into())
        }
    }
}
