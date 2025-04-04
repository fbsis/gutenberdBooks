# Full Stack TypeScript Application

A full-stack application with React (Vite + TypeScript) frontend and Node.js (Express + TypeScript) backend.

# Prerequisites

- Docker
- Docker Compose
- Node.js 20+ (for local development without Docker)

## Quick Start

### Development Environment

Run the application with hot-reload:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

Access points:
- Frontend: http://localhost:5173
- Backend: http://localhost:4000

Features:
- Hot-reload for both frontend and backend
- Real-time file changes
- Development debugging capabilities

### Production Environment

Run the optimized production build:

```bash
docker-compose up --build
```

Access points:
- Frontend: http://localhost:80
- Backend: http://localhost:4000

Production features:
- Nginx server for frontend
- Optimized and minified assets
- Smaller Docker images
- Production-only dependencies

## Local Development (Without Docker)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

## Available Scripts

### Frontend

- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run preview`: Preview production build locally

### Backend

- `npm run dev`: Start development server
- `npm run build`: Compile TypeScript
- `npm start`: Start production server

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Nginx (production)

### Backend
- Node.js
- Express
- TypeScript

### DevOps
- Docker
- Docker Compose
- Nginx

## Environment Variables

Create `.env` files in frontend and backend folders if needed:

```env
# frontend/.env
VITE_API_URL=http://localhost:4000

# backend/.env
PORT=4000
```

## Troubleshooting

### Common Issues

1. **Ports in use**: Ensure ports 80, 4000, and 5173 are available
2. **Permissions**: Unix systems might require `sudo` for port 80
3. **Hot-reload issues**: Check WATCHPACK_POLLING in docker-compose.dev.yml

### Cleanup

Remove all containers and volumes:

```bash
# Development
docker-compose -f docker-compose.dev.yml down -v

# Production
docker-compose down -v
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.