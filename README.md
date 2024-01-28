# Library Management System API

## Overview

This project implements a robust Library Management System API using Node.js, Express, and MongoDB. The API offers functionalities to manage admins, books, customers, genres, issued books, and returned books. It utilizes JSON Web Tokens (JWT) for authentication and authorization.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aliasar1/Library-Management-Api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd library-management-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the root directory and define the following variables:

   ```
   MONGODB_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   ```

   Replace `<your_mongodb_uri>` with your MongoDB connection string and `<your_jwt_secret>` with a secret key for JWT authentication.

## Usage

### Running the API

Start the API server using either of the following commands:

- Development mode (with nodemon):

  ```bash
  npm run dev
  ```

- Production mode:

  ```bash
  npm start
  ```

The API will be accessible at `http://localhost:8010`.

### API Endpoints

- Admins:
  - `/admin/register` (POST): Register a new admin.
  - `/admin/login` (POST): Login as an admin.
  - `/admin/current` (GET): Get current admin details.

- Genres:
  - `/genres` (GET): Get all genres.
  - `/genres/:id` (GET): Get a specific genre by ID.
  - `/genres` (POST): Create a new genre.
  - `/genres/:id` (PUT): Update a genre.
  - `/genres/:id` (DELETE): Delete a genre.

- Books:
  - `/books` (GET): Get all books.
  - `/books/:id` (GET): Get a specific book by ID.
  - `/books` (POST): Create a new book.
  - `/books/:id` (PUT): Update a book.
  - `/books/:id` (DELETE): Delete a book.

- Customers:
  - `/customers/register` (POST): Register a new customer.
  - `/customers/login` (POST): Login as a customer.
  - `/customers/current` (GET): Get current customer details.

- Issues:
  - `/issues/issueBook` (POST): Issue a book to a customer.
  - `/issues/issuedBooks` (GET): Get all issued books.
  - `/issues/customerIssuedBooks` (GET): Get books issued to a specific customer.

- Returns:
  - `/returns/returnBook` (POST): Return a book.
  - `/returns/returnedBooks` (GET): Get all returned books.
  - `/returns/customerReturnedBooks` (GET): Get books returned by a specific customer.

### Error Handling

The API includes a centralized error handling middleware (`errorHandler`) to handle and format errors consistently.

## Dependencies

- [Express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
- [Mongoose](https://mongoosejs.com/): Elegant MongoDB object modeling for Node.js.
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken): JSON Web Token implementation.
- [bcrypt](https://www.npmjs.com/package/bcrypt): Library for hashing passwords.
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a .env file.
- [express-async-handler](https://www.npmjs.com/package/express-async-handler): Simple middleware for handling exceptions inside of async express routes.

## Contributing

Feel free to contribute by opening issues, providing feedback, or submitting pull requests.

Happy coding! 🚀
