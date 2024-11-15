# Pan-African Web Application

Modern web application built with React (Vite), Redux Toolkit, React Router, and shadcn/ui components. Features both
Docker and local development options.

## Prerequisites

- Node.js v18+
- npm v9+
- Docker (for containerized development)

## Installation

1. Clone the repository:

```bash
git clone https://gitlab.com/pacifiquenyiringango1998/panafrican-admin-front.git
```

2. Navigate to the project directory:

```bash
cd panafrican-admin-front
```

## Quick Start

Choose your preferred development method:

### Docker Development (Recommended)

1. Start development environment:

```bash
npm run docker:dev
```

or directly:

```bash
./start-dev.sh
```

This will:

- Build the development Docker image
- Copy node_modules to local directory (if needed)
- Start development server with hot-reload
- Access the application at http://localhost:5173

2. Additional Docker commands:

```bash
docker build -t pan-african-app:dev -f Dockerfile.dev .
```

```bash
docker stop $(docker ps -q --filter ancestor=pan-african-app:dev)
```

```bash
docker rmi pan-african-app:dev
```

### Local Development

1. Install dependencies:

```bash
npm install
```

2. Development Commands:

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run preview
```

```bash
npm run lint
```

```bash
npm run format
```

3. Access the application:

- Development: http://localhost:5173
- Production preview: http://localhost:4173

### Production Deployment

1. Deploy using Docker:

```bash
npm run docker:prod
```

or directly:

```bash
./start-prod.sh
```

2. Additional production commands:

```bash
docker build -t pan-african-app:prod -f Dockerfile.prod .
```

```bash
docker run -d --name pan-african-prod-container \
   --restart unless-stopped \
   -p 80:80 \
   pan-african-app:prod
```

```bash
docker stop pan-african-prod-container
```

```bash
docker rm pan-african-prod-container
```

```bash
docker rmi pan-african-app:prod
```

## Available Scripts

### NPM Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx",
    "format": "prettier \"src/**/*.{js,ts,tsx}\" --write",
    "docker:dev": "./start-dev.sh",
    "docker:prod": "./start-prod.sh"
  }
}
```

## Troubleshooting

### Docker Issues

```bash
chmod +x ./start-dev.sh ./start-prod.sh
```

```bash
sudo lsof -i :5173
```

```bash
sudo kill -9 $(sudo lsof -t -i:5173)
```

```bash
rm -rf node_modules
npm run docker:dev
```

### Local Development Issues

```bash
npm cache clean --force
```

```bash
rm -rf node_modules package-lock.json
npm install
```

```bash
npm run build -- --force
```

## Project Structure

```
panafrican-admin-front/
├── src/
│   ├── components/     # UI components
│   ├── features/       # Redux slices
│   ├── pages/         # Route components
│   ├── store/         # Redux store
│   └── App.tsx        # Main component
├── Dockerfile.dev     # Dev container config
├── Dockerfile.prod    # Prod container config
├── start-dev.sh      # Dev environment script
├── start-prod.sh     # Prod deployment script
└── package.json      # Project dependencies
```

## Environment Variables

Create `.env` file in project root:

```env
VITE_APP_BASE_API_URL=your_api_url
```

## Tech Stack

- React 18.3.1
- Vite 5.4.9
- Redux Toolkit 2.3.0
- React Router 6.27.0
- TypeScript 5.6.2
- shadcn/ui
- Tailwind CSS 3.4.14
