# Movie Search System

A full-stack web application that allows users to search for movies, view details, manage favorites, and perform administrative tasks. Built using Node.js, Express, Handlebars, and MongoDB, this project integrates with the TMDB API for movie data.

## Features

- **User Features**:

  - Search for movies by title.
  - View detailed information about movies, including genre, release date, and more.
  - Add movies to favorites and manage them.
  - User authentication (signup/login).

- **Admin Features**:

  - Manage movies in the database.
  - View user details and manage user accounts.
  - Access admin dashboard with analytics.

- **General**:
  - Responsive and user-friendly interface.
  - Integration with TMDB API for real-time movie data.

## Technologies Used

- **Frontend**: HTML, CSS (Tailwind CSS), JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Templating Engine**: Handlebars (hbs)
- **API**: TMDB API

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- TMDB API Key (Sign up at [TMDB](https://www.themoviedb.org/))

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-repo/movie-search-system.git
   cd movie-search-system

   ```

2. **Install dependencies**:
   npm install

3. Set up environment variables: Create a .env file in the root directory and add the following:

PORT=3000
MONGO_URI=your_mongodb_connection_string
TMDB_API_KEY=your_tmdb_api_key
SESSION_SECRET=your_session_secret

4. Run the application:

npm run start

5. Access the application: Open your browser and go to http://localhost:3000.

Project Structure

Movie-Search-System/
│
├── controllers/ # Application logic (e.g., user, movie, admin controllers)
├── helpers/ # Helper functions for database and API interactions
├── models/ # Mongoose models (e.g., User, Movie, Favourite)
├── public/ # Static assets (CSS, JS, images)
│ ├── javascripts/ # Client-side JavaScript
│ ├── stylesheets/ # CSS files
│ └── images/ # Image assets
├── routes/ # Express routes (e.g., userRoutes, adminRoutes)
├── views/ # Handlebars templates
│ ├── layouts/ # Layout templates
│ ├── admin/ # Admin-specific views
│ └── user/ # User-specific views
├── .env # Environment variables
├── app.js # Main application entry point
└── [package.json](http://_vscodecontentref_/1) # Project metadata and dependencies

API Endpoints

User Routes

- GET /auth/login - Render login page.
- POST /auth/signup - Handle user signup.
- GET /movies - Search for movies.
- POST /user/add-to-favourites - Add a movie to favorites.

Admin Routes
- GET /admin/dashboard - View admin dashboard.
- GET /admin/movies - Manage movies.
- GET /admin/user-management - Manage users.

How It Works

1. Users can search for movies using the TMDB API.
2. Admins can manage movies and users through the admin panel.
3. The application uses MongoDB to store user data, favorite movies, and other information.

Screenshots
User Signup Page
Signup Page

Admin Dashboard
Admin Dashboard

License
This project is licensed under the MIT License. See the LICENSE file for details.