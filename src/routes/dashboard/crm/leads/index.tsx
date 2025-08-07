import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import z from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHead,
  TableHeader,
  TableHeaderGroup,
  TableProvider,
  TableRow,
} from "@/components/ui/kibo-ui/table";
import { useQuery } from "@/gqty";
import type { CrmLeadNode } from "@/gqty/schema.generated";

const columns: ColumnDef<CrmLeadNode>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="First Name" />
    ),
    cell: ({ row }) => <>{row.getValue("firstName")}</>,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => <>{row.getValue("lastName")}</>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <TableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <>{row.getValue("email")}</>,
  },
  {
    accessorKey: "convertedToContact",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Converted To Contact" />
    ),
    cell: ({ row }) => (
      row.original.convertedToContact
        ? (
          <Badge asChild variant={"secondary"}>
            <Link to="/dashboard/crm/contacts" search={{ page: 1, limit: 10 }}>
              <ExternalLink />
              {row.original.convertedToContact?.firstName}{" "}
              {row.original.convertedToContact?.lastName}
            </Link>
          </Badge>
        )
        : "Not Converted"
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => <TableColumnHeader column={column} title="Phone" />,
    cell: ({ row }) => <>{row.getValue("phoneNumber") || "N/A"}</>,
  },
  {
    accessorKey: "companyName",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Company" />
    ),
    cell: ({ row }) => <>{row.getValue("companyName") || "N/A"}</>,
  },
  {
    accessorKey: "leadStatus",
    header: ({ column }) => <TableColumnHeader
      column={column}
      title="Status"
    />,
    cell: ({ row }) => (
      <Badge variant={"outline"}>{row.getValue("leadStatus")}</Badge>
    ),
  },
  {
    accessorKey: "leadScore",
    header: ({ column }) => <TableColumnHeader column={column} title="Score" />,
    cell: ({ row }) => (
      <Badge variant={"outline"}>{row.getValue("leadScore")}</Badge>
    ),
  },
  {
    accessorKey: "leadSource",
    header: ({ column }) => <TableColumnHeader
      column={column}
      title="Source"
    />,
    cell: ({ row }) => (
      <Badge variant={"outline"}>{row.getValue("leadSource") || "N/A"}</Badge>
    ),
  },
];

export const Route = createFileRoute("/dashboard/crm/leads/")({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      page: z.number().nonnegative().min(1).catch(1),
      limit: z.number().nonnegative().min(10).catch(10),
    }),
  ),
});

function RouteComponent() {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const query = useQuery();

  const data = query.crm.leads.list({
    page: searchQuery.page,
    limit: searchQuery.limit,
  });

  return (
    <article className="grid grid-cols-12">
      <section className="flex gap-2.5 justify-end col-span-full">
        <Button
          disabled={searchQuery.page === 1}
          variant={"outline"}
          onClick={() =>
            navigate({ search: (prev) => ({ ...prev, page: prev.page - 1 }) })}
        >
          <ChevronLeft />
        </Button>
        <Button
          disabled={data.length === 0}
          variant={"outline"}
          onClick={() =>
            navigate({ search: (prev) => ({ ...prev, page: prev.page + 1 }) })}
        >
          <ChevronRight />
        </Button>
      </section>
      <section className="col-span-full">
        <TableProvider columns={columns} data={data}>
          <TableHeader>
            {({ headerGroup }) => (
              <TableHeaderGroup headerGroup={headerGroup} key={headerGroup.id}>
                {({ header }) => <TableHead header={header} key={header.id} />}
              </TableHeaderGroup>
            )}
          </TableHeader>
          <TableBody>
            {({ row }) => (
              <TableRow key={row.id} row={row}>
                {({ cell }) => <TableCell cell={cell} key={cell.id} />}
              </TableRow>
            )}
          </TableBody>
        </TableProvider>
      </section>
    </article>
  );
}
