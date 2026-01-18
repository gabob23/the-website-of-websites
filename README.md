# Website of Websites

A centralized dashboard to manage all your web projects. This application provides a password-protected interface to track projects deployed on Vercel with their GitHub repositories.

## Features

- Password-protected projects dashboard
- Display all projects with status indicators (running, stopped, building, error)
- Links to GitHub repositories and live Vercel deployments
- Automated workflow for creating new projects

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Password for accessing the projects dashboard
PROJECTS_PASSWORD=your_secure_password

# GitHub Personal Access Token (for creating repos)
# Create at: https://github.com/settings/tokens
# Required scopes: repo (full control of private repositories)
GITHUB_TOKEN=your_github_token_here

# Vercel Token (for deploying projects)
# Create at: https://vercel.com/account/tokens
VERCEL_TOKEN=your_vercel_token_here
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the homepage.

Navigate to [http://localhost:3000/projects](http://localhost:3000/projects) to access the projects dashboard.

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/          # Authentication API
│   │   └── projects/      # Projects CRUD API
│   ├── projects/          # Projects dashboard page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── data/
│   └── projects.json      # Projects database (JSON file)
├── .env.local             # Environment variables (not in git)
└── README.md              # This file
```

## Workflow: Adding a New Project

When you want to create a new project, follow this workflow:

### Step 1: Tell Claude What You Want to Build

Simply tell Claude (me!) the name and description of your project. For example:

> "I want to create a Schengen travel day calculator"

### Step 2: Claude Will Execute the Following Automated Workflow

1. **Create GitHub Repository**
   - Create a new repository on GitHub with the project name
   - Initialize with README
   - Set up basic project structure

2. **Deploy to Vercel**
   - Create a new Vercel project
   - Link it to the GitHub repository
   - Configure automatic deployments
   - Get the deployment URL

3. **Add to Projects Dashboard**
   - Add the project to the `data/projects.json` file
   - Include:
     - Project name
     - Description
     - GitHub repository URL
     - Vercel deployment URL
     - Initial status (building/running)
     - Creation timestamp

### Step 3: View Your Project

Once the workflow is complete:
- The project will appear on your dashboard at `/projects`
- You can click through to GitHub or the live Vercel deployment
- The status indicator will show if the project is running

## Manual Commands for the Workflow

If you need to run these commands manually (Claude typically handles this):

### Create GitHub Repository

```bash
# Using GitHub CLI
gh repo create <project-name> --public --description "<description>"

# Or using curl with GitHub API
curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d '{"name":"<project-name>","description":"<description>","private":false}'
```

### Deploy to Vercel

```bash
# Using Vercel CLI
vercel --name <project-name> --prod

# Or create a project programmatically
curl -X POST \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  https://api.vercel.com/v9/projects \
  -d '{"name":"<project-name>","framework":"nextjs"}'
```

### Add to Dashboard

Make a POST request to your local API:

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -b "projects-auth=authenticated" \
  -d '{
    "name": "Project Name",
    "description": "Project description",
    "githubUrl": "https://github.com/username/repo",
    "vercelUrl": "https://project.vercel.app",
    "status": "running"
  }'
```

## Security

- The dashboard is password-protected using HTTP-only cookies
- Authentication is required for all API endpoints
- Passwords and tokens are stored in environment variables (not in git)
- Session expires after 7 days

## API Endpoints

### POST /api/auth
Authenticate with password

**Request:**
```json
{
  "password": "your_password"
}
```

**Response:**
```json
{
  "success": true
}
```

### GET /api/projects
Get all projects (requires authentication)

**Response:**
```json
{
  "projects": [
    {
      "id": "1234567890",
      "name": "Project Name",
      "description": "Description",
      "githubUrl": "https://github.com/...",
      "vercelUrl": "https://....vercel.app",
      "status": "running",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST /api/projects
Add a new project (requires authentication)

**Request:**
```json
{
  "name": "Project Name",
  "description": "Description",
  "githubUrl": "https://github.com/...",
  "vercelUrl": "https://....vercel.app",
  "status": "running"
}
```

## Development

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## License

MIT
