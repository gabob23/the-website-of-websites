# Dashboard Guide - Website of Websites

## What This Is

This is your centralized projects dashboard - a password-protected web app that tracks all your side projects in one place. It shows all your web apps with their GitHub repos, live Vercel deployments, and status indicators.

## Live URLs

- **Dashboard**: https://the-website-of-websites.vercel.app/projects
- **Password**: `changeme` (set in Vercel environment variables)
- **GitHub Repo**: https://github.com/gabob23/the-website-of-websites

## How to Add New Projects

### The Automated Workflow

Just tell Claude: "I want to create a [project name/description]"

For example:
> "I want to create a Schengen travel day calculator"

Claude will automatically:

1. **Git Setup**
   - Initialize git if needed
   - Commit all changes
   - Create `.gitignore` if needed

2. **GitHub**
   - Create a new public repository
   - Push your code
   - Set up the remote connection

3. **Vercel**
   - Deploy to production
   - Connect to GitHub for auto-deployments
   - Get the live URL

4. **Dashboard**
   - Add project to `data/projects.json`
   - Include GitHub and Vercel links
   - Set status to "running"
   - Push changes to update dashboard

### What You Get

Each project on the dashboard shows:
- Project name and description
- Status indicator (running/stopped/building/error)
- Link to GitHub repository
- Link to live Vercel deployment
- Creation date

## Manual Project Addition

If you need to manually add a project to the dashboard:

1. Edit `/Users/ggauffre/code/the-website-of-websites/data/projects.json`
2. Add entry with this format:
```json
{
  "id": "unique-timestamp-id",
  "name": "Project Name",
  "description": "Short description of what this project does",
  "githubUrl": "https://github.com/gabob23/repo-name",
  "vercelUrl": "https://project-name.vercel.app",
  "status": "running",
  "createdAt": "2026-01-18T22:00:00.000Z"
}
```
3. Commit and push to GitHub (auto-deploys to Vercel)

## Changing the Password

The password is stored in Vercel environment variables, not in code.

**To change it:**
1. Go to: https://vercel.com/gabriels-projects-ca7fd667/the-website-of-websites/settings/environment-variables
2. Edit `PROJECTS_PASSWORD`
3. Redeploy the site

## Project Structure

```
the-website-of-websites/
├── app/
│   ├── api/
│   │   ├── auth/route.ts          # Password authentication
│   │   └── projects/route.ts      # Projects CRUD API
│   ├── projects/page.tsx          # Dashboard UI
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Homepage
├── data/
│   └── projects.json              # Projects database (tracked in git)
└── DASHBOARD_GUIDE.md             # This file
```

## Important Notes

- **Projects data is in Git**: `data/projects.json` is tracked in the repo, so all your projects are backed up
- **Auto-deployment**: Any push to `main` branch automatically deploys to Vercel
- **Authentication**: Uses HTTP-only cookies, session lasts 7 days
- **Status updates**: Status indicators are manual - update them in `projects.json` as needed

## Current Projects

1. **Schengen Tax & Residency Calculator**
   - GitHub: https://github.com/gabob23/schengen-tax-residency-calculator
   - Live: https://schengen-tax-residency-calculator.vercel.app
   - Status: Running

## Environment Variables (Set in Vercel)

Required for the dashboard to work:
- `PROJECTS_PASSWORD` - Dashboard access password (currently: "changeme")

Optional for automated workflows:
- `GITHUB_TOKEN` - For creating repos programmatically
- `VERCEL_TOKEN` - For deploying projects programmatically

## Workflow Example

**You say:** "Add my expense tracker app"

**Claude does:**
```bash
# 1. Navigate to your project folder
cd /path/to/expense-tracker

# 2. Git setup
git init
git add .
git commit -m "Initial commit"

# 3. Create GitHub repo and push
gh repo create expense-tracker --public --source=. --push

# 4. Deploy to Vercel
vercel --prod --yes

# 5. Update dashboard
# Edits data/projects.json with new project
git add data/projects.json
git commit -m "Add expense tracker to dashboard"
git push
```

**Result:** Your project appears on the dashboard in ~30 seconds with all links working.

## Troubleshooting

**Dashboard shows empty:**
- Make sure you're logged in with the password
- Hard refresh the page (Cmd+Shift+R / Ctrl+Shift+R)
- Check you're on the production URL, not localhost

**Can't log in:**
- Check the password in Vercel environment variables
- Make sure cookies are enabled
- Try clearing browser cache

**Project not showing after adding:**
- Wait 30-60 seconds for Vercel to redeploy
- Check that `data/projects.json` was committed and pushed
- Verify the deployment succeeded on Vercel

## Quick Commands

```bash
# Run locally
cd /Users/ggauffre/code/the-website-of-websites
npm run dev
# Visit http://localhost:3000/projects

# Deploy manually
vercel --prod

# Check deployment status
vercel ls the-website-of-websites

# View logs
vercel logs the-website-of-websites
```

## Tips

- Keep project descriptions short (1-2 sentences)
- Update status indicators when projects go down
- Use lowercase-with-dashes for repo names
- This dashboard itself is deployed, so you can access it from anywhere
