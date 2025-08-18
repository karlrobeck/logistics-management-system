````instructions
# GitHub Copilot Instructions

## Project Overview
This is a logistics management system with integrated CRM functionality, currently undergoing a hybrid architecture migration. The system combines TypeScript frontend with Pylon GraphQL backend and Rust microservices for domain logic.

## Hybrid Architecture (Active Migration)

### Current State: TypeScript + Rust Microservices
The project is transitioning from pure TypeScript to a hybrid architecture:
- **Frontend**: React with TanStack Router, TypeScript, Shadcn/UI
- **API Layer**: Pylon (TypeScript GraphQL gateway)
- **Domain Services**: Rust microservices in `services/` (async-graphql)
- **Database**: PostgreSQL with comprehensive Row Level Security (RLS)

### Domain Structure
Four business domains with dual TypeScript/Rust implementations:
- **auth**: User authentication, sessions, accounts, verification
- **org**: Organizations, teams, roles, ABAC permissions
- **crm**: Companies, contacts, leads, opportunities, campaigns, invoices
- **lms**: Shipments, routes, warehouses, transport providers, pricing

### Service Architecture Patterns
```
services/{domain}/           # Rust microservice
├── Cargo.toml              # Workspace member with shared dependencies
├── src/
│   ├── lib.rs              # Domain Query/Mutation exports
│   └── {entity}.rs         # Entity resolvers with async-graphql
src/resolvers/{domain}/      # TypeScript GraphQL gateway
migrations/                  # SQLx migrations with RLS policies
```

### Development Workflow

**Start full development stack:**
```bash
docker compose -f dev.compose.yaml up -d  # PostgreSQL, MinIO, MailHog
bun run dev  # Backend (port 3000) + frontend (port 3001)
```

**Database operations:**
```bash
sqlx migrate run            # Apply pending migrations
bun run generate-types      # Regenerate Kysely types from schema
```

**Rust services development:**
```bash
cargo check --workspace     # Type check all services
cargo test --workspace      # Run Rust tests
```

### Key Architecture Patterns

**Rust Domain Services:**
Each Rust service exports Query/Mutation structs for async-graphql:
```rust
// services/auth/src/lib.rs
pub mod users;
pub mod session;

pub struct Query;
pub struct Mutation;
```

**TypeScript GraphQL Gateway:**
Pylon aggregates domain resolvers in `src/index.ts`:
```typescript
export const graphql = {
  Query: {
    auth: authResolver.queries,
    crm: crmResolver.queries,
    // ...
  },
  Mutation: {
    ...authResolver.mutations,
    ...crmResolver.mutations,
    // ...
  },
};
```

**Database Layer with RLS:**
- Comprehensive Row Level Security policies for multi-tenant access
- Schema-based organization: `auth.*`, `org.*`, `crm.*`, `lms.*`
- SQLx migrations with both up/down scripts
- Kysely type generation for TypeScript compatibility

**Entity Resolution Pattern:**
Both TypeScript and Rust follow the Node pattern for GraphQL:
```typescript
export class CrmContactNode {
  constructor(private model: Selectable<DB['crmContacts']>) {}
  
  async company() {
    return this.model.companyId 
      ? new CrmCompanyNode(await findCompanyById(this.model.companyId))
      : null;
  }
}
```

### Database Security & Multi-tenancy

**Organization-based access control:**
Every entity has `org_id` with RLS policies using helper functions:
```sql
-- Example policy pattern
create policy table_org_access on schema.table
  for select to public
  using (org_id in (select org_id from org.current_user_organizations()));
```

**Permission-based mutations:**
```sql
create policy table_update on schema.table
  for update to public
  using (org.current_user_has_permission(org_id, 'update'::org.permission_actions));
```

### Frontend Architecture (Unchanged)
- TanStack Router for file-based routing in `src/routes/`
- Auto-generated route tree in `routeTree.gen.ts`
- GQty for GraphQL client with auto-generated types
- Shadcn/UI components with Tailwind CSS
- Theme provider with dark mode support

### Build System & Deployment
- **Development**: Dual Rsbuild environments (`web`/`bun`) + Rust workspace
- **Frontend**: `src/client.tsx` → `dist/server/web/`
- **Backend**: `src/server.ts` → `dist/server/`
- **Production**: Docker with Rust + Bun runtime, includes SQLx CLI

### Migration Strategy Understanding
This codebase is actively migrating from TypeScript to Rust:
1. **Current**: TypeScript resolvers call Kysely → PostgreSQL
2. **Target**: Rust services with async-graphql → PostgreSQL via SQLx
3. **Gateway**: Pylon aggregates both during transition

**When adding features:**
- New entities: Implement in Rust services first
- Existing entities: May have dual implementations
- Database: Always use SQLx migrations, never ORM migrations

### Development Environment
**Required services (via docker-compose):**
```bash
docker compose -f dev.compose.yaml up -d
```
- **PostgreSQL**: localhost:5432 (postgres/postgres) - Primary database
- **MinIO**: localhost:9000 (minio/minio-password) - Object storage
- **MailHog**: localhost:8025 - Email testing UI (SMTP: 1025)

### Critical Files & Conventions

**Workspace root:**
- `Cargo.toml`: Rust workspace with shared async-graphql dependencies
- `package.json`: Complex dev script with concurrent backend/frontend
- `rsbuild.config.ts`: Dual-environment build with migration copy
- `migrations/`: SQLx migrations with comprehensive RLS policies

**Database patterns:**
- All tables have UUID primary keys with `gen_random_uuid()`
- Timestamps: `created_at`, `updated_at` with `default now()`
- Multi-tenant via `org_id` foreign keys
- Extensive SQL comments for schema documentation

**Security model:**
- Row Level Security enabled on all tables
- Helper functions: `org.current_user_organizations()`, `auth.current_user_id()`
- Permission enum: `'read' | 'update' | 'delete'` in `org.permission_actions`

### Common Migration Tasks

**Adding new Rust entity:**
1. Create `services/{domain}/src/{entity}.rs` with async-graphql structs
2. Add SQLx migration with RLS policies
3. Export from `services/{domain}/src/lib.rs`
4. Update TypeScript gateway resolver if needed

**Database changes:**
```bash
sqlx migrate add {description}           # Create new migration
sqlx migrate run                         # Apply migrations
bun run generate-types                   # Update TypeScript types
```

**Working with RLS policies:**
Every new table needs 4 policy types: `_org_access`, `_update`, `_insert`, `_delete`
Follow existing patterns in `enable_rls_*_schema.up.sql` migrations.
