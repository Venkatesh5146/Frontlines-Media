# Company Explorer Backend API

Node.js + Express + MongoDB backend API for the Company Explorer application.

## Features

- RESTful API for company data
- MongoDB database with Mongoose ODM
- Full CRUD operations (Create, Read, Update, Delete)
- Search and filtering capabilities
- CORS enabled for frontend integration

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB connection string:
```
PORT=8888
MONGODB_CONNECTION=mongodb://localhost:27017/company-explorer
JWT_SECRET=your-secret-key
```

For MongoDB Atlas, use:
```
PORT=8888
MONGODB_CONNECTION=mongodb+srv://username:password@cluster.mongodb.net/database-name
JWT_SECRET=your-secret-key
```

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will run on `http://localhost:8888` by default (or the PORT specified in .env).

## Seeding the Database

To populate the database with sample companies:

```bash
npm run seed
```

## API Endpoints

### Health Check
- `GET /api/health` - Check if API is running

### Companies
- `GET /api/companies` - Get all companies (supports query params: `search`, `location`, `industry`, `size`)
- `GET /api/companies/:id` - Get single company by ID
- `POST /api/companies` - Create a new company
- `PUT /api/companies/:id` - Update a company
- `DELETE /api/companies/:id` - Delete a company

### Query Parameters (for GET /api/companies)
- `search` - Search in company name and description
- `location` - Filter by location (use "all" to show all)
- `industry` - Filter by industry (use "all" to show all)
- `size` - Filter by company size (use "all" to show all)

### Example Requests

Get all companies:
```bash
GET http://localhost:8888/api/companies
```

Search companies:
```bash
GET http://localhost:8888/api/companies?search=analytics
```

Filter by location and industry:
```bash
GET http://localhost:8888/api/companies?location=New York, USA&industry=Analytics
```

## Response Format

Success response:
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

Error response:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (in development mode)"
}
```

