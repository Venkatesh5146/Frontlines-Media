# Company Explorer - Full Stack Application

A modern, full-stack web application for browsing and filtering company data. Built with React (frontend) and Node.js + Express + MongoDB (backend).

## 🚀 Features

- **Frontend (React + Vite + Tailwind CSS)**
  - Beautiful, responsive UI with modern design
  - Real-time search and filtering
  - Pagination for large datasets
  - Smooth animations and transitions
  - Loading and error states

- **Backend (Node.js + Express + MongoDB)**
  - RESTful API with full CRUD operations
  - MongoDB database with Mongoose ODM
  - Advanced filtering and search capabilities
  - CORS enabled for frontend integration

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn**

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd front_media
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=8888
NODE_ENV=development
MONGODB_CONNECTION=mongodb://localhost:27017/company-explorer
JWT_SECRET=your-secret-key
```

For MongoDB Atlas, use:
```env
MONGODB_CONNECTION=mongodb+srv://username:password@cluster.mongodb.net/company-explorer
```

### 3. Seed the Database

```bash
cd backend
npm run seed
```

This will populate your MongoDB database with sample company data.

### 4. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend API will be available at `http://localhost:8888`

### 5. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory (optional, defaults to localhost:5000):

```env
VITE_API_URL=http://localhost:8888/api
```

### 6. Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

**Note:** Make sure the backend server is running on port 8888 before starting the frontend.

## 📁 Project Structure

```
front_media/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   └── Company.js        # Company Mongoose model
│   ├── routes/
│   │   └── companies.js      # API routes
│   ├── scripts/
│   │   └── seed.js           # Database seeding script
│   ├── server.js             # Express server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── CompanyCard.jsx
    │   │   ├── CompanyFilters.jsx
    │   │   ├── CompanyList.jsx
    │   │   └── PaginationControls.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## 🔌 API Endpoints

### Companies

- `GET /api/companies` - Get all companies (supports query params: `search`, `location`, `industry`, `size`)
- `GET /api/companies/:id` - Get single company by ID
- `POST /api/companies` - Create a new company
- `PUT /api/companies/:id` - Update a company
- `DELETE /api/companies/:id` - Delete a company

### Health Check

- `GET /api/health` - Check if API is running

### Example API Requests

```bash
# Get all companies
GET http://localhost:8888/api/companies

# Search companies
GET http://localhost:8888/api/companies?search=analytics

# Filter by location and industry
GET http://localhost:8888/api/companies?location=New York, USA&industry=Analytics
```

## 🎨 UI Features

- **Gradient backgrounds** for cards and filters
- **Smooth hover animations** on company cards
- **Responsive design** that works on all devices
- **Loading spinners** and error states
- **Debounced search** for better performance
- **Accessible** markup with ARIA labels

## 🚢 Production Build

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run build
```

The built files will be in `frontend/dist/`

## 📝 Environment Variables

### Backend (.env)

- `PORT` - Server port (default: 8888)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_CONNECTION` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens (for future authentication)

### Frontend (.env)

- `VITE_API_URL` - Backend API URL (default: http://localhost:8888/api)

## 🐛 Troubleshooting

### Backend won't start
- Make sure MongoDB is running (if using local MongoDB) or MongoDB Atlas connection is correct
- Check that the `MONGODB_CONNECTION` in `.env` is correct
- Verify port 8888 is not already in use

### Frontend can't connect to backend
- Ensure the backend server is running on port 8888
- Check that `VITE_API_URL` in frontend `.env` matches your backend URL (default: http://localhost:8888/api)
- Verify CORS is enabled in the backend (it should be by default)

### Database connection issues
- For local MongoDB: Ensure MongoDB service is running
- For MongoDB Atlas: Check your connection string and network access settings

## 📚 Tech Stack

**Frontend:**
- React 19
- Vite
- Tailwind CSS 4
- PropTypes

**Backend:**
- Node.js
- Express
- MongoDB
- Mongoose

## 📄 License

ISC

## 👨‍💻 Development

To run both frontend and backend in development mode:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` to see the application!

