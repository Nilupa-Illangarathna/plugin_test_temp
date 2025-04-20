#!/bin/bash

# Define project root directory
PROJECT_DIR="$(pwd)"

echo "Setting up the Accessibility Plugin..."

# Step 1: Install dependencies
if [ -f "package.json" ]; then
    echo "Installing dependencies..."
    npm install
else
    echo "Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Step 2: Build the plugin
echo "Building the plugin..."
npm run build

# Step 3: Start Live Server
echo "Starting Live Server..."
if command -v live-server >/dev/null 2>&1; then
    live-server --open=index.html
else
    echo "Error: live-server is not installed. Install it globally using:"
    echo "npm install -g live-server"
    exit 1
fi

echo "Setup complete. The plugin is now running in your browser."
