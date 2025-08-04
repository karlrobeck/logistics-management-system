# GitHub Copilot Instructions

## Project Overview
This is a logistics management system with integrated CRM functionality, built with a modern full-stack TypeScript architecture using Pylon (GraphQL), React with TanStack Router, and PostgreSQL with Kysely ORM.

## Architecture & Core Concepts

### Modular Domain Structure
The system is organized into 4 distinct business domains:
- **auth**: User authentication and authorization
- **org**: Organization and user management 
- **crm**: Customer relationship management (contacts, companies, campaigns, opportunities, invoices)
- **lms**: Logistics management system (shipments, routes, warehouses, providers, pricing)

Each domain follows the same pattern:
```
src/
├── db/schemas/{domain}/     # Zod schemas for validation
├── resolvers/{domain}/      # GraphQL resolvers grouped by entity
└── migrations/             # Domain-specific SQL migrations
```

### Development Workflow

**Start development environment:**
```bash
bun run dev  # Starts both backend (port 3000) and frontend (port 3001)
```

**Backend only (Pylon GraphQL server):**
```bash
bun run dev:backend  # Auto-generates GraphQL client types
```

**Database management:**
```bash
bun run generate-types  # Regenerate Kysely types from database schema
```

**Code quality:**
```bash
bun run format && bun run check  # Biome formatting and linting
```

### Key Patterns

**GraphQL Resolver Structure:**
Each entity resolver exports `queries` and `mutations` objects that get merged in domain index files, then combined in `src/index.ts`. Resolvers use Node classes for type-safe field resolution:

```typescript
export class CrmContactNode {
  constructor(private model: Selectable<DB['crmContacts']>) {}
  
  // Field resolvers with lazy loading
  async company() {
    return this.model.companyId 
      ? new CrmCompanyNode(await findCompanyById(this.model.companyId))
      : null;
  }
}
```

**Database Layer:**
- Kysely ORM with camelCase plugin for PostgreSQL
- Type-safe queries generated from migrations
- Zod schemas in `db/schemas/` for validation
- Migrations follow naming: `YYYYMMDDHHMMSS_{domain}.{up|down}.sql`

**Frontend Architecture:**
- TanStack Router for file-based routing in `src/routes/`
- Auto-generated route tree in `routeTree.gen.ts`
- GQty for GraphQL client with auto-generated types
- Shadcn/UI components with Tailwind CSS
- Theme provider with dark mode support

**Build System:**
- Rsbuild with dual environments: `web` (frontend) and `bun` (backend)
- Frontend serves from `src/client.tsx`, backend from `src/server.ts`
- Production builds to `dist/server/` with static assets in `web/` subdirectory

### Development Services

**Local services via docker-compose:**
```bash
docker compose -f dev.compose.yaml up -d
```
- PostgreSQL: localhost:5432 (postgres/postgres)
- MinIO object storage: localhost:9000 (minio/minio-password)
- MailHog email testing: localhost:8025

### Critical Files to Understand

- `src/index.ts`: GraphQL schema composition and domain resolver aggregation
- `src/resolvers/{domain}/index.ts`: Domain query/mutation exports
- `src/db/schemas/index.ts`: Centralized schema exports for validation
- `rsbuild.config.ts`: Dual-environment build configuration
- `package.json`: Complex dev script with concurrent backend/frontend

### Common Tasks

**Adding new entity:**
1. Create migration in `migrations/`
2. Run `bun run generate-types` to update Kysely types
3. Add Zod schema in `src/db/schemas/{domain}/`
4. Create resolver class with Node pattern in `src/resolvers/{domain}/`
5. Export from domain index file

**Working with forms:**
Use react-hook-form with Zod resolvers. Schemas are already defined in `db/schemas/` for consistency between API and forms.

**Navigation:**
Use TanStack Router's file-based routing. Route files in `src/routes/` automatically generate navigation types.
