import { createRootRoute, Outlet } from '@tanstack/react-router';
import * as React from 'react';
import NotFoundPage from './-404';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}
