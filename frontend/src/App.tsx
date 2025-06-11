
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DriverDashboard from "./pages/DriverDashboard";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import TripPage from "./pages/TripPage";
import ReportsPage from "./pages/ReportsPage";
import ConfigurationPage from "./pages/ConfigurationPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/conductor-dashboard" element={<DriverDashboard />} />
            <Route path="/company-dashboard" element={<SupervisorDashboard />} />
            <Route path="/trip" element={<TripPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/configuration" element={<ConfigurationPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
