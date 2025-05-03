
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = () => {
    navigate('/login');
    toast({
      title: "Welcome!",
      description: "Please sign in to continue",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="py-6 px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Web Assignment 3</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleLogin}>Sign In</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white animate-fade-in">
            User & Book Management System
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive Node.js application for managing users and books with complete CRUD functionality
          </p>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Created by Ali Hassan (22F-3377)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage user records</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Access a database of 500+ users with filtering and sorting capabilities.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate('/users')} className="w-full">
                View Users
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover-scale">
            <CardHeader>
              <CardTitle>Book Management</CardTitle>
              <CardDescription>Manage your book collection</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Add, edit, and delete books with an intuitive interface.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate('/books')} className="w-full">
                View Books
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover-scale">
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>Visualize your data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Interactive charts showing user demographics and book statistics.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate('/dashboard')} className="w-full">
                View Dashboard
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="py-6 px-4 md:px-8 mt-12 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} Ali Hassan (22F-3377). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
