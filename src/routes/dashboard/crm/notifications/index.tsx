import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/crm/notifications/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/crm/notifications/"!</div>;
}
