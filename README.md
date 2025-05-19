# Next.js + ASP.NET Core Aspire Template

This project demonstrates a modern web application using Next.js for the frontend and ASP.NET Core with .NET Aspire for the backend.

## Project Structure

```
.
├── backend/
│   ├── ApiService/           # ASP.NET Core Web API
│   └── AspireApp/           # .NET Aspire orchestration
│       ├── AspireApp.AppHost/
│       ├── AspireApp.ApiService/
│       ├── AspireApp.ServiceDefaults/
│       └── AspireApp.Web/ -> Removed as not needed for NextJS
└── frontend/                # Next.js application
    ├── src/
    │   ├── app/            # App Router pages
    │   ├── components/     # React components
    │   └── lib/           # Shared utilities
    └── public/            # Static assets
```

## Prerequisites

- .NET 8 SDK
- Node.js 18+ and npm
- Docker Desktop
- Azure CLI (for deployment)

## Getting Started

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend/AspireApp
   ```

2. Run the .NET Aspire application:
   ```bash
   dotnet run
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Features

- **Backend**
  - ASP.NET Core Web API with .NET 8
  - .NET Aspire for microservices orchestration
  - OpenTelemetry integration
  - Azure Container Apps deployment

- **Frontend**
  - Next.js 13+ with App Router
  - TypeScript
  - Tailwind CSS
  - TanStack Query for data fetching
  - Jotai for state management

## Development

- Backend API runs on `https://localhost:7001`
- Frontend development server runs on `http://localhost:3000`

## Deployment

The project is configured for deployment to Azure Container Apps using Azure DevOps pipelines. See the respective pipeline configurations in:

- `backend/azure-pipelines.yml`
- `frontend/azure-pipelines.yml`

## License

MIT 