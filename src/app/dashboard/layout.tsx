"use client";
import type { ReactNode } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Hospital, PanelLeft } from 'lucide-react';
import Link from 'next/link';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarNav } from '@/components/dashboard/sidebar-nav';
import { UserNav } from '@/components/dashboard/user-nav';
import { Button } from '@/components/ui/button';


function DashboardHeader() {
  const { employeeDetails } = useAuth();
  const { isMobile } = useSidebar(); // Access sidebar context

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4">
      {isMobile && (
          <SidebarTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SidebarTrigger>
        )}
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-foreground">
          Welcome, {employeeDetails?.name?.split(' ')[0] || 'Employee'}!
        </h1>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <UserNav />
      </div>
    </header>
  );
}


export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
           <div className="animate-pulse rounded-full bg-primary/50 h-12 w-12"></div>
        </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border shadow-lg">
        <SidebarHeader className="p-4 border-b border-sidebar-border">
          <Link href="/dashboard" className="flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-primary transition-colors group-data-[collapsible=icon]:justify-center">
            <Hospital className="h-8 w-8 text-sidebar-primary" />
            <span className="text-2xl font-bold group-data-[collapsible=icon]:hidden">MediCentral</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        {/* <SidebarFooter className="p-2 border-t border-sidebar-border group-data-[collapsible=icon]:hidden">
          <p className="text-xs text-sidebar-foreground/70 text-center">&copy; {new Date().getFullYear()} MediCentral</p>
        </SidebarFooter> */}
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6 bg-background">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
