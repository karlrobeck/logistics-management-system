import { createFileRoute, Outlet } from '@tanstack/react-router';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from './-sidebar';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="p-2.5 no-scrollbar">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
