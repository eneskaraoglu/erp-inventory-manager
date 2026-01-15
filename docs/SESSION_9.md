# Session 9 - Docker Deployment 🐳
**Date:** January 13, 2026  
**Duration:** ~2 hours  
**Topic:** DevOps - Docker & Deployment

---

## 🎯 Session Goals - ✅ All Completed!

- [x] Create Dockerfiles for frontend and backend
- [x] Set up docker-compose for orchestration
- [x] Push images to Docker Hub
- [x] Deploy on remote Ubuntu server
- [x] Fix Nginx proxy for portable deployment

---

## ✅ Concepts Learned

### 1. Docker Basics

| Concept | Purpose | Java Equivalent |
|---------|---------|-----------------|
| Dockerfile | Build instructions | pom.xml + build script |
| Image | Built application | JAR/WAR file |
| Container | Running instance | Running JVM |
| docker-compose | Multi-container orchestration | Application server config |
| Volume | Persistent storage | External database |
| Network | Container communication | Service discovery |

### 2. Multi-Stage Build (Frontend)

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
RUN npm run build

# Stage 2: Production (smaller image!)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

### 3. Nginx Proxy

The key insight: **React runs in the browser, not in the container!**

```
Without Proxy:
  Browser → http://localhost:8001/api ❌ (localhost = user's PC)

With Nginx Proxy:
  Browser → http://server:3000/api → Nginx → backend:8001 ✅
```

---

## 🛠️ Files Created

### Backend
| File | Purpose |
|------|---------|
| `Dockerfile` | Build FastAPI container |
| `docker-compose.yml` | Run backend only |
| `docker-compose.prod.yml` | Run full stack |
| `.dockerignore` | Exclude files from build |
| `DOCKER_GUIDE.md` | Documentation |

### Frontend
| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage build (Node → Nginx) |
| `docker-compose.yml` | Run frontend only |
| `nginx.conf` | SPA routing + API proxy |
| `.dockerignore` | Exclude files from build |

---

## 🔑 Key Insights

### 1. Why Nginx Proxy is Essential

```
Problem:  Frontend built with http://192.168.1.2:8001
          → Only works on that specific server!
          
Solution: Frontend built with /api (relative)
          → Nginx proxies to backend
          → Works on ANY server!
```

### 2. Docker Network

Containers can communicate using service names:

```yaml
services:
  backend:
    ...
  frontend:
    depends_on:
      - backend  # Can reach backend at http://backend:8001
```

### 3. Volume for Data Persistence

```yaml
volumes:
  - backend_data:/app/data  # SQLite survives container restart
```

---

## 📊 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  Docker Host (Any Server)                                       │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Docker Network (erp-network)                            │   │
│  │                                                         │   │
│  │  ┌─────────────────┐      ┌─────────────────┐          │   │
│  │  │   Frontend      │ ───▶ │    Backend      │          │   │
│  │  │   (Nginx)       │ /api │    (FastAPI)    │          │   │
│  │  │   Port 3000     │      │    Port 8001    │          │   │
│  │  └─────────────────┘      └─────────────────┘          │   │
│  │                                  │                      │   │
│  │                           ┌──────▼──────┐              │   │
│  │                           │   Volume    │              │   │
│  │                           │  (SQLite)   │              │   │
│  │                           └─────────────┘              │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Deployment Workflow

```
Development PC                    Docker Hub                    Production Server
──────────────                    ──────────                    ─────────────────

1. docker build                        
2. docker push      ───────────▶  [eneskaraoglu/erp-backend]
                                  [eneskaraoglu/erp-frontend]  ───────▶  3. docker pull
                                                                        4. docker-compose up
                                                                        5. App running! 🎉
```

---

## 🏆 Achievement Unlocked!

| Badge | Description |
|-------|-------------|
| 🐳 Docker Master | Created multi-container app |
| 📦 Image Publisher | Pushed to Docker Hub |
| 🌐 DevOps Engineer | Deployed to remote server |
| 🔧 Nginx Pro | Configured reverse proxy |

---

## 📈 Complete Learning Progress

```
Phase 1: Fundamentals    [██████████] 100% ✅
Phase 2: Intermediate    [██████████] 100% ✅
Phase 3: Advanced        [██████████] 100% ✅
Phase 4: Professional    [██████████] 100% ✅
Phase 5: DevOps          [██████████] 100% ✅ NEW!
─────────────────────────────────────────────────
Total Progress:          [██████████] 100% 🎉
```

---

## 📋 Quick Reference

### Build & Push
```bash
# Backend
cd erp-inventory-manager-backend
docker build -t eneskaraoglu/erp-backend:latest .
docker push eneskaraoglu/erp-backend:latest

# Frontend
cd erp-inventory-manager
docker build -t eneskaraoglu/erp-frontend:latest .
docker push eneskaraoglu/erp-frontend:latest
```

### Deploy (Any Server)
```bash
# Create docker-compose.yml, then:
docker-compose pull
docker-compose up -d
```

### Common Commands
```bash
docker-compose up -d       # Start
docker-compose down        # Stop
docker-compose logs -f     # View logs
docker-compose pull        # Update images
docker-compose ps          # Check status
```

---

## 🔗 Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Docker Compose Reference](https://docs.docker.com/compose/)

---

## ➡️ What's Next?

1. **CI/CD Pipeline** - GitHub Actions for automatic build & deploy
2. **HTTPS** - SSL certificates with Let's Encrypt
3. **Monitoring** - Prometheus + Grafana
4. **Kubernetes** - Container orchestration at scale
5. **Cloud Deployment** - AWS, GCP, or Azure

---

**You're now a Full-Stack + DevOps Developer!** 🎉
