import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@/gqty';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/"</div>;
}
