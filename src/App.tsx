import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import SalesDashboard from "./pages/SalesDashboard";
import MarketingDashboard from "./pages/MarketingDashboard";
import CustomerRetentionDashboard from "./pages/CustomerRetentionDashboard";
import MarketingParameters from "./pages/MarketingParameters";
import UserGuides from "./pages/UserGuides";
import PowerBIDashboard from "./pages/PowerBIDashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute><DashboardLayout><SalesDashboard /></DashboardLayout></ProtectedRoute>} />
            <Route path="/marketing" element={<ProtectedRoute><DashboardLayout><MarketingDashboard /></DashboardLayout></ProtectedRoute>} />
            <Route path="/retention" element={<ProtectedRoute><DashboardLayout><CustomerRetentionDashboard /></DashboardLayout></ProtectedRoute>} />
            <Route path="/marketing-parameters" element={<ProtectedRoute><DashboardLayout><MarketingParameters /></DashboardLayout></ProtectedRoute>} />
            <Route path="/user-guides" element={<ProtectedRoute><DashboardLayout><UserGuides /></DashboardLayout></ProtectedRoute>} />
            <Route path="/powerbi" element={<ProtectedRoute><DashboardLayout><PowerBIDashboard /></DashboardLayout></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
