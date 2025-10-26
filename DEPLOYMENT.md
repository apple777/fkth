# Deployment Guide

## Environment Setup

### Required Environment Variables

Before deploying, ensure you have configured all required environment variables:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fkth

# Authentication
SESSION_SECRET=<generate-strong-random-string>
AUTH_ADMIN_USERNAME=<your-admin-username>
AUTH_ADMIN_PASSWORD=<your-secure-password>

# Services
NEXT_PUBLIC_MAPBOX_TOKEN=<your-mapbox-token>
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Environment
NODE_ENV=production
```

### Generating Secure Session Secret

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32
```

## MongoDB Atlas Setup

1. **Create an Atlas Account**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster (M0)

2. **Configure Network Access**
   - Add `0.0.0.0/0` for Vercel (or specific IPs)
   - Enable VPC peering for production

3. **Create Database User**
   - Username: `fkth_app`
   - Password: Generate secure password
   - Role: `readWrite` on `fkth` database

4. **Get Connection String**
   ```
   mongodb+srv://fkth_app:PASSWORD@cluster.mongodb.net/fkth?retryWrites=true&w=majority
   ```

## Mapbox Configuration

1. **Create Mapbox Account**
   - Visit [Mapbox](https://account.mapbox.com/)
   - Sign up for free tier

2. **Create Access Token**
   - Go to Access Tokens
   - Create new token with public scopes
   - Copy token to `NEXT_PUBLIC_MAPBOX_TOKEN`

3. **Configure URL Restrictions** (Optional)
   - Add your production domain
   - Adds extra security layer

## Vercel Deployment

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Visit [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select "Next.js" framework preset

3. **Configure Environment Variables**
   - Add all variables from `.env.example`
   - Mark sensitive ones as "Secret"
   - Add for Production, Preview, and Development

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit your live site!

### Option 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # First deployment
   vercel

   # Production deployment
   vercel --prod
   ```

4. **Add Environment Variables**
   ```bash
   vercel env add MONGODB_URI production
   vercel env add SESSION_SECRET production
   # ... add all other variables
   ```

## Docker Deployment

### Build and Run Locally

```bash
# Build image
docker build -t fkth:latest .

# Run container
docker run -p 3000:3000 \
  -e MONGODB_URI="your-mongodb-uri" \
  -e SESSION_SECRET="your-secret" \
  -e AUTH_ADMIN_USERNAME="admin" \
  -e AUTH_ADMIN_PASSWORD="password" \
  -e NEXT_PUBLIC_MAPBOX_TOKEN="your-token" \
  -e NEXT_PUBLIC_BASE_URL="http://localhost:3000" \
  fkth:latest
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - SESSION_SECRET=${SESSION_SECRET}
      - AUTH_ADMIN_USERNAME=${AUTH_ADMIN_USERNAME}
      - AUTH_ADMIN_PASSWORD=${AUTH_ADMIN_PASSWORD}
      - NEXT_PUBLIC_MAPBOX_TOKEN=${NEXT_PUBLIC_MAPBOX_TOKEN}
      - NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
    restart: unless-stopped
```

Run:
```bash
docker-compose up -d
```

## Cloud Platform Deployment

### AWS (Elastic Beanstalk)

1. Install EB CLI
2. Initialize: `eb init`
3. Create environment: `eb create production`
4. Set env vars: `eb setenv KEY=value`
5. Deploy: `eb deploy`

### Google Cloud (Cloud Run)

```bash
# Build container
gcloud builds submit --tag gcr.io/PROJECT_ID/fkth

# Deploy
gcloud run deploy fkth \
  --image gcr.io/PROJECT_ID/fkth \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars MONGODB_URI="...",SESSION_SECRET="..."
```

### Azure (Web Apps)

```bash
# Login
az login

# Create resource group
az group create --name fkth-rg --location eastus

# Create app service plan
az appservice plan create --name fkth-plan --resource-group fkth-rg --sku B1 --is-linux

# Create web app
az webapp create --resource-group fkth-rg --plan fkth-plan --name fkth-app --runtime "NODE|18-lts"

# Configure env vars
az webapp config appsettings set --resource-group fkth-rg --name fkth-app --settings MONGODB_URI="..."

# Deploy
az webapp deployment source config-zip --resource-group fkth-rg --name fkth-app --src ./build.zip
```

## Post-Deployment Checklist

- [ ] Verify MongoDB connection
- [ ] Test admin login
- [ ] Check all API endpoints
- [ ] Test image uploads/loading
- [ ] Verify map functionality
- [ ] Test VR viewer
- [ ] Check both language versions (he/en)
- [ ] Test on mobile devices
- [ ] Verify CSP headers
- [ ] Check SSL certificate
- [ ] Set up monitoring (e.g., Sentry, LogRocket)
- [ ] Configure backups (MongoDB Atlas)
- [ ] Set up analytics (optional)

## Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          MONGODB_URI: ${{ secrets.MONGODB_URI }}
          SESSION_SECRET: ${{ secrets.SESSION_SECRET }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Monitoring & Maintenance

### Health Check Endpoint

Add to `src/app/api/health/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/services/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected'
    }, { status: 503 });
  }
}
```

### Logging

Consider adding:
- **Sentry** for error tracking
- **LogRocket** for session replay
- **Vercel Analytics** for performance
- **Google Analytics** for user behavior

### Backup Strategy

1. **MongoDB Atlas Automated Backups**
   - Enable in cluster settings
   - Retention: 7-30 days

2. **Manual Exports**
   ```bash
   mongodump --uri="mongodb+srv://..." --out=./backup
   ```

3. **Media Assets**
   - Store in S3/CloudFlare R2
   - Enable versioning

## Troubleshooting

### Build Failures
- Check Node.js version (18+)
- Verify all dependencies installed
- Check TypeScript errors: `npm run lint`

### Connection Issues
- Verify MongoDB URI format
- Check IP whitelist in Atlas
- Test connection locally first

### Authentication Problems
- Verify SESSION_SECRET is set
- Check admin credentials
- Clear browser cookies

### Performance Issues
- Enable Next.js Image Optimization
- Use CDN for static assets
- Implement Redis caching
- Enable Vercel Edge Functions

## Security Hardening

1. **Enable Rate Limiting**
2. **Add CAPTCHA** to admin login
3. **Implement IP whitelist** for admin
4. **Use secrets management** (Vault, Secrets Manager)
5. **Enable audit logging**
6. **Regular security updates**: `npm audit fix`

---

For additional support, see [README.md](./README.md) or create an issue on GitHub.

