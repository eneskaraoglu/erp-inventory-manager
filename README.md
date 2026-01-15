# ERP Inventory Manager - Frontend

React frontend for the ERP Inventory Management System.

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Run with backend (see backend repo for full docker-compose)
docker pull eneskaraoglu/erp-frontend:latest
docker run -d -p 3000:80 eneskaraoglu/erp-frontend:latest

# Access
open http://localhost:3000
```

### Option 2: Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access
open http://localhost:5173
```

**Note:** For local development, backend must be running on port 8001.

## 📁 Project Structure

```
erp-inventory-manager/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── layout/
│   │   ├── ProductCard.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── ErrorBoundary.tsx
│   ├── pages/               # Page components
│   │   ├── Dashboard.tsx
│   │   ├── LoginPage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── Customer/
│   │   └── User/
│   ├── context/             # React Context providers
│   ├── hooks/               # Custom hooks
│   ├── stores/              # Zustand stores
│   ├── services/            # API services
│   ├── types/               # TypeScript types
│   └── validation/          # Zod schemas
├── Dockerfile               # Multi-stage build
├── docker-compose.yml       # Docker orchestration
├── nginx.conf               # Nginx config with API proxy
└── package.json
```

## 🔐 Authentication

JWT token-based authentication with role-based access.

**Test Credentials:**
| Role | Username | Password |
|------|----------|----------|
| Admin | admin | admin123 |
| Manager | manager | manager123 |
| User | johndoe | password123 |

## 🐳 Docker

### Build & Push

```bash
docker build -t eneskaraoglu/erp-frontend:latest .
docker push eneskaraoglu/erp-frontend:latest
```

### Nginx Proxy

The frontend uses Nginx to proxy `/api` requests to the backend container. This makes the app portable - works on any server without rebuilding!

```nginx
location /api {
    proxy_pass http://backend:8001/api;
}
```

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v7
- **State Management:** 
  - Zustand (client state)
  - React Query (server state)
- **Styling:** Tailwind CSS
- **Validation:** Zod
- **Data Grid:** AG Grid

## 📚 Documentation

- [Session Notes](./docs/) - Learning journey documentation
- [Concepts](./docs/CONCEPTS.md) - React concepts reference
- [Progress](./docs/PROGRESS.md) - Learning progress tracker

## 🧪 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📝 License

MIT
