# 🎬 Movie Search System

A **full-stack web application** for discovering movies, managing favorites, and performing administrative tasks. Built with **Node.js**, **Express.js**, **MongoDB**, **Handlebars**, and **Tailwind CSS**, and powered by the **TMDB API**.

---

## ✨ Features

### 👤 User

- 🔍 Search movies by title.
- 📄 View movie details: genre, release date, rating, etc.
- ❤️ Add and manage favorite movies.
- 🔐 Secure signup and login system.

### 🛠️ Admin

- 🎞️ Manage movies in the database (CRUD).
- 👥 View and manage registered users.
- 📊 Access a responsive admin dashboard with analytics.

### 🌐 General

- ✅ Responsive, clean UI with Tailwind CSS.
- ⚡ Real-time movie data via TMDB API integration.

---

## 🛠️ Tech Stack

| Layer      | Tech                           |
| ---------- | ------------------------------ |
| Frontend   | HTML, Tailwind CSS, JavaScript |
| Backend    | Node.js, Express.js            |
| Database   | MongoDB + Mongoose             |
| Templating | Handlebars (hbs)               |
| API        | TMDB API                       |

---

## 🚀 Installation

### 📦 Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [TMDB API Key](https://www.themoviedb.org/)

### 📁 Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-repo/movie-search-system.git
cd movie-search-system
```
2. **Install dependencies**

```bash
npm install
```

3. **Create a .env file**

```PORT=3000
MONGO_URI=your_mongodb_connection_string
TMDB_API_KEY=your_tmdb_api_key
SESSION_SECRET=your_session_secret
```

4. **Run the application**

```bash
npm start
```

5. **Open in browser**

```bash
http://localhost:3000
```

## 📂 Project Structure

```plaintext
Movie-Search-System/
├── controllers/         # App logic (user, movie, admin)
├── helpers/             # API and DB utilities
├── models/              # MongoDB schemas
├── public/              # Static assets (CSS, JS, images)
│   ├── javascripts/
│   ├── stylesheets/
│   └── images/
├── routes/              # Express routes
├── views/               # Handlebars templates
│   ├── layouts/
│   ├── admin/
│   └── user/
├── .env                 # Environment variables
├── app.js               # Application entry point
└── package.json         # Project metadata
```

## 📡 API Endpoints

### 👤 User Routes

- GET /auth/login — Render login page

- POST /auth/signup — Handle signup

- GET /movies — Movie search

- POST /user/add-to-favourites — Add to favorites

### 🔧 Admin Routes

- GET /admin/dashboard — View admin dashboard

- GET /admin/movies — Manage movie records

- GET /admin/user-management — Manage users

## ⚙️ How It Works

1. Users search for movies via the TMDB API.

2. Authenticated users can favorite movies.

3. Admins manage movies and users from a dedicated dashboard.

4. All user and movie data is stored securely in MongoDB.

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for more info.
