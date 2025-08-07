import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { format } from "date-fns";
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
import type { CrmNotificationNode } from "@/gqty/schema.generated";

const columns: ColumnDef<CrmNotificationNode>[] = [
  {
    accessorKey: "notificationType",
    header: ({ column }) => <TableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => (
      <Badge variant={"outline"}>{row.getValue("notificationType")}</Badge>
    ),
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
  // {
  //   accessorKey: "shipment",
  //   header: ({ column }) => (
  //     <TableColumnHeader column={column} title="Shipment" />
  //   ),
  //   cell: ({ row }) => (
  //     row.original.shipment
  //       ? (
  //         <Badge asChild variant={"secondary"}>
  //           <Link to="/dashboard/lms/shipments" search={{ page: 1, limit: 10 }}>
  //             <ExternalLink />
  //             {row.original.shipment?.trackingNumber || "Shipment"}
  //           </Link>
  //         </Badge>
  //       )
  //       : "N/A"
  //   ),
  // },
  {
    accessorKey: "channel",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Channel" />
    ),
    cell: ({ row }) => (
      <Badge variant={"outline"}>{row.getValue("channel")}</Badge>
    ),
  },
  {
    accessorKey: "recipient",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Recipient" />
    ),
    cell: ({ row }) => <>{row.getValue("recipient")}</>,
  },
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Subject" />
    ),
    cell: ({ row }) => <>{row.getValue("subject")}</>,
  },
  {
    accessorKey: "message",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Message" />
    ),
    cell: ({ row }) => (
      <div className="max-w-xs truncate">{row.getValue("message")}</div>
    ),
  },
  {
    accessorKey: "deliveryStatus",
    header: ({ column }) => (
      <TableColumnHeader
        column={column}
        title="Status"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={"outline"}>{row.getValue("deliveryStatus")}</Badge>
    ),
  },
  {
    accessorKey: "sentAt",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Sent At" />
    ),
    cell: ({ row }) => (
      <Badge variant={"outline"}>
        {row.original.sentAt
          ? format(new Date(row.original.sentAt), "PPp")
          : "Not sent"}
      </Badge>
    ),
  },
];

export const Route = createFileRoute("/dashboard/crm/notifications/")({
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

  const data = query.crm.notifications.list({
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
