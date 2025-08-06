import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Archive,
  BadgeDollarSign,
  BriefcaseBusiness,
  Building2,
  Car,
  ChartBar,
  ChevronRight,
  ClipboardCheck,
  Coins,
  Database,
  Factory,
  Hand,
  Handshake,
  Layers,
  MapPin,
  Package,
  Package2,
  PieChart,
  Presentation,
  ReceiptText,
  Route,
  Shield,
  ShoppingCart,
  Signature,
  Spotlight,
  SquareChartGantt,
  Truck,
  TruckIcon,
  UserPen,
  Users,
  Warehouse,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import type {
  RegisteredRouter,
  ValidateLinkOptions,
} from "@tanstack/react-router";

export type Navigation = {
  modules: {
    name: string;
    description: string;
    logo: React.ElementType;
    link: string;
    navigation: {
      name: string;
      icon: React.ElementType;
      link?: string;
      children?: {
        name: string;
        icon: React.ElementType;
        link: string;
      }[];
    }[];
  }[];
};

const NAVIGATION: Navigation = {
  modules: [
    {
      name: "Customer Relation Management",
      description: "Manage customers, leads, and sales",
      logo: UserPen,
      link: "/dashboard/crm",
      navigation: [
        {
          name: "Campaigns",
          icon: Presentation,
          link: "/dashboard/crm/campaigns",
        },
        {
          name: "Cases",
          icon: BriefcaseBusiness,
          link: "/dashboard/crm/cases",
        },
        {
          name: "Companies",
          icon: Building2,
          link: "/dashboard/crm/companies",
        },
        {
          name: "Contacts",
          icon: Handshake,
          link: "/dashboard/crm/contacts",
        },
        {
          name: "Interactions",
          icon: Signature,
          link: "/dashboard/crm/interactions",
        },
        {
          name: "Invoices",
          icon: ReceiptText,
          children: [
            {
              name: "Invoices",
              icon: ReceiptText,
              link: "/dashboard/crm/invoices",
            },
            {
              name: "Invoice Line Items",
              icon: ClipboardCheck,
              link: "/dashboard/crm/invoice-line-items",
            },
          ],
        },
        {
          name: "Leads",
          icon: Spotlight,
          link: "/dashboard/crm/leads",
        },
        {
          name: "Notifications",
          icon: ChartBar,
          link: "/dashboard/crm/notifications",
        },
        {
          name: "Opportunities",
          icon: Hand,
          children: [
            {
              name: "Opportunities",
              icon: Hand,
              link: "/dashboard/crm/opportunities",
            },
            {
              name: "Opportunity Products",
              icon: ShoppingCart,
              link: "/dashboard/crm/opportunity-products",
            },
          ],
        },
        {
          name: "Products",
          icon: SquareChartGantt,
          link: "/dashboard/crm/products",
        },
        {
          name: "Campaign Contacts",
          icon: Users,
          link: "/dashboard/crm/campaign-contacts",
        },
      ],
    },
    {
      name: "Logistics Management System",
      description: "Manage shipments, routes, and warehouses",
      logo: TruckIcon,
      link: "/dashboard/lms",
      navigation: [
        {
          name: "Core Operations",
          icon: Package,
          children: [
            {
              name: "Addresses",
              icon: MapPin,
              link: "/dashboard/lms/addresses",
            },
            {
              name: "Shipments",
              icon: Package,
              link: "/dashboard/lms/shipments",
            },
            {
              name: "Packages",
              icon: Package2,
              link: "/dashboard/lms/packages",
            },
            {
              name: "Tracking Events",
              icon: Route,
              link: "/dashboard/lms/tracking-events",
            },
          ],
        },
        {
          name: "Routes & Transport",
          icon: Route,
          children: [
            {
              name: "Routes",
              icon: Route,
              link: "/dashboard/lms/routes",
            },
            {
              name: "Route Shipments",
              icon: Truck,
              link: "/dashboard/lms/route-shipments",
            },
            {
              name: "Transport Legs",
              icon: Route,
              link: "/dashboard/lms/transport-legs",
            },
            {
              name: "Transportation Providers",
              icon: Car,
              link: "/dashboard/lms/transportation-providers",
            },
          ],
        },
        {
          name: "Warehouses",
          icon: Warehouse,
          children: [
            {
              name: "Warehouses",
              icon: Warehouse,
              link: "/dashboard/lms/warehouses",
            },
            {
              name: "Warehouse Inventories",
              icon: Archive,
              link: "/dashboard/lms/warehouse-inventories",
            },
          ],
        },
        {
          name: "Shipping Services",
          icon: Factory,
          children: [
            {
              name: "Shipping Services",
              icon: Factory,
              link: "/dashboard/lms/shipping-services",
            },
            {
              name: "Service Max Dimensions",
              icon: Layers,
              link: "/dashboard/lms/shipping-service-max-dimensions",
            },
          ],
        },
        {
          name: "Pricing",
          icon: Coins,
          children: [
            {
              name: "Pricing Rates",
              icon: Coins,
              link: "/dashboard/lms/pricing-rates",
            },
            {
              name: "Pricing Zones",
              icon: PieChart,
              link: "/dashboard/lms/pricing-zones",
            },
            {
              name: "Zone Countries",
              icon: MapPin,
              link: "/dashboard/lms/pricing-zone-countries",
            },
          ],
        },
        {
          name: "Provider Management",
          icon: BadgeDollarSign,
          children: [
            {
              name: "Provider Invoices",
              icon: ReceiptText,
              link: "/dashboard/lms/provider-invoices",
            },
            {
              name: "Invoice Line Items",
              icon: ClipboardCheck,
              link: "/dashboard/lms/provider-invoice-line-items",
            },
            {
              name: "Provider Performance",
              icon: ChartBar,
              link: "/dashboard/lms/provider-performance",
            },
            {
              name: "Provider Rates",
              icon: BadgeDollarSign,
              link: "/dashboard/lms/provider-rates",
            },
            {
              name: "Provider Services",
              icon: Factory,
              link: "/dashboard/lms/provider-services",
            },
            {
              name: "Service Destinations",
              icon: MapPin,
              link: "/dashboard/lms/provider-service-destination-countries",
            },
            {
              name: "Service Max Dimensions",
              icon: Layers,
              link: "/dashboard/lms/provider-service-max-dimensions",
            },
            {
              name: "Service Origins",
              icon: MapPin,
              link: "/dashboard/lms/provider-service-origin-countries",
            },
          ],
        },
      ],
    },
    {
      name: "Organization Management",
      description: "Manage departments, users, and permissions",
      logo: Building2,
      link: "/dashboard/org",
      navigation: [
        {
          name: "Departments",
          icon: Building2,
          children: [
            {
              name: "Departments",
              icon: Building2,
              link: "/dashboard/org/departments",
            },
            {
              name: "Department Permissions",
              icon: Shield,
              link: "/dashboard/org/department-permissions",
            },
            {
              name: "Transport Modes",
              icon: Car,
              link: "/dashboard/org/department-transport-modes",
            },
            {
              name: "Department Users",
              icon: Users,
              link: "/dashboard/org/department-users",
            },
            {
              name: "User Permissions",
              icon: Users,
              link: "/dashboard/org/department-user-permissions",
            },
          ],
        },
        {
          name: "Fleet Management",
          icon: Truck,
          children: [
            {
              name: "Drivers",
              icon: Car,
              link: "/dashboard/org/drivers",
            },
            {
              name: "Vehicles",
              icon: Truck,
              link: "/dashboard/org/vehicles",
            },
          ],
        },
      ],
    },
  ],
};

const ModuleSwitcher = (
  { modules }: Navigation,
) => {
  const { isMobile } = useSidebar();
  const location = useLocation();

  // Determine the current module based on the route
  const getCurrentModule = () => {
    const pathSegments = location.pathname.split("/");
    if (pathSegments.length >= 3 && pathSegments[1] === "dashboard") {
      const moduleKey = pathSegments[2]; // crm, lms, or org
      return modules.find((module) =>
        module.link.includes(`/dashboard/${moduleKey}`)
      );
    }
    // Default to first module (CRM) if no match
    return modules[0];
  };

  const activeModule = getCurrentModule() || modules[0];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <activeModule.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeModule.name}
                </span>
                <span className="truncate text-xs">
                  {activeModule.description}
                </span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Modules
            </DropdownMenuLabel>
            {modules.map((module, index) => (
              <DropdownMenuItem key={module.name} asChild>
                <Link
                  to={module.link}
                  className="gap-2 p-2 flex items-center cursor-pointer"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <module.logo className="size-3.5 shrink-0" />
                  </div>
                  {module.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const location = useLocation();

  // Determine the current module based on the route
  const getCurrentModule = () => {
    const pathSegments = location.pathname.split("/");
    if (pathSegments.length >= 3 && pathSegments[1] === "dashboard") {
      const moduleKey = pathSegments[2]; // crm, lms, or org
      return NAVIGATION.modules.find((module) =>
        module.link.includes(`/dashboard/${moduleKey}`)
      );
    }
    // Default to first module (CRM) if no match
    return NAVIGATION.modules[0];
  };

  const currentModule = getCurrentModule();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ModuleSwitcher modules={NAVIGATION.modules} />
      </SidebarHeader>
      <SidebarContent>
        {currentModule && (
          <SidebarGroup>
            <SidebarGroupLabel>{currentModule.name}</SidebarGroupLabel>
            <SidebarMenu>
              {currentModule.navigation.map((nav) => {
                // If the nav item has children, render as collapsible
                if (nav.children) {
                  return (
                    <Collapsible
                      key={nav.name}
                      asChild
                      defaultOpen={false}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={nav.name}>
                            {nav.icon && <nav.icon />}
                            <span>{nav.name}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {nav.children.map((child) => (
                              <SidebarMenuSubItem key={child.link}>
                                <SidebarMenuSubButton asChild>
                                  <Link
                                    to={child.link}
                                    className="flex items-center"
                                  >
                                    {child.icon && <child.icon />}
                                    <span>{child.name}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                // If the nav item has a direct link, render as regular menu item
                if (nav.link) {
                  return (
                    <SidebarMenuItem key={nav.link}>
                      <SidebarMenuButton tooltip={nav.name} asChild>
                        <Link to={nav.link} className="flex items-center">
                          {nav.icon && <nav.icon />}
                          <span>{nav.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                return null;
              })}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
