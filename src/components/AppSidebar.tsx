import { BarChart3, TrendingUp, Settings, FileText, Upload, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Sales Analytics", url: "/", icon: TrendingUp },
  { title: "Marketing Performance", url: "/marketing", icon: BarChart3 },
  { title: "Marketing Parameters", url: "/marketing-parameters", icon: Settings },
  { title: "User Guides", url: "/user-guides", icon: FileText },
  { title: "Power BI Dashboard", url: "/powerbi", icon: Upload },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { signOut, user } = useAuth();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="px-3 py-4">
          <h2 className={`font-bold text-lg transition-opacity ${collapsed ? "opacity-0" : "opacity-100"}`}>
            SalesVision
          </h2>
          {user && !collapsed && (
            <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
          )}
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Dashboards</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive ? "bg-primary/10 text-primary font-medium" : ""
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto px-3 py-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            {!collapsed && <span>Sign Out</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
