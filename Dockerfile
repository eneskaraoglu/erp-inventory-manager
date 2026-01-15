# Frontend Dockerfile - React + Vite + Nginx
# Multi-stage build: Build in Node, serve with Nginx

# ============================================
# Stage 1: BUILD
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (for layer caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build with RELATIVE API URL - nginx will proxy /api to backend
# This is the KEY for Docker networking!
ENV VITE_API_BASE_URL=/api
ENV VITE_APP_NAME="ERP Inventory Manager"

# Build the application
RUN npm run build

# ============================================
# Stage 2: PRODUCTION
# ============================================
FROM nginx:alpine

# Copy custom nginx config (with API proxy!)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
