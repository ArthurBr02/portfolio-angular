#!/bin/bash
# start.sh - Dev convenience script to start both frontend and backend

echo "Starting Portfolio V2 (Dev Mode)..."

# Check if backend deps are installed
if [ ! -d "./backend/node_modules" ]; then
  echo "Installing backend dependencies..."
  cd backend && npm install && cd ..
fi

# Start backend in background
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Start frontend (we haven't scaffolded it yet, but this will work later)
if [ -d "./frontend" ]; then
    if [ ! -d "./frontend/node_modules" ]; then
        echo "Installing frontend dependencies..."
        cd frontend && npm install && cd ..
    fi
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
else
    echo "Frontend not yet initialized. Skipping frontend start."
fi

# Trap SIGINT to kill both processes
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" SIGINT

echo "Press Ctrl+C to stop both servers."
wait
