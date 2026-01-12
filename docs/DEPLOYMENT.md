# Deployment Guide

## 📦 Building for Production

### Frontend (React + Vite)

```bash
cd D:\CODE-BASE\erp-inventory-manager

# Install dependencies (if not already)
npm install

# Build for production
npm run build
```

This creates a `dist/` folder with optimized static files.

### Backend (FastAPI)

```bash
cd D:\CODE-BASE\erp-inventory-manager-backend

# Install dependencies
pip install -r requirements.txt

# Run in production mode
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) - FREE

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Set environment variables:
   - `VITE_API_BASE_URL` = your backend URL
5. Deploy!

### Option 2: Netlify (Frontend) - FREE

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables
6. Deploy!

### Option 3: Railway (Backend) - FREE tier

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your backend repository
4. Railway auto-detects Python
5. Add environment variables if needed
6. Deploy!

### Option 4: Render (Both) - FREE tier

1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect repository
4. For React: Static Site
5. For FastAPI: Web Service
6. Deploy!

---

## 🔧 Environment Variables

### Frontend (.env.production)
```
VITE_API_BASE_URL=https://your-backend-url.com/api
VITE_APP_NAME=ERP Inventory Manager
VITE_APP_VERSION=1.0.0
```

### Backend
```
SECRET_KEY=your-super-secret-jwt-key-change-this
DATABASE_URL=sqlite:///./data/erp.db
```

---

## 📋 Pre-Deployment Checklist

### Frontend
- [ ] Update `.env.production` with real API URL
- [ ] Run `npm run build` successfully
- [ ] Test production build locally: `npm run preview`
- [ ] Check for console errors
- [ ] Verify all routes work

### Backend
- [ ] Change SECRET_KEY in auth.py
- [ ] Configure CORS for production domain
- [ ] Test all API endpoints
- [ ] Database migrations (if any)

---

## 🧪 Test Production Build Locally

### Frontend
```bash
npm run build
npm run preview
# Opens at http://localhost:4173
```

### Backend
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
# API at http://localhost:8000
# Docs at http://localhost:8000/api/docs
```

---

## 🔐 Security Checklist

- [ ] Change JWT SECRET_KEY to a strong random value
- [ ] Use HTTPS in production
- [ ] Set secure CORS origins (not *)
- [ ] Remove debug/development endpoints
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Set up proper logging

---

## 📊 Production Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         PRODUCTION                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────┐         ┌─────────────┐         ┌──────────┐│
│   │   Vercel    │         │   Railway   │         │  SQLite  ││
│   │   Netlify   │  ─────▶ │   Render    │  ─────▶ │  or      ││
│   │   (React)   │  HTTPS  │  (FastAPI)  │         │  Postgres││
│   └─────────────┘         └─────────────┘         └──────────┘│
│                                                                 │
│   Static Files            API Server              Database     │
│   (CDN cached)            (Auto-scaling)          (Persistent) │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Deploy Commands

### Vercel
```bash
npm install -g vercel
vercel login
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

---

## 📈 Performance Tips

1. **Enable Gzip** - Most hosting providers do this automatically
2. **Use CDN** - Vercel/Netlify include CDN
3. **Optimize Images** - Compress before uploading
4. **Code Splitting** - Already implemented with React.lazy!
5. **Caching Headers** - Configure for static assets

---

## 🐛 Troubleshooting

### CORS Errors
Update backend CORS settings:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],
    # ...
)
```

### API Connection Failed
1. Check VITE_API_BASE_URL is correct
2. Verify backend is running
3. Check network tab for errors

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```
