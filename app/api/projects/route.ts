import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const projectsFilePath = path.join(process.cwd(), 'data', 'projects.json');

interface Project {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  vercelUrl: string;
  status: 'running' | 'stopped' | 'building' | 'error';
  createdAt: string;
}

interface ProjectsData {
  projects: Project[];
}

function readProjects(): ProjectsData {
  try {
    const data = fs.readFileSync(projectsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { projects: [] };
  }
}

function writeProjects(data: ProjectsData) {
  fs.writeFileSync(projectsFilePath, JSON.stringify(data, null, 2));
}

export async function GET(request: NextRequest) {
  const auth = request.cookies.get('projects-auth');

  if (auth?.value !== 'authenticated') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const data = readProjects();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const auth = request.cookies.get('projects-auth');

  if (auth?.value !== 'authenticated') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const project: Omit<Project, 'id' | 'createdAt'> = await request.json();
    const data = readProjects();

    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    data.projects.push(newProject);
    writeProjects(data);

    return NextResponse.json({ success: true, project: newProject });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
