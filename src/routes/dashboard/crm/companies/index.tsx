import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
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
import type { CrmCompanyNode } from '@/gqty/schema.generated';

const columns: ColumnDef<CrmCompanyNode>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Company Name" />
    ),
    cell: ({ row }) => <>{row.getValue('name')}</>,
  },
  {
    accessorKey: 'industry',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Industry" />
    ),
    cell: ({ row }) => (
      <Badge variant={'outline'}>{row.getValue('industry') || 'N/A'}</Badge>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <TableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <>{row.getValue('email') || 'N/A'}</>,
  },

  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => <TableColumnHeader column={column} title="Phone" />,
    cell: ({ row }) => <>{row.getValue('phoneNumber') || 'N/A'}</>,
  },
  {
    accessorKey: 'website',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Website" />
    ),
    cell: ({ row }) => (
      <>
        {row.getValue('website') ? (
          <a
            href={row.getValue('website') as string}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {row.getValue('website')}
          </a>
        ) : (
          'N/A'
        )}
      </>
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="max-w-xs truncate">
        {row.getValue('description') || 'N/A'}
      </div>
    ),
  },
];

export const Route = createFileRoute('/dashboard/crm/companies/')({
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

  const data = query.crm.companies.list({
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
