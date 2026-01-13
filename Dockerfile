# Frontend Dockerfile - React + Vite + Nginx
# Multi-stage build: Build in Node, serve with Nginx
# Java Equivalent: Like building with Maven, then deploying to Tomcat

# ============================================
# Stage 1: BUILD
# ============================================
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (for layer caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build arguments for environment variables
# These are passed at build time
ARG VITE_API_BASE_URL=http://localhost:8001/api
ARG VITE_APP_NAME="ERP Inventory Manager"

# Set environment variables for build
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_APP_NAME=$VITE_APP_NAME

# Build the application
RUN npm run build

# ============================================
# Stage 2: PRODUCTION
# ============================================
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
