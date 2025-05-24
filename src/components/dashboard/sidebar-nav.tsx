"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UserCircle, Edit3, Mail, LogOut, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"; // Assuming these are styled menu components from shadcn/ui or custom
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  // subItems?: NavItem[]; // For nested menus if needed in future
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Profile", icon: UserCircle },
  { href: "/dashboard/patient-entry", label: "Patient Data Entry", icon: Edit3 },
  { href: "/dashboard/email", label: "Email Center", icon: Mail },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <nav className="flex flex-col h-full">
      <SidebarMenu className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} passHref legacyBehavior>
              <SidebarMenuButton
                isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                className={cn(
                  "w-full justify-start text-base",
                  (pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href)))
                    ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
                tooltip={{ children: item.label, side: 'right', align: 'center' }}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <div className="p-4 mt-auto border-t border-sidebar-border">
         <SidebarMenuButton
            onClick={logout}
            className="w-full justify-start text-base hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            tooltip={{ children: "Logout", side: 'right', align: 'center' }}
          >
            <LogOut className="mr-3 h-5 w-5" />
             <span className="group-data-[collapsible=icon]:hidden">Logout</span>
          </SidebarMenuButton>
      </div>
    </nav>
  );
}
