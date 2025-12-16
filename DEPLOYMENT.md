# Deployment Guide

This guide will help you deploy the Sheffield Speakers website to Netlify.

## Prerequisites

- A GitHub, GitLab, or Bitbucket account
- A Netlify account (free tier is sufficient)
- Git installed on your computer

## Step 1: Initialize Git Repository

If you haven't already:

```bash
git init
git add .
git commit -m "Initial commit: Sheffield Speakers website"
```

## Step 2: Push to GitHub (or GitLab/Bitbucket)

1. Create a new repository on GitHub (don't initialize with README)
2. Add the remote and push:

```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Netlify

### Option A: Deploy via Netlify UI (Recommended)

1. Go to [https://app.netlify.com/](https://app.netlify.com/)
2. Click "Add new site" > "Import an existing project"
3. Choose your Git provider (GitHub/GitLab/Bitbucket)
4. Authorize Netlify to access your repositories
5. Select your repository
6. Configure build settings (should auto-detect):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Base directory:** (leave empty)
7. Click "Deploy site"

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Follow the prompts to connect to your repository
```

## Step 4: Configure Netlify Identity (for CMS Access)

The admin dashboard at `/admin` uses Netlify Identity for secure, invitation-only access.

**For detailed instructions, see [ADMIN_SETUP.md](./ADMIN_SETUP.md)**

Quick setup:

1. Go to your site dashboard on Netlify
2. Navigate to **Identity** tab in the top menu
3. Click **Enable Identity**
4. Under **Settings and usage**, configure:
   - **Registration preferences**: Select **"Invite only"**
   - **Services**: Enable **Git Gateway**

## Step 5: Invite Content Editors

1. In the Netlify dashboard, go to **Identity** tab
2. Click **Invite users**
3. Enter email addresses of people who should be able to edit content
4. They'll receive an invitation email with a link
5. They click the link, set a password, and can then access `/admin`

## Step 6: Access the CMS

Once Identity is configured:

1. Editors go to: `https://your-site.netlify.app/admin`
2. They click "Login with Netlify Identity"
3. They enter their email and password
4. They see the Decap CMS interface and can create/edit articles

**Note**: Users must be invited before they can log in - there's no self-signup!

## Step 7: Custom Domain (Optional)

To use a custom domain:

1. In Netlify dashboard, go to **Domain management**
2. Click **Add custom domain**
3. Enter your domain name
4. Follow instructions to update DNS records:
   - Add Netlify's nameservers to your domain registrar, OR
   - Add A/CNAME records as specified by Netlify
5. Netlify will automatically provision SSL certificate

## Step 8: Update Club Details

Before going live, ensure you've updated:

1. **Club configuration** in `/src/config/club.ts`:
   - Contact email (replace placeholder)
   - Social media links (if applicable)
   - Meeting details

2. **Toastmasters logo** in `/public/brand/toastmasters-logo.svg`:
   - Download official logo from [Toastmasters Brand Resources](https://www.toastmasters.org/Resources/Brand-and-Logo-Usage)
   - Replace the placeholder file

3. **Site URL** in `/astro.config.mjs`:
   - Update the `site` field with your actual Netlify or custom domain

4. Commit and push changes:
   ```bash
   git add .
   git commit -m "Update club details and branding"
   git push
   ```

## Continuous Deployment

Once set up, any changes pushed to your main branch will automatically trigger a new deployment:

1. Make changes to your code
2. Commit and push to GitHub
3. Netlify automatically rebuilds and deploys
4. Your site is updated in 1-2 minutes

## Content Updates via CMS

When editors create or update articles via the CMS:

1. Changes are committed directly to your repository
2. Netlify detects the commit and rebuilds the site
3. New content appears live in 1-2 minutes

## Troubleshooting

### Build fails on Netlify

- Check the deploy log in Netlify dashboard
- Ensure all dependencies are listed in `package.json`
- Verify Node.js version (should be 18+)

### CMS not loading or login issues

- Verify Identity is enabled in Netlify
- Verify Git Gateway is enabled under Identity settings
- Check that the user has been invited and accepted invitation
- Try clearing browser cache and cookies

### Articles not appearing

- Check that article frontmatter has `draft: false`
- Verify the article is in `/src/content/articles/`
- Check Netlify deploy log for build errors

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/netlify/)
- [Decap CMS Documentation](https://decapcms.org/docs/intro/)

## Support

If you encounter issues:

1. Check Netlify deploy logs
2. Review the [Astro Discord](https://astro.build/chat) for help
3. Consult the README.md for project structure information
