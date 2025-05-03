
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { ThemeToggle } from './theme-toggle';

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    const userStr = sessionStorage.getItem('currentUser');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);
  
  const navItems = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Users", href: "/users" },
    { title: "Books", href: "/books" }
  ];

  const handleSignOut = () => {
    sessionStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold">
            <Link to="/">
              <span className="text-blue-600 dark:text-blue-400">WEB</span> Assignment
            </Link>
          </h1>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">Ali Hassan (22F-3377)</span>
        </div>
        
        <nav className={cn("flex items-center space-x-4 lg:space-x-6 mx-6", className)}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        
        <div className="ml-auto flex items-center space-x-4">
          {currentUser && (
            <span className="text-sm font-medium">
              Welcome, {currentUser.firstName}
            </span>
          )}
          <ThemeToggle />
          <button 
            onClick={handleSignOut}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
