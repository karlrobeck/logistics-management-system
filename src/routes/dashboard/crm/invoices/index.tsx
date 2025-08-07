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
import type { CrmInvoiceNode } from "@/gqty/schema.generated";
import { Badge } from "@/components/ui/badge";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const columns: ColumnDef<CrmInvoiceNode>[] = [
  {
    accessorKey: "invoiceNumber",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Invoice #" />
    ),
    cell: ({ row }) => <>{row.getValue("invoiceNumber")}</>,
  },
  {
    accessorKey: "contact",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Contact" />
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
    accessorKey: "company",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Company" />
    ),
    cell: ({ row }) => (
      row.original.company
        ? (
          <Badge asChild variant={"secondary"}>
            <Link to="/dashboard/crm/companies" search={{ page: 1, limit: 10 }}>
              <ExternalLink />
              {row.original.company?.name}
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
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <TableColumnHeader
        column={column}
        title="Total Amount"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={"outline"}>
        {row.original.currency} {Number(row.getValue("totalAmount")).toFixed(2)}
      </Badge>
    ),
  },
  {
    accessorKey: "subtotal",
    header: ({ column }) => (
      <TableColumnHeader
        column={column}
        title="Subtotal"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={"outline"}>
        {row.original.currency} {Number(row.getValue("subtotal")).toFixed(2)}
      </Badge>
    ),
  },
  {
    accessorKey: "taxAmount",
    header: ({ column }) => (
      <TableColumnHeader
        column={column}
        title="Tax Amount"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={"outline"}>
        {row.original.currency} {Number(row.getValue("taxAmount")).toFixed(2)}
      </Badge>
    ),
  },
  {
    accessorKey: "invoiceDate",
    header: ({ column }) => (
      <TableColumnHeader
        column={column}
        title="Invoice Date"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={"outline"}>
        {row.original.invoiceDate
          ? format(new Date(row.original.invoiceDate), "P")
          : "N/A"}
      </Badge>
    ),
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <TableColumnHeader
        column={column}
        title="Due Date"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={"outline"}>
        {row.original.dueDate
          ? format(new Date(row.original.dueDate), "P")
          : "N/A"}
      </Badge>
    ),
  },
];

export const Route = createFileRoute("/dashboard/crm/invoices/")({
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

  const data = query.crm.invoices.list({
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
