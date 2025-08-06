import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/crm/invoices/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/crm/invoices/"!</div>;
}
