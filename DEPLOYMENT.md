# Deployment Guide - ComfortCo

This guide covers deploying ComfortCo to various platforms.

## Cloudflare Pages (Recommended)

ComfortCo is configured to deploy to Cloudflare Pages using the `@cloudflare/vite-plugin`.

### Prerequisites

- Cloudflare account
- GitHub/GitLab/Gitea repository linked to Cloudflare

### Deployment Steps

1. **Connect Repository**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to Pages → Create a project
   - Select your repository
   - Click "Connect GitHub"

2. **Build Configuration**
   - Build command: `bun run build`
   - Build output directory: `dist`
   - Root directory: `/` (or your monorepo root)

3. **Environment Variables**
   - Add all variables from `.env.example` to Cloudflare Pages settings
   - Set `VITE_ENV=production` for production deployments

4. **Deploy**
   - Push to your main branch (or configured branch)
   - Cloudflare automatically builds and deploys

### Custom Domain

- In Cloudflare Pages settings, add your custom domain
- Update DNS records as instructed

## Vercel

### Prerequisites

- Vercel account
- GitHub repository

### Deployment Steps

1. **Import Project**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project" → "Import Git Repository"
   - Select the ComfortCo repository

2. **Configure**
   - Framework: "Other"
   - Build Command: `bun run build`
   - Output Directory: `dist/client`
   - Install Command: `bun install`
   - Ensure all routes rewrite to `/_shell.html` for SPA navigation

3. **Environment Variables**
   - Add variables from `.env.example`

4. **Deploy**
   - Click "Deploy"
   - Vercel builds and deploys automatically on push to main

## Netlify

### Prerequisites

- Netlify account
- GitHub repository

### Deployment Steps

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Select GitHub and ComfortCo repository

2. **Build Settings**
   - Build command: `bun run build`
   - Publish directory: `dist`

3. **Environment Variables**
   - Add variables in Site settings → Build & Deploy → Environment

4. **Deploy**
   - Connect and Netlify will auto-deploy

## Docker Deployment

### Prerequisites

- Docker installed
- Container registry (Docker Hub, GitHub Container Registry, etc.)

### Dockerfile

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g bun

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Production image
FROM node:20-alpine
WORKDIR /app
RUN npm install -g bun

COPY package.json bun.lockb ./
RUN bun install --production

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["bun", "run", "preview"]
```

### Build & Deploy

```bash
# Build image
docker build -t comfortco:latest .

# Run container
docker run -p 3000:3000 comfortco:latest

# Push to registry
docker tag comfortco:latest your-registry/comfortco:latest
docker push your-registry/comfortco:latest
```

## Environment Variables by Platform

### Production Environment

Create a `.env.production` file:

```bash
VITE_APP_NAME=ComfortCo
VITE_APP_VERSION=1.0.0
VITE_ENV=production
VITE_API_BASE_URL=https://api.comfortco.com
```

## Performance Optimization

Before deploying, ensure:

1. **Bundle Size**

   ```bash
   bun run build
   # Check dist folder size - target < 200KB gzipped
   ```

2. **Performance Metrics**
   - Core Web Vitals optimization
   - Image optimization (using sharp or similar)
   - Code splitting for routes

3. **SEO**
   - Meta tags properly set
   - Sitemap generation
   - robots.txt configuration

## Monitoring

### Cloudflare

- Use Cloudflare Analytics to monitor traffic
- Set up alerts for errors

### Vercel

- Monitor deployments in Vercel Dashboard
- Use integrated analytics

### Netlify

- Monitor in Netlify Dashboard
- Enable analytics

## Troubleshooting

### Build Failures

```bash
# Clean and rebuild
bun run build --force

# Check dependencies
bun install
```

### Environment Variables Not Loaded

- Verify variable names match your code
- Check for typos in environment keys
- Ensure build/deploy platform has correct vars

### Performance Issues

- Check bundle size
- Monitor API response times
- Optimize images

## Rollback

### Cloudflare Pages

- Go to Deployments → Select previous version → Rollback

### Vercel

- Go to Deployments → Select previous → Promote to Production

### Netlify

- Go to Deploys → Select previous → Publish deploy

## CI/CD Pipeline

Consider setting up automated tests before deployment:

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run lint
      - run: bun run build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: # Deploy script
```

---

For more details, refer to platform-specific documentation:

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
