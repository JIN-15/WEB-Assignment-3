
import React, { useState, useEffect } from 'react';
import { MainNav } from "@/components/main-nav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getBooks, addBook } from "@/lib/data-utils";
import { useNavigate } from 'react-router-dom';

const Books = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');

  const [newBook, setNewBook] = useState({ title: '', author: '', year: new Date().getFullYear() });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();
  const navigate = useNavigate();

  // Load books from JSON file
  useEffect(() => {
    try {
      const loadedBooks = getBooks();
      setBooks(loadedBooks);
    } catch (error) {
      console.error("Error loading books:", error);
      toast({
        title: "Error",
        description: "Failed to load books data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Check if user is authenticated
  useEffect(() => {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
    }
  }, [navigate]);

  // Sort and filter books
  const filteredBooks = books.filter(book => {
    const searchLower = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower) ||
      book.year.toString().includes(searchLower)
    );
  }).sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'author') return a.author.localeCompare(b.author);
    if (sortBy === 'year') return a.year - b.year;
    return 0;
  });

  const handleAddBook = () => {
    if (!newBook.title || !newBook.author) {
      toast({
        title: "Error",
        description: "Title and author are required",
        variant: "destructive",
      });
      return;
    }

    try {
      const bookToAdd = {
        id: Date.now(), // ✅ Add unique ID here
        title: newBook.title,
        author: newBook.author,
        year: Number(newBook.year),
      };

      const addedBook = addBook(bookToAdd);
      setBooks([...books, addedBook]);

      setNewBook({ title: '', author: '', year: new Date().getFullYear() });
      setDialogOpen(false);

      toast({
        title: "Success",
        description: "Book added successfully",
      });
    } catch (error) {
      console.error("Error adding book:", error);
      toast({
        title: "Error",
        description: "Failed to add book",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-gray-900">
      <MainNav />

      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Books</h2>
          <p className="text-muted-foreground">
            Manage and browse your book collection.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
            <div className="relative w-full sm:max-w-sm">
              <Input
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="author">Author</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add New Book</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Book</DialogTitle>
                <DialogDescription>
                  Enter the details for the new book you want to add.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    placeholder="Enter book title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    placeholder="Enter author name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Publication Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={newBook.year}
                    onChange={(e) => setNewBook({ ...newBook, year: parseInt(e.target.value) })}
                    min="1000"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddBook}>Add Book</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditMode ? "Edit Book" : "Book Details"}
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={selectedBook?.title || ""}
                    onChange={(e) =>
                      setSelectedBook({ ...selectedBook, title: e.target.value })
                    }
                    readOnly={!isEditMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={selectedBook?.author || ""}
                    onChange={(e) =>
                      setSelectedBook({ ...selectedBook, author: e.target.value })
                    }
                    readOnly={!isEditMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Publication Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={selectedBook?.year || ""}
                    onChange={(e) =>
                      setSelectedBook({
                        ...selectedBook,
                        year: parseInt(e.target.value),
                      })
                    }
                    readOnly={!isEditMode}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>
                  Close
                </Button>
                {isEditMode && (
                  <Button
                    onClick={() => {
                      const updatedBooks = books.map((b) =>
                        b.id === selectedBook.id ? selectedBook : b
                      );
                      setBooks(updatedBooks);
                      setDetailsDialogOpen(false);
                      toast({
                        title: "Updated",
                        description: "Book updated successfully",
                      });
                    }}
                  >
                    Save Changes
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle>{book.title}</CardTitle>
                  <CardDescription>By {book.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Published in {book.year}
                  </p>
                </CardContent>
                <CardFooter className="bg-muted/50 py-2 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedBook(book);
                      setIsEditMode(false);
                      setDetailsDialogOpen(true);
                    }}
                  >
                    View Details
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedBook(book);
                      setIsEditMode(true);
                      setDetailsDialogOpen(true);
                    }}
                  >
                    Edit
                  </Button>

                </CardFooter>
              </Card>
            ))}

            {filteredBooks.length === 0 && !loading && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No books found matching your search.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
