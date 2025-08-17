// Auto-generated SeaQuery identifiers for the `org.teams` and `org.team_members` tables.
// Source migration: migrations/20250813140628_org-teams.up.sql

use async_graphql::InputObject;
use async_graphql::dataloader::{DataLoader, Loader};
use chrono::{DateTime, Utc};
use sea_query::Iden;
use serde::Deserialize;
use sqlx::PgPool;
use std::sync::Arc;
use uuid::Uuid;

/// SQL identifier for `org.teams` table used with SeaQuery builders.
#[derive(Iden)]
pub enum Teams {
    Table,
    Id,
    OrgId,
    Name,
    Description,
    CreatedAt,
    UpdatedAt,
}

/// SQL identifier for `org.team_members` table used with SeaQuery builders.
#[derive(Iden)]
pub enum TeamMembers {
    Table,
    Id,
    TeamId,
    UserId,
    CreatedAt,
    UpdatedAt,
}

#[derive(Deserialize, InputObject)]
pub struct InsertTeams {
    pub org_id: Uuid,
    pub name: String,
    pub description: Option<String>,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateTeams {
    pub org_id: Option<Uuid>,
    pub name: Option<String>,
    pub description: Option<Option<String>>,
}

#[derive(Deserialize, InputObject)]
pub struct InsertTeamMembers {
    pub team_id: Uuid,
    pub user_id: Uuid,
}

#[derive(Deserialize, InputObject)]
pub struct UpdateTeamMembers {
    pub team_id: Option<Uuid>,
    pub user_id: Option<Uuid>,
}

// columns - Teams

pub struct TeamIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for TeamIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from org.teams where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct TeamOrgIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for TeamOrgIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, org_id from org.teams where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct TeamNameLoader {
    conn: PgPool,
}

impl Loader<Uuid> for TeamNameLoader {
    type Error = Arc<sqlx::Error>;
    type Value = String;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, name from org.teams where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct TeamDescriptionLoader {
    conn: PgPool,
}

impl Loader<Uuid> for TeamDescriptionLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Option<String>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, description from org.teams where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct TeamCreatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for TeamCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from org.teams where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct TeamUpdatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for TeamUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from org.teams where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

// columns - Team Members

pub struct TeamMemberIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for TeamMemberIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, id from org.team_members where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct TeamMemberTeamIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for TeamMemberTeamIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, team_id from org.team_members where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct TeamMemberUserIdLoader {
    conn: PgPool,
}

impl Loader<Uuid> for TeamMemberUserIdLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Uuid;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, user_id from org.team_members where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct TeamMemberCreatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for TeamMemberCreatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, created_at from org.team_members where id = ANY($1)",
        )
        .bind(keys)
        .fetch_all(&self.conn)
        .await
        .map_err(Arc::new)?
        .into_iter()
        .collect())
    }
}

pub struct TeamMemberUpdatedAtLoader {
    conn: PgPool,
}

impl Loader<Uuid> for TeamMemberUpdatedAtLoader {
    type Error = Arc<sqlx::Error>;
    type Value = DateTime<Utc>;

    async fn load(
        &self,
        keys: &[Uuid],
    ) -> Result<std::collections::HashMap<Uuid, Self::Value>, Self::Error> {
        Ok(sqlx::query_as::<_, (Uuid, Self::Value)>(
            "select id, updated_at from org.team_members where id = ANY($1)",
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
        // teams
        .data(DataLoader::new(
            TeamIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            TeamOrgIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            TeamNameLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            TeamDescriptionLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            TeamCreatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            TeamUpdatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        // team members
        .data(DataLoader::new(
            TeamMemberIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            TeamMemberTeamIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            TeamMemberUserIdLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            TeamMemberCreatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
        .data(DataLoader::new(
            TeamMemberUpdatedAtLoader { conn: pool.clone() },
            tokio::spawn,
        ))
}

use crate::organization::OrganizationNode;
use auth::users::UsersNode;

// Teams node
pub struct TeamsNode {
    pub id: Uuid,
}

#[async_graphql::Object]
impl TeamsNode {
    async fn id(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<Uuid> {
        let loader = ctx.data::<DataLoader<TeamIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn org(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<OrganizationNode> {
        let loader = ctx.data::<DataLoader<TeamOrgIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .map(|id| OrganizationNode { id })
            .ok_or_else(|| "Not Found".into())
    }

    async fn name(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<String> {
        let loader = ctx.data::<DataLoader<TeamNameLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn description(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<Option<String>> {
        let loader = ctx.data::<DataLoader<TeamDescriptionLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn created_at(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<TeamCreatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn updated_at(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<TeamUpdatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }
}

// Teams query
#[derive(Debug, Default)]
pub struct TeamsQuery;

#[async_graphql::Object]
impl TeamsQuery {
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<TeamsNode>> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::select()
            .from(("org", "teams"))
            .column(sea_query::Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| TeamsNode { id })
            .collect::<Vec<_>>())
    }

    async fn view(&self, id: Uuid) -> async_graphql::Result<TeamsNode> {
        Ok(TeamsNode { id })
    }
}

// TeamMembers node
pub struct TeamMembersNode {
    id: Uuid,
}

#[async_graphql::Object]
impl TeamMembersNode {
    async fn id(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<Uuid> {
        let loader = ctx.data::<DataLoader<TeamMemberIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn team(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<TeamsNode> {
        let loader = ctx.data::<DataLoader<TeamMemberTeamIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .map(|id| TeamsNode { id })
            .ok_or_else(|| "Not Found".into())
    }

    async fn user(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<UsersNode> {
        let loader = ctx.data::<DataLoader<TeamMemberUserIdLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .map(|id| UsersNode { id })
            .ok_or_else(|| "Not Found".into())
    }

    async fn created_at(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<TeamMemberCreatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }

    async fn updated_at(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<DateTime<Utc>> {
        let loader = ctx.data::<DataLoader<TeamMemberUpdatedAtLoader>>()?;

        loader
            .load_one(self.id)
            .await?
            .ok_or_else(|| "Not Found".into())
    }
}

// TeamMembers query
#[derive(Debug, Default)]
pub struct TeamMembersQuery;

#[async_graphql::Object]
impl TeamMembersQuery {
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        limit: u64,
        offset: u64,
    ) -> async_graphql::Result<Vec<TeamMembersNode>> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::select()
            .from(("org", "team_members"))
            .column(sea_query::Alias::new("id"))
            .limit(limit)
            .offset(offset)
            .to_string(sea_query::PostgresQueryBuilder);

        Ok(sqlx::query_as::<_, (Uuid,)>(&sql)
            .fetch_all(conn)
            .await?
            .into_iter()
            .map(|(id,)| TeamMembersNode { id })
            .collect::<Vec<_>>())
    }

    async fn view(&self, id: Uuid) -> async_graphql::Result<TeamMembersNode> {
        Ok(TeamMembersNode { id })
    }
}

// graphql mutations
#[derive(Debug, Default)]
pub struct TeamsMutation;

#[async_graphql::Object]
impl TeamsMutation {
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        input: InsertTeams,
    ) -> async_graphql::Result<TeamsNode> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::insert()
            .into_table((sea_query::Alias::new("org"), Teams::Table))
            .columns([Teams::OrgId, Teams::Name, Teams::Description])
            .returning(sea_query::Query::returning().column(Teams::Id))
            .values([
                input.org_id.to_string().into(),
                input.name.into(),
                input.description.into(),
            ])?
            .to_string(sea_query::PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;

        Ok(TeamsNode { id })
    }

    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        input: UpdateTeams,
    ) -> async_graphql::Result<TeamsNode> {
        let conn = ctx.data::<PgPool>()?;

        let mut sql = sea_query::Query::update();
        let mut sql = sql.table((sea_query::Alias::new("org"), Teams::Table));

        if let Some(org_id) = input.org_id {
            sql = sql.value(Teams::OrgId, org_id.to_string());
        }

        if let Some(name) = input.name {
            sql = sql.value(Teams::Name, name);
        }

        if let Some(description) = input.description {
            sql = sql.value(Teams::Description, description);
        }

        sql = sql
            .and_where(sea_query::Expr::col(Teams::Id).eq(id.to_string()))
            .returning(sea_query::Query::returning().column(Teams::Id));

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql.to_string(sea_query::PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;

        Ok(TeamsNode { id })
    }

    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::delete()
            .from_table((sea_query::Alias::new("org"), Teams::Table))
            .and_where(sea_query::Expr::col(Teams::Id).eq(id.to_string()))
            .to_string(sea_query::PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn).await?;

        if result.rows_affected() != 1 {
            Err("Failed to remove team".into())
        } else {
            Ok("Team removed successfully".into())
        }
    }
}

#[derive(Debug, Default)]
pub struct TeamMembersMutation;

#[async_graphql::Object]
impl TeamMembersMutation {
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        input: InsertTeamMembers,
    ) -> async_graphql::Result<TeamMembersNode> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::insert()
            .into_table((sea_query::Alias::new("org"), TeamMembers::Table))
            .columns([TeamMembers::TeamId, TeamMembers::UserId])
            .returning(sea_query::Query::returning().column(TeamMembers::Id))
            .values([
                input.team_id.to_string().into(),
                input.user_id.to_string().into(),
            ])?
            .to_string(sea_query::PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql).fetch_one(conn).await?;

        Ok(TeamMembersNode { id })
    }

    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        input: UpdateTeamMembers,
    ) -> async_graphql::Result<TeamMembersNode> {
        let conn = ctx.data::<PgPool>()?;

        let mut sql = sea_query::Query::update();
        let mut sql = sql.table((sea_query::Alias::new("org"), TeamMembers::Table));

        if let Some(team_id) = input.team_id {
            sql = sql.value(TeamMembers::TeamId, team_id.to_string());
        }

        if let Some(user_id) = input.user_id {
            sql = sql.value(TeamMembers::UserId, user_id.to_string());
        }

        sql = sql
            .and_where(sea_query::Expr::col(TeamMembers::Id).eq(id.to_string()))
            .returning(sea_query::Query::returning().column(TeamMembers::Id));

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&sql.to_string(sea_query::PostgresQueryBuilder))
            .fetch_one(conn)
            .await?;

        Ok(TeamMembersNode { id })
    }

    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let conn = ctx.data::<PgPool>()?;

        let sql = sea_query::Query::delete()
            .from_table((sea_query::Alias::new("org"), TeamMembers::Table))
            .and_where(sea_query::Expr::col(TeamMembers::Id).eq(id.to_string()))
            .to_string(sea_query::PostgresQueryBuilder);

        let result = sqlx::query(&sql).execute(conn).await?;

        if result.rows_affected() != 1 {
            Err("Failed to remove team member".into())
        } else {
            Ok("Team member removed successfully".into())
        }
    }
}
