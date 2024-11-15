#!/bin/bash

# Production deployment script for Pan-African web app
# Run with sudo if permission errors occur

# Build production Docker image from optimized Dockerfile.prod
echo "Building production Docker image..."
docker build -t pan-african-app:prod -f Dockerfile.prod .

# Cleanup: Stop/remove existing container to avoid port conflicts
echo "Stopping any existing production container..."
docker stop pan-african-prod-container 2>/dev/null || true
docker rm pan-african-prod-container 2>/dev/null || true

# Deploy container:
# - Detached mode (-d)
# - Auto-restart
# - Port 80 for HTTP
echo "Starting the production container..."
docker run -d --name pan-african-prod-container \
   --restart unless-stopped \
   -p 80:80 \
   pan-african-app:prod

echo "Production container started. Access the application at http://localhost"