# 📚 Book Management Web App - Assignment-3

Live preview : [Demo](https://web-assignment-3-wine.vercel.app/)
---
A simple React-based Book Management application that allows users to:

- Sign up and log in
- View a list of books
- Add, edit, and delete books
- View book details in a modal
- Manage user sessions using `sessionStorage`

---

## 🚀 Features

- **Authentication**
  - User sign-up and login with email/password
  - Session management with `sessionStorage`

- **Book Management**
  - Add new books with title, author, genre, and description
  - Edit and delete existing books
  - View book details in a modal popup

- **User Management**
  - Stores user data locally in `sessionStorage` as a JSON array
  - Auto-increments user ID on registration

- **Frontend**
  - Built with **React** and **Tailwind CSS**
  - Fully responsive design

---

## 🛠️ Technologies Used

- **React**
- **Tailwind CSS**
- **JavaScript**
- **sessionStorage** for temporary data storage

---

## 📦 Folder Structure

```

book-management-app/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── BookList.jsx
│   │   ├── BookForm.jsx
│   │   ├── BookModal.jsx
│   │   └── LoginSignupForm.jsx
│   │
│   ├── data/
│   │   └── usersData.json (or dynamically initialized in sessionStorage)
│   │
│   ├── utils/
│   │   └── userStorage.js
│   │
│   ├── App.jsx
│   └── index.js
│
├── package.json
└── README.md

````

---

## 🔧 How to Run Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/JIN-15/WEB-Assignment-3
   cd book-management-app
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

   App will be live at `http://localhost:3000`

---

## 🧪 Sample Login

You can use one of these sample users to log in:

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

Or create your own user via the Sign-Up form.

---

## 📁 Data Storage

* **Users**: Stored in `sessionStorage` under the key `usersData`
* **Logged-in User**: Stored in `sessionStorage` under the key `loggedInUser`

To reset all user data, you can clear browser storage via developer tools.

---


## ✨ Future Improvements

* Connect to a backend API and persist data
* Add validation and hashed passwords
* Implement pagination and search for books
* Deploy to Netlify/Vercel

---

## 👨‍💻 Author

Developed by [Ali Hassan](https://github.com/JIN-15) — feel free to reach out!
