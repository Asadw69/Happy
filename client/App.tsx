import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Gender from "./pages/Gender";
import DateOfBirth from "./pages/DateOfBirth";
import Interest from "./pages/Interest";
import Verification from "./pages/Verification";
import Homee from "./pages/Homee";
import Add from "./pages/Add";
import Messages from "./pages/Messages";
import Notification from "./pages/Notification";
import Prof from "./pages/Prof";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/gender" element={<Gender />} />
            <Route path="/date-of-birth" element={<DateOfBirth />} />
            <Route path="/interest" element={<Interest />} />
            <Route path="/Verification" element={<Verification />} />
            <Route path="/homee" element={<Homee />} />
            <Route path="/add" element={<Add />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/profile" element={<Prof />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}