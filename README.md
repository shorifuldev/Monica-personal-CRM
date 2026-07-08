# Monica Personal CRM API

A simple RESTful Contact Management API built with **Node.js**, **Express.js**, and **Microsoft SQL Server**. This project allows users to manage their contacts by searching, filtering, marking favorites, adding personal notes, and viewing contact statistics.

---

## 🚀 Features

- View all contacts
- View a single contact
- Search contacts by first or last name
- Pagination support
- Sorting (First Name, Last Name, Created Date)
- Mark/Unmark favorite contacts
- Toggle favorite status
- Update personal notes
- Contact statistics
- Secure parameterized SQL queries
- Environment variable configuration

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- Microsoft SQL Server
- mssql
- dotenv

---

## 📁 Project Structure

```
├── config/
│   └── database.js
├── controllers/
│   └── contactController.js
├── models/
│   └── contactModel.js
├── routes/
│   └── contactRoutes.js
├── server.js
├── package.json
└── .env.example
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/Monica-personal-CRM.git
```

### Go to the project folder

```bash
cd Monica-personal-CRM
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file

```env
PORT=3000

DB_SERVER=YOUR_SERVER
DB_PORT=1433
DB_NAME=YOUR_DATABASE
DB_USER=YOUR_USERNAME
DB_PASSWORD=YOUR_PASSWORD
```

### Run the project

```bash
npm start
```

---

## 📌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contacts` | Get all contacts |
| GET | `/api/contacts/:id` | Get a single contact |
| GET | `/api/contacts/favorites` | Get favorite contacts |
| GET | `/api/contacts/stats` | Get contact statistics |
| POST | `/api/contacts/:id/favorite` | Mark as favorite |
| DELETE | `/api/contacts/:id/favorite` | Remove favorite |
| PATCH | `/api/contacts/:id/favorite` | Toggle favorite |
| PUT | `/api/contacts/:id/note` | Update personal note |

---

## ✨ Implemented Features

- RESTful API Design
- MVC Architecture
- MSSQL Database Connection
- Connection Pooling
- Search & Filtering
- Pagination
- Sorting
- Favorite Management
- Personal Notes
- Contact Statistics
- Error Handling
- SQL Injection Protection

---

## 📚 What I Learned

- Building REST APIs with Express.js
- Connecting Node.js with Microsoft SQL Server
- Using parameterized SQL queries
- Implementing pagination, search, and sorting
- Structuring backend projects using MVC architecture
- Managing environment variables securely

---

## 👨‍💻 Author
**Shariful Islam**
GitHub: https://github.com/shorifuldev