#!/bin/bash

# Development environment setup script for Pan-African web app
# Hot-reloading enabled for local development

# Function to handle errors
handle_error() {
    echo "Error: $1"
    exit 1
}

# Build dev image using Dockerfile.dev with development dependencies
echo "Building the development environment..."
docker build -t pan-african-app:dev -f Dockerfile.dev . || handle_error "Failed to build Docker image"

# Sync node_modules between Docker and local for IDE support
if [ ! -d "./node_modules" ]; then
    echo "node_modules not found locally. Creating a temporary container to copy node_modules..."
    
    # Create a temporary container without starting it
    docker create --name temp-container pan-african-app:dev || handle_error "Failed to create temporary container"
    
    # Copy node_modules from the container
    docker cp temp-container:/app/node_modules ./ || handle_error "Failed to copy node_modules"
    
    # Clean up the temporary container
    docker rm temp-container || handle_error "Failed to remove temporary container"
    
    echo "node_modules copied to local directory."
    
    # Verify node_modules was copied successfully
    if [ ! -d "./node_modules" ]; then
        handle_error "node_modules directory was not created successfully"
    fi
else
    echo "node_modules already exists locally."
fi

# Start dev container with:
# - Interactive terminal (-it)
# - Auto-cleanup (--rm)
# - Port 5173 for Vite
# - Volume mounts for hot-reloading
echo "Starting the development container..."
docker run -it --rm \
    -p 5173:5173 \
    -v "$(pwd):/app" \
    -v /app/node_modules \
    pan-african-app:dev