# Sheffield Speakers Toastmasters Website

A modern, responsive website for Sheffield Speakers Toastmasters Club built with Astro and Tailwind CSS.

## Documentation

- **[ADMIN_SETUP.md](./ADMIN_SETUP.md)** - Complete guide for setting up the admin dashboard and inviting users
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Step-by-step deployment to Netlify
- **README.md** (this file) - Project overview and general information

## Features

- Fast, static site generation with Astro
- Responsive design with Tailwind CSS
- Content management via Decap CMS (Netlify CMS)
- Markdown-based content for articles
- Brand-compliant design with Toastmasters colors and fonts
- Member resources section
- Ready for Netlify deployment

## Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:4321](http://localhost:4321) in your browser

## Customizing Club Details

All club-specific information is centralized in `/src/config/club.ts`. Edit this file to update:

- Club name
- City and country
- Contact email
- Meeting location and address
- Meeting summary
- Mission statement
- Social media links

**This is the only file you need to edit to customize the site for your club.**

## Content Management

### Using Decap CMS (for non-technical editors)

The admin dashboard uses Netlify Identity for secure, invitation-only access. Content editors are invited by email, set up their account, and can then create/edit articles through an intuitive CMS interface.

**For complete setup instructions, see [ADMIN_SETUP.md](./ADMIN_SETUP.md)**

Quick overview:
1. Deploy the site to Netlify (see Deployment section)
2. Enable Netlify Identity on your site
3. Enable Git Gateway in Netlify Identity settings
4. Invite editors by email via Netlify Identity
5. They accept invitation, set a password, and access `/admin`
6. They can create/edit articles without touching code

**Important**: There is no self-signup. Users must be invited first!

### Manual Content Editing (for developers)

Articles are stored in `/src/content/articles/` as Markdown files.

To create a new article, create a new `.md` file with the following frontmatter:

```markdown
---
title: "Your Article Title"
description: "A brief description of the article"
author: "Author Name"
publishDate: 2024-01-15
draft: false
---

Your article content here in Markdown format.
```

## Project Structure

```
/
├── public/
│   ├── admin/              # Decap CMS configuration
│   │   ├── index.html
│   │   └── config.yml
│   ├── brand/              # Brand assets
│   │   └── toastmasters-logo.svg
│   └── favicon.svg
├── src/
│   ├── components/         # Reusable components
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── config/             # Site configuration
│   │   └── club.ts         # ⭐ EDIT THIS FILE for club details
│   ├── content/
│   │   ├── config.ts       # Content collection schemas
│   │   └── articles/       # Article markdown files
│   ├── layouts/
│   │   └── Layout.astro    # Base layout
│   └── pages/
│       ├── index.astro     # Homepage
│       └── resources/
│           ├── index.astro     # Articles listing
│           └── [slug].astro    # Individual article page
├── astro.config.mjs
├── tailwind.config.mjs
├── netlify.toml
└── package.json
```

## Branding

The site uses Sheffield Speakers/Toastmasters branding:

**Colors:**
- Loyal Blue: `#004165`
- True Maroon: `#772432`
- Cool Gray: `#A9B2B1`
- Happy Yellow: `#F2DF74`

**Typography:**
- Headings: Montserrat (Google Font)
- Body: Source Sans 3 (Google Font)

## Logo Replacement

**IMPORTANT:** Replace the placeholder logo with the official Toastmasters logo:

1. Download the official logo from [Toastmasters Brand Resources](https://www.toastmasters.org/Resources/Brand-and-Logo-Usage)
2. Replace `/public/brand/toastmasters-logo.svg` with the official logo file
3. Update the reference in `/src/components/Header.astro` if the filename changes

## Legal & Content Policy

**IMPORTANT:**

- Do NOT rehost materials from Toastmasters.org on this site
- ALWAYS link to official Toastmasters resources instead of copying them
- Do NOT upload member-only or paid materials (Pathways content, official manuals, etc.)
- Only share club-specific information and publicly available resources
- The footer contains the required legal disclaimer for Toastmasters websites

## Deployment

### Deploy to Netlify

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to [Netlify](https://www.netlify.com/)
3. Click "Add new site" > "Import an existing project"
4. Connect your Git repository
5. Netlify will auto-detect Astro and configure build settings
6. Click "Deploy site"

### Post-Deployment Setup

After deploying:

1. **Set up Netlify Identity** (required for CMS access):
   - Go to Site Settings > Identity
   - Click "Enable Identity"
   - Under Registration preferences, select "Invite only"
   - Enable Git Gateway in Identity settings

2. **Invite content editors**:
   - Go to Identity tab
   - Click "Invite users"
   - Enter editor email addresses
   - They'll receive an invite to access `/admin`

3. **Update site URL** (optional):
   - Update `site` in `astro.config.mjs` with your Netlify URL
   - Redeploy

### Custom Domain

To use a custom domain:

1. Go to Site Settings > Domain management
2. Click "Add custom domain"
3. Follow Netlify's instructions to configure DNS

## Local Development with CMS

To test Decap CMS locally:

1. Uncomment the `local_backend: true` line in `/public/admin/config.yml`
2. Install Decap CMS Proxy:
   ```bash
   npx decap-server
   ```
3. In another terminal, run:
   ```bash
   npm run dev
   ```
4. Access the CMS at `http://localhost:4321/admin`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run astro` - Run Astro CLI commands

## Browser Support

The site is tested and works on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Support & Resources

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Decap CMS Documentation](https://decapcms.org/docs/intro/)
- [Toastmasters International](https://www.toastmasters.org/)

## License

This website template is provided as-is for use by Toastmasters clubs. Toastmasters International branding and trademarks remain the property of Toastmasters International.
