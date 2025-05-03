
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MainNav } from "@/components/main-nav";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
    }
  }, [navigate]);

  // Sample data for job titles
  const jobData = [
    { name: 'Software Engineer', count: 45 },
    { name: 'Product Manager', count: 32 },
    { name: 'Data Analyst', count: 38 },
    { name: 'Designer', count: 25 },
    { name: 'Marketing', count: 20 },
  ];

  // Sample data for gender distribution
  const genderData = [
    { name: 'Male', value: 245 },
    { name: 'Female', value: 235 },
    { name: 'Non-binary', value: 20 },
  ];

  // Sample data for book publication years
  const bookYearData = [
    { year: '2015', count: 12 },
    { year: '2016', count: 15 },
    { year: '2017', count: 18 },
    { year: '2018', count: 22 },
    { year: '2019', count: 28 },
    { year: '2020', count: 35 },
    { year: '2021', count: 32 },
    { year: '2022', count: 38 },
    { year: '2023', count: 42 },
  ];

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-gray-900">
      <MainNav />
      
      <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Statistics and visualizations for users and books.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
              <CardDescription>Database statistics</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">500</div>
              <p className="text-sm text-muted-foreground mt-2">Registered users</p>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Updated just now
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Total Books</CardTitle>
              <CardDescription>Library statistics</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-5xl font-bold text-green-600 dark:text-green-400">242</div>
              <p className="text-sm text-muted-foreground mt-2">Catalogued books</p>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Updated just now
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Author</CardTitle>
              <CardDescription>Most books in collection</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-xl font-bold text-purple-600 dark:text-purple-400">J.K. Rowling</div>
              <p className="text-sm text-muted-foreground mt-2">12 books in catalog</p>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Based on current data
            </CardFooter>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Job Title Distribution</CardTitle>
              <CardDescription>Top 5 job titles among users</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jobData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" name="Number of Users" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Gender Distribution</CardTitle>
              <CardDescription>Users by gender</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Book Publication Years</CardTitle>
            <CardDescription>Number of books by publication year</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookYearData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" name="Number of Books" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
