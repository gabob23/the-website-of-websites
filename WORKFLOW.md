# Project Creation Workflow

This document outlines the exact workflow Claude will follow when you ask to create a new project.

## User Request Example

> "I want to create a Schengen travel day calculator"

## Automated Steps

### 1. Extract Project Information

From your request, Claude will extract:
- **Project name**: kebab-case version (e.g., `schengen-travel-calculator`)
- **Description**: Brief description of the project
- **Tech stack**: Usually Next.js unless specified otherwise

### 2. Create GitHub Repository

**Command:**
```bash
gh repo create <project-name> \
  --public \
  --description "<description>" \
  --clone
```

**What this does:**
- Creates a new public GitHub repository
- Adds the description
- Clones it locally to your machine
- Sets up git origin

**Alternative (using GitHub API):**
```bash
curl -X POST \
  -H "Authorization: token ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d '{
    "name": "<project-name>",
    "description": "<description>",
    "private": false,
    "auto_init": true
  }'
```

### 3. Initialize Project Locally

```bash
cd <project-name>
npx create-next-app@latest . --typescript --tailwind --app --use-npm
# Make initial commit
git add .
git commit -m "Initial commit: <project-name>"
git push origin main
```

### 4. Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
cd <project-name>
vercel --prod --yes
```

**Option B: Using Vercel API**
```bash
# Link GitHub repo to Vercel
curl -X POST \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  https://api.vercel.com/v9/projects \
  -d '{
    "name": "<project-name>",
    "framework": "nextjs",
    "gitRepository": {
      "type": "github",
      "repo": "<username>/<project-name>"
    }
  }'
```

### 5. Add Project to Dashboard

**Make API call to add project:**
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "Cookie: projects-auth=authenticated" \
  -d '{
    "name": "<Project Display Name>",
    "description": "<description>",
    "githubUrl": "https://github.com/<username>/<project-name>",
    "vercelUrl": "https://<project-name>.vercel.app",
    "status": "building"
  }'
```

### 6. Confirm Completion

Claude will provide you with:
- Link to GitHub repository
- Link to Vercel deployment
- Link to view the project on your dashboard
- Status of the deployment

## Example Complete Workflow

```bash
# 1. Create GitHub repo
gh repo create schengen-travel-calculator \
  --public \
  --description "Calculate remaining days in Schengen area" \
  --clone

# 2. Initialize Next.js project
cd schengen-travel-calculator
npx create-next-app@latest . --typescript --tailwind --app --use-npm --yes

# 3. Initial commit
git add .
git commit -m "Initial commit: Schengen travel calculator"
git push origin main

# 4. Deploy to Vercel
vercel --prod --yes

# 5. Get the URLs (these will be output from the commands above)
GITHUB_URL="https://github.com/yourusername/schengen-travel-calculator"
VERCEL_URL="https://schengen-travel-calculator.vercel.app"

# 6. Add to dashboard (Claude will do this via the API or by editing the JSON directly)
# Edit data/projects.json to add:
{
  "id": "1737227167000",
  "name": "Schengen Travel Calculator",
  "description": "Calculate remaining days in Schengen area",
  "githubUrl": "https://github.com/yourusername/schengen-travel-calculator",
  "vercelUrl": "https://schengen-travel-calculator.vercel.app",
  "status": "running",
  "createdAt": "2024-01-18T12:00:00.000Z"
}
```

## Status Indicators

- **building**: Project is being deployed on Vercel
- **running**: Project is live and accessible
- **stopped**: Project deployment is paused
- **error**: Deployment failed or project has errors

Claude will check the Vercel deployment status and update accordingly.

## Requirements

Before using this workflow, ensure:

1. **GitHub CLI is installed**
   ```bash
   brew install gh
   gh auth login
   ```

2. **Vercel CLI is installed**
   ```bash
   npm install -g vercel
   vercel login
   ```

3. **Environment variables are set** (in `.env.local`)
   - `GITHUB_TOKEN`
   - `VERCEL_TOKEN`
   - `PROJECTS_PASSWORD`

## Troubleshooting

### GitHub repo creation fails
- Check that `gh` is authenticated: `gh auth status`
- Ensure GitHub token has `repo` scope

### Vercel deployment fails
- Check Vercel login: `vercel whoami`
- Ensure project doesn't already exist on Vercel

### Project doesn't appear on dashboard
- Check that the API call succeeded
- Verify `data/projects.json` was updated
- Refresh the projects page

## Notes for Claude

When a user asks to create a project:

1. **Extract the project name** from their request (convert to kebab-case)
2. **Ask for clarification** if the project description is unclear
3. **Execute the commands** in sequence
4. **Handle errors** gracefully and report back to the user
5. **Update the dashboard** by either:
   - Making an API call to `/api/projects`, OR
   - Directly editing `data/projects.json`
6. **Provide confirmation** with all links

The workflow should be seamless and require minimal user intervention.
