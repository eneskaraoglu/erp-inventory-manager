# 🐳 Docker Deployment Guide

## Quick Start

### Option 1: Full Stack (Recommended)
Run both backend and frontend with ONE command:

```bash
cd D:\CODE-BASE\erp-inventory-manager-backend
docker-compose -f docker-compose.full.yml up -d --build
```

Access:
- **Frontend:** http://localhost
- **Backend API:** http://localhost:8001/api
- **API Docs:** http://localhost:8001/api/docs

### Option 2: Separate Containers
Run backend and frontend separately:

```bash
# Terminal 1: Start Backend (creates network)
cd D:\CODE-BASE\erp-inventory-manager-backend
docker-compose up -d --build

# Terminal 2: Start Frontend (joins network)
cd D:\CODE-BASE\erp-inventory-manager
docker-compose up -d --build
```

---

## 📋 Commands Reference

| Command | Description |
|---------|-------------|
| `docker-compose up -d` | Start containers (detached) |
| `docker-compose up -d --build` | Rebuild and start |
| `docker-compose down` | Stop containers |
| `docker-compose logs -f` | View logs (follow) |
| `docker-compose ps` | List running containers |
| `docker-compose restart` | Restart containers |

---

## 🔍 How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                    Docker Network: erp-network              │
│                                                             │
│   ┌─────────────────┐         ┌─────────────────┐          │
│   │    Frontend     │         │     Backend     │          │
│   │   (nginx:80)    │────────▶│  (uvicorn:8001) │          │
│   │                 │  /api   │                 │          │
│   └────────┬────────┘         └────────┬────────┘          │
│            │                           │                    │
└────────────┼───────────────────────────┼────────────────────┘
             │                           │
        Port 80                     Port 8001
             │                           │
             ▼                           ▼
        Browser                    API Testing
    http://localhost           http://localhost:8001
```

**Key Point:** Frontend nginx proxies `/api/*` to `http://backend:8001/api/*`
- Browser calls: `http://localhost/api/products`
- Nginx forwards to: `http://backend:8001/api/products`
- "backend" is resolved by Docker DNS to the backend container

---

## 🛠️ Troubleshooting

### Check if containers are running:
```bash
docker ps
```

### View logs:
```bash
# All containers
docker-compose -f docker-compose.full.yml logs -f

# Backend only
docker logs erp-backend -f

# Frontend only
docker logs erp-frontend -f
```

### Restart everything:
```bash
docker-compose -f docker-compose.full.yml down
docker-compose -f docker-compose.full.yml up -d --build
```

### Check network:
```bash
docker network ls
docker network inspect erp-network
```

### Test backend health:
```bash
curl http://localhost:8001/api/health
```

### Test frontend → backend proxy:
```bash
curl http://localhost/api/health
```

---

## 📁 File Structure

```
erp-inventory-manager-backend/
├── docker-compose.yml          # Backend only
├── docker-compose.full.yml     # Full stack (recommended)
├── Dockerfile                  # Backend image
└── ...

erp-inventory-manager/
├── docker-compose.yml          # Frontend only
├── Dockerfile                  # Frontend image (multi-stage)
├── nginx.conf                  # Nginx config with /api proxy
└── ...
```

---

## ⚙️ Environment Modes

| Mode | Backend URL | How to Run |
|------|-------------|------------|
| **Local Dev** | `http://localhost:8000/api` | `python run.py` + `npm run dev` |
| **Docker** | `/api` (nginx proxy) | `docker-compose up` |

The frontend uses:
- `.env.development` → Local development
- `Dockerfile ENV` → Docker build (uses `/api`)
