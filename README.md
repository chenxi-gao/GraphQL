# Book Management System with GraphQL and Next.js

A simple book management system built with GraphQL API and Next.js frontend.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

## Environment Setup (macOS)

1. Install Node.js using Homebrew:
```bash
# Install Homebrew if you haven't
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

## Project Setup

1. Clone and enter the project:
```bash
git clone <repository-url>
cd graphql-nextjs-demo
```

2. Setup API server:
```bash
cd api
npm install
```

3. Setup frontend:
```bash
cd ../frontend
npm install
```

## Running the Project

1. Start API server (in first terminal):
```bash
cd api
npm run dev
```
API will run at http://localhost:4000

2. Start frontend (in another terminal):
```bash
cd frontend
npm run dev
```
Frontend will run at http://localhost:3000

## Features

- View all books
- Add new books
- Delete books

## Project Structure

```
graphql-nextjs-demo/
├── api/                 # GraphQL API server
│   ├── index.js        # API entry point
│   └── package.json    # API dependencies
│
└── frontend/           # Next.js frontend
    ├── lib/            # Utilities
    ├── pages/          # Page components
    ├── styles/         # Stylesheets
    └── package.json    # Frontend dependencies
```

## Testing API

Visit http://localhost:4000 to open Apollo Studio. Try these operations:

1. Query all books:
```graphql
query {
  books {
    id
    title
    author
  }
}
```

2. Add a book:
```graphql
mutation {
  addBook(title: "New Book", author: "Author Name") {
    id
    title
    author
  }
}
```

3. Delete a book:
```graphql
mutation {
  deleteBook(id: "1") {
    id
    title
    author
  }
}
```

## Troubleshooting

1. Port already in use:
```bash
# Find process using port
lsof -i :3000  # or :4000
# Kill process
kill -9 <PID>
```

2. Dependency installation issues:
```bash
# Clear npm cache
npm cache clean --force
# Reinstall dependencies
npm install
```

## Tech Stack

- Backend: Apollo Server, GraphQL
- Frontend: Next.js, Apollo Client, Tailwind CSS
- Languages: TypeScript (Frontend), JavaScript (Backend)