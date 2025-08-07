import { createFileRoute, Link } from "@tanstack/react-router";
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
import type { CrmCaseNode } from "@/gqty/schema.generated";
import { Badge } from "@/components/ui/badge";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const columns: ColumnDef<CrmCaseNode>[] = [
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Subject" />
    ),
    cell: ({ row }) => <>{row.getValue("subject")}</>,
  },
  {
    accessorKey: "contact",
    header: ({ column }) => (
      <TableColumnHeader
        column={column}
        title="Contact"
      />
    ),
    cell: ({ row }) => (
      row.original.contact
        ? (
          <Badge asChild variant={"secondary"}>
            <Link to="/dashboard/crm/contacts" search={{ page: 1, limit: 10 }}>
              <ExternalLink />
              {row.original.contact?.firstName} {row.original.contact?.lastName}
            </Link>
          </Badge>
        )
        : "N/A"
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <TableColumnHeader
        column={column}
        title="Status"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={"outline"}>{row.getValue("status")}</Badge>
    ),
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <TableColumnHeader
        column={column}
        title="Priority"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={"outline"}>{row.getValue("priority")}</Badge>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="max-w-xs truncate">
        {row.getValue("description") || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "closedAt",
    header: ({ column }) => (
      <TableColumnHeader
        column={column}
        title="Closed At"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={"outline"}>
        {row.original.closedAt
          ? format(new Date(row.original.closedAt), "P")
          : "Open"}
      </Badge>
    ),
  },
];

export const Route = createFileRoute("/dashboard/crm/cases/")({
  component: RouteComponent,
  validateSearch: zodValidator(z.object({
    page: z.number().nonnegative().min(1).catch(1),
    limit: z.number().nonnegative().min(10).catch(10),
  })),
});

function RouteComponent() {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const query = useQuery();

  const data = query.crm.cases.list({
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
        <TableProvider
          columns={columns}
          data={data}
        >
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
