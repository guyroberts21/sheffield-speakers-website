# Admin Dashboard Access Flow

A visual guide showing how users get access to the admin dashboard.

## The Key Concept

**There is NO self-signup.** Users must be invited first.

```
┌─────────────────────────────────────────────────────────┐
│  Why can't I just visit /admin and sign up?            │
│                                                          │
│  This is intentional security! Only people YOU invite   │
│  can access the admin dashboard. This prevents random   │
│  people from the internet trying to access your CMS.    │
└─────────────────────────────────────────────────────────┘
```

---

## Flow Diagram: How Access Works

### Step 1: Site Owner Invites User

```
┌──────────────┐
│  Site Owner  │
│   (You)      │
└──────┬───────┘
       │
       │ 1. Go to Netlify Dashboard
       │ 2. Click Identity → Invite users
       │ 3. Enter editor's email
       │ 4. Click Send
       │
       ▼
┌─────────────────────┐
│ Netlify sends email │
│  to the editor      │
└──────┬──────────────┘
       │
       ▼
```

### Step 2: Editor Receives Invitation

```
┌────────────────────────────────────┐
│  📧 Email Inbox                    │
├────────────────────────────────────┤
│  From: Netlify                     │
│  Subject: You've been invited...   │
│                                    │
│  [Accept the invite]  ← Click here │
└────────────────────────────────────┘
```

### Step 3: Editor Accepts & Sets Password

```
Editor clicks link in email
       │
       ▼
┌──────────────────────┐
│  Create Account Page │
│                      │
│  Email: [filled in]  │
│  Password: [_____]   │
│  Confirm:  [_____]   │
│                      │
│    [Complete Setup]  │
└──────┬───────────────┘
       │
       ▼
Account created!
```

### Step 4: Editor Can Now Access /admin

```
┌─────────────────────────────────────────┐
│  Editor visits:                         │
│  https://your-site.netlify.app/admin    │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│  Login with Netlify Identity            │
│                                          │
│  Email: editor@example.com              │
│  Password: ••••••••                     │
│                                          │
│          [Log in]                        │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│       Decap CMS Dashboard               │
│                                          │
│  Collections:                           │
│  → Articles                             │
│  → Site Configuration                   │
│                                          │
│  [New Article]                          │
└─────────────────────────────────────────┘
```

---

## What If Someone Tries to Access /admin Without Being Invited?

```
Random person visits /admin
       │
       ▼
┌──────────────────────┐
│  Login Screen        │
│                      │
│  [Login button]      │
└──────┬───────────────┘
       │
       │ Clicks login
       ▼
┌──────────────────────┐
│  Email: [_____]      │
│  Password: [_____]   │
│  [Log in]            │
└──────┬───────────────┘
       │
       │ Tries to log in
       ▼
❌ "User not found"
   OR
❌ "Invalid credentials"

They CANNOT create an account here!
```

**This is the security feature working correctly.**

---

## Complete Flow: From Invitation to Published Article

```
1. INVITATION
   Site Owner → Netlify → Email → Editor

2. ACCOUNT SETUP
   Editor → Click link → Set password → Account created

3. LOGIN
   Editor → Visit /admin → Enter credentials → Access granted

4. CREATE ARTICLE
   Editor → New Article → Write content → Click Publish

5. AUTOMATIC PUBLISHING
   CMS → Git Gateway → GitHub → Webhook → Netlify Build

6. LIVE SITE UPDATED
   New article appears on /resources (1-2 min later)
```

---

## Common Scenarios

### Scenario 1: First Time Setup

```
Status: Site just deployed, no users invited yet

Action needed:
1. Enable Netlify Identity
2. Enable Git Gateway
3. Invite yourself first (to test)
4. Accept invitation
5. Access /admin and create test article
6. Once working, invite other editors
```

### Scenario 2: Adding a New Editor

```
Status: Site working, want to add another editor

Action needed:
1. Go to Netlify → Identity → Invite users
2. Enter new editor's email
3. They receive email → Accept → Set password
4. They can now log in to /admin
```

### Scenario 3: Editor Forgot Password

```
Status: Editor can't log in

Solution:
1. They go to /admin
2. Click "Forgot password?"
3. Enter their email
4. Receive reset link
5. Click link → Set new password
6. Log in with new password
```

### Scenario 4: Remove Editor Access

```
Status: Someone should no longer have access

Action needed:
1. Go to Netlify → Identity
2. Find the user in the list
3. Click "..." menu → Delete user
4. They immediately lose access
```

---

## Visual: The Technology Stack

```
┌────────────────────────────────────────────┐
│         Sheffield Speakers Website         │
│              (Astro + Tailwind)            │
│                                            │
│  Public Pages:          Admin Page:        │
│  • / (homepage)         • /admin           │
│  • /resources           (requires login)   │
└────────────────────────────────────────────┘
                    │
                    │ /admin protected by
                    ▼
┌────────────────────────────────────────────┐
│          Netlify Identity                  │
│      (User authentication service)         │
│                                            │
│  • Invitation system                       │
│  • Password management                     │
│  • Session handling                        │
└────────────────────────────────────────────┘
                    │
                    │ Authenticated users can use
                    ▼
┌────────────────────────────────────────────┐
│            Git Gateway                     │
│      (Allows CMS to commit to repo)        │
│                                            │
│  • Commits on behalf of user               │
│  • Preserves git history                   │
└────────────────────────────────────────────┘
                    │
                    │ Commits to
                    ▼
┌────────────────────────────────────────────┐
│          GitHub Repository                 │
│         (Source code + content)            │
│                                            │
│  • Markdown articles                       │
│  • Version history                         │
└────────────────────────────────────────────┘
                    │
                    │ Triggers build
                    ▼
┌────────────────────────────────────────────┐
│          Netlify Build & Deploy            │
│      (Creates static site from code)       │
│                                            │
│  • Runs: npm run build                     │
│  • Publishes to CDN                        │
└────────────────────────────────────────────┘
```

---

## Troubleshooting Decision Tree

```
Problem: Can't access /admin
  │
  ├─ Do you see a 404 error?
  │   └─ YES → Check if site is deployed
  │            Check if /public/admin/ exists
  │
  ├─ Do you see a login screen?
  │   └─ YES → Have you been invited?
  │            └─ NO → Ask site owner to invite you
  │            └─ YES → Did you complete signup?
  │                    └─ NO → Check email for invite link
  │                    └─ YES → Enter your credentials
  │
  └─ Login button does nothing?
      └─ Check if Identity is enabled in Netlify
```

---

## Security Model

```
Public Internet
       │
       │ Anyone can view
       ▼
┌──────────────────┐
│  Public Pages    │  ← No authentication required
│  /, /resources   │
└──────────────────┘

       │
       │ Only invited users
       ▼
┌──────────────────┐
│   /admin         │  ← Authentication required
│                  │  ← Must be on invite list
└──────────────────┘
       │
       │ Can commit to
       ▼
┌──────────────────┐
│   GitHub Repo    │  ← Authenticated via Git Gateway
│                  │  ← All changes tracked
└──────────────────┘
```

---

## Summary

The key points to remember:

1. **No self-signup** - Users must be invited
2. **Invitation-only** - Only people you invite can access /admin
3. **Secure by default** - Random visitors cannot create accounts
4. **Simple for users** - Once invited, they just need email + password
5. **Full control** - You can add/remove users anytime

**See [ADMIN_SETUP.md](./ADMIN_SETUP.md) for complete step-by-step instructions.**
