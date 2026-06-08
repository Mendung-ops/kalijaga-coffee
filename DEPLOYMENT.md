# Deployment Guide - Kalijaga Coffee & Bar

## Quick Deploy to Vercel (Recommended - FREE)

### Option 1: Deploy via Vercel CLI (Fastest)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy the app**
   ```bash
   cd /home/athn/vibecode/kalijaga-coffee
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **kalijaga-coffee** (or your choice)
   - Directory? **./
   ** (press Enter)
   - Override settings? **N**

4. **Your app will be live!**
   - You'll get a URL like: `https://kalijaga-coffee.vercel.app`
   - Share this URL with anyone!

### Option 2: Deploy via Vercel Website

1. **Push code to GitHub**
   ```bash
   cd /home/athn/vibecode/kalijaga-coffee
   git init
   git add .
   git commit -m "Initial commit: Kalijaga Coffee ordering system"
   git branch -M main
   ```
   
   Create a new repository on GitHub, then:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/kalijaga-coffee.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Done! Your app will be live at `https://your-project.vercel.app`

### Option 3: Deploy to Netlify (Alternative FREE hosting)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and Deploy**
   ```bash
   cd /home/athn/vibecode/kalijaga-coffee
   npm run build
   netlify deploy --prod
   ```

3. **Follow prompts to get your live URL**

---

## Local Build (Optional)

To create a production build locally:

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

---

## Environment Variables (If needed later)

If you need environment variables:

1. Create `.env` file (already in .gitignore)
2. Add variables like:
   ```
   VITE_API_URL=https://your-api.com
   ```
3. In code, access via: `import.meta.env.VITE_API_URL`
4. In Vercel/Netlify dashboard, add the same variables in Settings → Environment Variables

---

## Custom Domain (Optional)

### On Vercel:
1. Go to your project dashboard
2. Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

### On Netlify:
1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS

---

## Updating Your Live Site

After making changes:

**Vercel:**
```bash
vercel --prod
```

**Netlify:**
```bash
npm run build
netlify deploy --prod
```

**Or if connected to GitHub:**
- Just push to your main branch
- Vercel/Netlify will auto-deploy!

---

## Recommended: Vercel

**Why Vercel?**
- ✅ FREE for personal projects
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Auto-deploy from Git
- ✅ Perfect for React/Vite apps
- ✅ Easy custom domains
- ✅ Analytics included

**Your app will be accessible 24/7 worldwide!**
