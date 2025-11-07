@echo off
echo ========================================
echo   Starting AI Chatbot Server
echo ========================================
echo.

cd server

if not exist "node_modules" (
    echo Installing server dependencies...
    call npm install
    echo.
)

echo Starting chatbot server on port 3001...
echo.
call npm start


