# Company Explorer Frontend

Responsive React app for browsing and filtering a catalog of companies. Supports mock API integration via JSON Server or a static JSON fallback.

## Tech Stack

- React 19 + Vite
- CSS modules (global styles)
- JSON Server (local mock API)

## Getting Started

```bash
npm install
```

### Run the mock API

```bash
npm run mock-api
```

This starts JSON Server at `http://localhost:5174/companies`. You can edit `mock-api/db.json` to tweak the dataset.

### Configure the frontend

Create a `.env` file in the project root with:

```
VITE_API_URL=http://localhost:5174/companies
```

When no environment variable is provided, the app falls back to the bundled `public/data/companies.json`.

### Run the dev server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Features

- Company cards with metadata (location, size, industry)
- Search + dropdown filters
- Pagination (6 results per page)
- Loading, error, and empty states
- Accessible markup and keyboard navigation for cards + pagination
