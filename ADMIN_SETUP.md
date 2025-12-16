# Admin Dashboard Setup Guide

This guide explains how to set up the admin dashboard at `/admin` so you and your content editors can create and manage articles.

## Important Concept: Invitation-Only Access

**There is NO self-signup for the admin dashboard.** Here's how it works:

1. **You (the site owner)** invite specific people by email through Netlify
2. **They receive an invitation email** with a special link
3. **They click the link** to create their account and set a password
4. **Then they can log in** to `/admin` to create articles

If you just visit `/admin` without being invited first, you'll see a login screen but won't be able to sign up - this is intentional security!

---

## Part 1: Initial Setup (Site Owner - One Time Only)

### Step 1: Deploy Your Site to Netlify

1. **Push your code to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR-GITHUB-REPO-URL
   git push -u origin main
   ```

2. **Deploy to Netlify**:
   - Go to [https://app.netlify.com/](https://app.netlify.com/)
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **GitHub** and authorize Netlify
   - Select your repository
   - Build settings should auto-detect:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click **"Deploy site"**

3. **Wait for deployment** (1-2 minutes)
4. **Note your site URL**: Something like `https://sparkling-unicorn-123abc.netlify.app`

### Step 2: Enable Netlify Identity

1. In your Netlify site dashboard, click **"Identity"** in the top menu
2. Click **"Enable Identity"**
3. You'll see a confirmation that Identity is now enabled

### Step 3: Configure Identity Settings

1. Click **"Settings and usage"** in the Identity section
2. Under **"Registration preferences"**:
   - Select **"Invite only"** (this is important for security!)
3. Under **"Services"**, find **Git Gateway**:
   - Click **"Enable Git Gateway"**
   - This allows the CMS to save changes to your GitHub repository
4. That's it for configuration!

---

## Part 2: Inviting Content Editors

### How to Invite Someone

1. Go to your Netlify site dashboard
2. Click **"Identity"** tab
3. Click **"Invite users"** button
4. Enter the email address(es) of people you want to give access
5. Click **"Send"**

### What Happens Next

The invited person will receive an email that looks like this:

```
Subject: You've been invited to join [Your Site Name]

You've been invited to create a user on [Your Site Name].
Follow this link to accept the invite:

[Accept the invite]
```

---

## Part 3: For Invited Users - First Time Setup

When you receive the invitation email:

### Step 1: Accept Invitation

1. Click **"Accept the invite"** button in the email
2. You'll be taken to a page on the website
3. You'll see a form to **set your password**
4. Enter a strong password and confirm it
5. Click **"Sign up"** or **"Complete signup"**

### Step 2: Access the Admin Dashboard

1. After setting your password, you'll be logged in automatically
2. Navigate to: `https://your-site-name.netlify.app/admin`
3. You should see the Decap CMS interface with:
   - **Articles** collection (list of existing articles)
   - **Site Configuration** (club details)

---

## Part 4: Using the Admin Dashboard

### Logging In (After Initial Setup)

1. Go to `https://your-site-name.netlify.app/admin`
2. You'll see a "Login with Netlify Identity" button
3. Click it and enter your email and password
4. You'll be logged in to the CMS

### Creating an Article

1. In the sidebar, click **"Articles"**
2. Click **"New Article"** button
3. Fill in the form:
   - **Title**: The article headline
   - **Description**: Brief summary (shows in article list)
   - **Author**: Your name or club name
   - **Publish Date**: When the article is published
   - **Draft**: Toggle OFF to publish, ON to save as draft
   - **Body**: Write your article content (supports Markdown)
4. Click **"Publish"** (or **"Save"** for drafts)

The article will be committed to GitHub and your site will rebuild automatically (takes 1-2 minutes).

### Editing an Article

1. Click **"Articles"** in the sidebar
2. Click on any article in the list
3. Make your changes
4. Click **"Publish"** to save

### Markdown Tips

The body supports Markdown formatting:

```markdown
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2

[Link text](https://example.com)
```

### Uploading Images

1. In the Body field, click the **"+"** button
2. Select **"Image"**
3. Upload an image file
4. It will be inserted into your article

---

## Part 5: Managing Users

### View Active Users

1. Go to Netlify Dashboard → **Identity** tab
2. You'll see a list of all users with access
3. Shows their email, status, and when they last logged in

### Invite More Users

Simply repeat Part 2 - click **"Invite users"** and add more emails.

### Remove a User

1. Go to Netlify Dashboard → **Identity** tab
2. Find the user in the list
3. Click the **"..."** menu next to their name
4. Click **"Delete user"**
5. Confirm the deletion

They will immediately lose access to `/admin`.

---

## Part 6: Troubleshooting Common Issues

### Issue: "Can't access /admin - showing 404"

**Cause**: The `/admin` folder wasn't deployed properly.

**Fix**:
- Check that `public/admin/` folder exists in your repository
- Rebuild your site in Netlify

### Issue: "Login button appears but clicking it does nothing"

**Cause**: Netlify Identity not enabled.

**Fix**:
- Go to Netlify Dashboard → Identity
- If it says "Enable Identity", click it
- Then try accessing `/admin` again

### Issue: "User accepted invite but can't log in"

**Cause**: They may not have completed password setup.

**Fix**:
- Re-send the invitation
- Make sure they complete the entire signup flow
- Check the Identity tab to see if their account shows as "Active"

### Issue: "Git Gateway error when trying to save"

**Cause**: Git Gateway not enabled.

**Fix**:
- Go to Netlify Dashboard → Identity → Settings
- Under Services, enable **Git Gateway**
- Try saving again

### Issue: "Changes saved but not appearing on site"

**Cause**: Build may have failed or not triggered.

**Fix**:
- Go to Netlify Dashboard → **Deploys** tab
- Check if a build was triggered
- If not, click **"Trigger deploy"** → **"Deploy site"**
- Check build logs for errors

### Issue: "Password reset not working"

**Cause**: Email provider issues.

**Fix**:
- In Netlify Identity settings, check email settings
- Try re-sending the recovery email
- As site owner, you can delete the user and re-invite them

---

## Part 7: Local Development (Optional)

If you want to test the CMS locally without authentication:

### Step 1: Enable Local Backend

1. Open `public/admin/config.yml`
2. Uncomment this line:
   ```yaml
   local_backend: true
   ```

### Step 2: Run Local Proxy

In one terminal:
```bash
npx decap-server
```

### Step 3: Start Dev Server

In another terminal:
```bash
npm run dev
```

### Step 4: Access Local CMS

Go to `http://localhost:4321/admin` - you won't need to log in.

**Remember**: This is for testing only. Don't commit `local_backend: true` to your repository.

---

## Part 8: Security Best Practices

1. **Always use "Invite only"** registration mode
2. **Only invite trusted people** who need content editing access
3. **Review users periodically** - remove anyone who no longer needs access
4. **Use strong passwords** for all accounts
5. **Don't share invitation links** - they're tied to specific email addresses

---

## Part 9: Common Workflows

### Workflow 1: Regular Article Publishing

1. Editor logs in to `/admin`
2. Creates new article with `draft: false`
3. Clicks "Publish"
4. Site rebuilds in ~2 minutes
5. Article appears in `/resources`

### Workflow 2: Draft → Review → Publish

1. Editor creates article with `draft: true`
2. Clicks "Save"
3. Article saved but not visible on public site
4. Later, editor returns and sets `draft: false`
5. Clicks "Publish"
6. Now article appears on public site

### Workflow 3: Updating Club Details

1. Editor logs in to `/admin`
2. Clicks **"Site Configuration"** → **"Club Details"**
3. Updates fields (contact email, meeting location, etc.)
4. Clicks "Publish"
5. Site rebuilds with updated information everywhere

---

## Quick Reference

### URLs

- **Your site**: `https://your-site-name.netlify.app`
- **Admin dashboard**: `https://your-site-name.netlify.app/admin`
- **Netlify dashboard**: `https://app.netlify.com/`

### Key Settings Locations

- **Enable Identity**: Netlify Dashboard → Identity → Enable Identity
- **Enable Git Gateway**: Netlify Dashboard → Identity → Settings → Services
- **Invite users**: Netlify Dashboard → Identity → Invite users
- **View users**: Netlify Dashboard → Identity tab
- **View deploys**: Netlify Dashboard → Deploys tab

### Commands

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build

# Test local CMS (no auth)
npx decap-server
```

---

## Need More Help?

- **General info**: See [README.md](./README.md)
- **Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Netlify Identity Docs**: [https://docs.netlify.com/visitor-access/identity/](https://docs.netlify.com/visitor-access/identity/)
- **Decap CMS Docs**: [https://decapcms.org/docs/intro/](https://decapcms.org/docs/intro/)

---

## Summary

1. **Site owner**: Deploy to Netlify → Enable Identity → Enable Git Gateway → Invite users
2. **Invited users**: Accept invitation → Set password → Log in to `/admin` → Create articles
3. **Everyone**: Changes auto-commit to GitHub → Site rebuilds → Content goes live

The key is: **invitation-only access** keeps your admin dashboard secure!
