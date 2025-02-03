# 🚀 Flow Builder - Visual Workflow Automation

A powerful visual workflow automation platform built with Next.js, Prisma, and PostgreSQL that lets you create and schedule automated workflows with an intuitive drag-and-drop interface.

![Flow Builder Demo](https://via.placeholder.com/800x400?text=Flow+Builder+Demo)

## ✨ Features

- 🎨 **Visual Flow Builder** - Intuitive drag-and-drop interface to design workflows
- ⏰ **Scheduling** - Schedule workflows with cron expressions
- 🔐 **Authentication** - Secure GitHub OAuth integration
- 📊 **Project Management** - Create and manage multiple workflow projects
- 🌐 **Real-time Updates** - Live workflow execution status
- 🎯 **Custom Nodes** - Extensible node system for various actions

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 13+ | Frontend & Backend Framework |
| PostgreSQL | Database |
| Prisma | ORM & Database Management |
| NextAuth.js | Authentication |
| React Flow | Visual Flow Editor |
| TypeScript | Type Safety |
| Supabase | Database Hosting |

## 🏗️ System Architecture
The Flow Builder application follows a modern full-stack architecture:

### Frontend Layer
- **Next.js Pages & Components**: Handles the user interface and client-side logic
- **React Flow Integration**: Powers the visual workflow builder interface
- **Authentication UI**: Manages login/signup flows via GitHub OAuth

### API Layer (Next.js API Routes)
- **Project Management**: `/api/projects` endpoints for CRUD operations
- **Authentication**: NextAuth.js integration with GitHub provider
- **Middleware**: Route protection and project access validation

### Database Layer
- **PostgreSQL Database**: Hosted on Supabase
- **Prisma ORM**: Handles database operations with type safety
- **Schema Design**:
  - User model with OAuth account linking
  - Project model for workflow storage
  - ScheduleConfig model for workflow timing
  - Session management for authentication

### Data Flow
1. User authenticates via GitHub OAuth
2. Protected routes ensure authenticated access
3. Frontend communicates with API routes
4. API routes interact with database via Prisma
5. Real-time updates flow back to the UI

## 👥 Collaborators

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/ashishk15678">
        <img src="https://avatars.githubusercontent.com/u/147980956?v=4&size=64"
         width="50px;" alt="Ashish Kumar"/>
        <br />
        <sub><b>Ashish Kumar</b></sub>
      </a>
      <br />
    </td>
  </tr>
</table>

