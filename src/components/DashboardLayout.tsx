import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="border-b bg-card">
            <div className="flex h-16 items-center px-4 gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
          </div>
          <div className="p-6">
            {children}
          </div>
          <footer className="p-4 text-center text-sm text-muted-foreground border-t">
            Developed by pinky rawat
          </footer>
        </main>
      </div>
    </SidebarProvider>
  );
};
