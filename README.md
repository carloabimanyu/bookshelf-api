# 📚 Bookshelf API

A simple Bookshelf REST API built with **Hapi.js** as part of the final project for the *Belajar Back-End Pemula dengan JavaScript* course at Dicoding.

This API allows clients to **create, read, update, and delete (CRUD)** book records using an in-memory data store.

---

## 📁 Project Structure

```
/src
  server.js        # Hapi server setup
  routes.js        # Route definitions
  handler.js       # Route handlers (business logic)
  books.js         # Temporary in-memory book list

eslint.config.mjs
package.json
package-lock.json
.gitignore
```

---

## 🚀 Features

* Add a new book
* Retrieve all books (with filters)
* Retrieve a book by ID
* Edit book data
* Delete a book by ID
* Input validation (e.g., name must not be empty, readPage <= pageCount)
* Organized project structure with ESLint formatting

---

## 📦 Installation

```bash
git clone https://github.com/carloabimanyu/bookshelf-api.git
cd bookshelf-api
npm install
```

---

## 🏃 Running the Server

### Start normally

```bash
npm start
```

### Start in development with auto-reload (nodemon)

```bash
npm run start:dev
```

The server runs on:

```
http://localhost:9000
```

---

## 🧹 Linting

Run ESLint to check for issues:

```bash
npm run lint
```

ESLint configuration: **eslint-config-dicodingacademy**

To automatically fix common issues:

```bash
npx eslint ./src --fix
```

---

## 📘 API Documentation

### Base URL

```
http://localhost:9000
```

---

## 📗 1. Add a Book

### **POST /books**

### Request Body (JSON)

```json
{
  "name": "Book Name",
  "year": 2021,
  "author": "Author Name",
  "summary": "Short summary",
  "publisher": "Publisher Name",
  "pageCount": 200,
  "readPage": 120,
  "reading": true
}
```

### Success Response — 201

```json
{
  "status": "success",
  "message": "Buku berhasil ditambahkan",
  "data": {
    "bookId": "xxxxxxxxxxxxxx"
  }
}
```

### Error Response — 400 (missing name)

```json
{
  "status": "fail",
  "message": "Gagal menambahkan buku. Mohon isi nama buku"
}
```

### Error Response — 400 (invalid readPage)

```json
{
  "status": "fail",
  "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
}
```

### Error Response — 500

```json
{
  "status": "fail",
  "message": "Gagal menambahkan buku"
}
```

---

## 📘 2. Get All Books

### **GET /books**

### Optional Query Parameters

| Param      | Type   | Description                                 |
| ---------- | ------ | ------------------------------------------- |
| `name`     | string | Filter by name (contains, case-insensitive) |
| `reading`  | 0/1    | Filter by reading status                    |
| `finished` | 0/1    | Filter by finished status                   |

### Success Response — 200

```json
{
  "status": "success",
  "data": {
    "books": [
      {
        "id": "xxxxxxxxxxxxxx",
        "name": "Book Name",
        "publisher": "Publisher Name"
      }
    ]
  }
}
```

---

## 📙 3. Get Book by ID

### **GET /books/{id}**

### Success Response — 200

```json
{
  "status": "success",
  "data": {
    "book": {
      "id": "xxx",
      "name": "Book Name",
      "year": 2021,
      "author": "Author Name",
      "summary": "Summary",
      "publisher": "Publisher Name",
      "pageCount": 200,
      "readPage": 120,
      "finished": false,
      "reading": true,
      "insertedAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  }
}
```

### Error Response — 404

```json
{
  "status": "fail",
  "message": "Buku tidak ditemukan"
}
```

---

## 📕 4. Edit Book by ID

### **PUT /books/{id}**

### Request Body — Same as POST /books

### Success Response — 200

```json
{
  "status": "success",
  "message": "Buku berhasil diperbarui"
}
```

### Error Response — 400 (missing name)

```json
{
  "status": "fail",
  "message": "Gagal memperbarui buku. Mohon isi nama buku"
}
```

### Error Response — 400 (invalid readPage)

```json
{
  "status": "fail",
  "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
}
```

### Error Response — 404 (ID not found)

```json
{
  "status": "fail",
  "message": "Gagal memperbarui buku. Id tidak ditemukan"
}
```

---

## 📒 5. Delete Book by ID

### **DELETE /books/{id}**

### Success Response — 200

```json
{
  "status": "success",
  "message": "Buku berhasil dihapus"
}
```

### Error Response — 404

```json
{
  "status": "fail",
  "message": "Buku gagal dihapus. Id tidak ditemukan"
}
```

---

## 📝 License

This project is licensed under the **MIT License**.

---

If you need improvements (badges, examples, curl commands, diagrams, etc.), tell me! 🚀
