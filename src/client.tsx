import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";

import { routeTree } from "./routeTree.gen";
import { Toaster } from "./components/ui/sonner";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="lms-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </React.StrictMode>,
  );
}
