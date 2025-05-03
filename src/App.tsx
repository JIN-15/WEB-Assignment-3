
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeProvider } from "./components/theme-provider";
import { useEffect } from "react";

// Import data
import usersData from "../data/users.json";
import booksData from "../data/books.json";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize data in session storage if not present
    if (!sessionStorage.getItem('usersData')) {
      console.log("Initializing users data in session storage");
      sessionStorage.setItem('usersData', JSON.stringify(usersData));
    }
    
    if (!sessionStorage.getItem('booksData')) {
      console.log("Initializing books data in session storage");
      sessionStorage.setItem('booksData', JSON.stringify(booksData));
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/books" element={<Books />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
