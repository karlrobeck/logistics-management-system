import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import z from 'zod';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
} from '@/components/ui/kibo-ui/table';
import { useQuery } from '@/gqty';
import type { CrmOpportunityNode } from '@/gqty/schema.generated';

const columns: ColumnDef<CrmOpportunityNode>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Opportunity Name" />
    ),
    cell: ({ row }) => <>{row.getValue('name')}</>,
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <Badge variant={'outline'}>
        ${Number(row.getValue('amount')).toLocaleString()}
      </Badge>
    ),
  },
  {
    accessorKey: 'stage',
    header: ({ column }) => <TableColumnHeader column={column} title="Stage" />,
    cell: ({ row }) => (
      <Badge variant={'outline'}>{row.getValue('stage')}</Badge>
    ),
  },
  {
    accessorKey: 'probability',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Probability" />
    ),
    cell: ({ row }) => (
      <Badge variant={'outline'}>{row.getValue('probability')}%</Badge>
    ),
  },
  {
    accessorKey: 'closeDate',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Close Date" />
    ),
    cell: ({ row }) => (
      <Badge variant={'outline'}>
        {row.original.closeDate
          ? format(new Date(row.original.closeDate), 'P')
          : 'N/A'}
      </Badge>
    ),
  },
];

export const Route = createFileRoute('/dashboard/crm/opportunities/')({
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

  const data = query.crm.opportunities.list({
    page: searchQuery.page,
    limit: searchQuery.limit,
  });

  return (
    <article className="grid grid-cols-12">
      <section className="flex gap-2.5 justify-end col-span-full">
        <Button
          disabled={searchQuery.page === 1}
          variant={'outline'}
          onClick={() =>
            navigate({ search: (prev) => ({ ...prev, page: prev.page - 1 }) })
          }
        >
          <ChevronLeft />
        </Button>
        <Button
          disabled={data.length === 0}
          variant={'outline'}
          onClick={() =>
            navigate({ search: (prev) => ({ ...prev, page: prev.page + 1 }) })
          }
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
