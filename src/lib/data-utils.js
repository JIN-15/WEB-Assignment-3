
// Mock data for client-side usage
import usersData from '../../data/users.json';

// Function to read users from local data
export function getUsers() {
  try {
    // First check if we have users in sessionStorage
    const storedUsers = sessionStorage.getItem('usersData');
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
    
    // Initialize with our default data and store in session
    sessionStorage.setItem('usersData', JSON.stringify(usersData));
    return usersData;
  } catch (error) {
    console.error("Error getting users data:", error);
    return [];
  }
}

// Function to read books from local data
export function getBooks() {
  try {
    const books = sessionStorage.getItem('booksData');
    return JSON.parse(books || '[]');
  } catch (error) {
    console.error("Error getting books data:", error);
    return [];
  }
}

// Function to add a user to the users data
export function addUser(userData) {
  try {
    const users = getUsers();
    const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
    const newUser = {
      ...userData,
      id: newId
    };
    
    users.push(newUser);
    sessionStorage.setItem('usersData', JSON.stringify(users));
    return newUser;
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("Failed to add user");
  }
}

// Function to add a book to the books data
export function addBook(bookData) {
  try {
    const books = getBooks();
    const newId = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
    const newBook = {
      ...bookData,
      id: newId
    };
    
    books.push(newBook);
    sessionStorage.setItem('booksData', JSON.stringify(books));
    return newBook;
  } catch (error) {
    console.error("Error adding book:", error);
    throw new Error("Failed to add book");
  }
}

// Function to find user by email and password
export function findUser(email, password) {
  try {
    const users = getUsers();
    return users.find(user => user.email === email && user.password === password) || null;
  } catch (error) {
    console.error("Error finding user:", error);
    return null;
  }
}

// Function to find user by email
export function findUserByEmail(email) {
  try {
    const users = getUsers();
    return users.find(user => user.email === email) || null;
  } catch (error) {
    console.error("Error finding user by email:", error);
    return null;
  }
}
