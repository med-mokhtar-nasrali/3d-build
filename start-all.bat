@echo off
echo ========================================
echo   Starting Real Estate Website with AI Chatbot
echo ========================================
echo.

:: Install server dependencies if needed
cd server
if not exist "node_modules" (
    echo Installing server dependencies...
    call npm install
    echo.
)

:: Start server in new window
start "Chatbot Server" cmd /k "npm start"
cd ..

:: Install frontend dependencies if needed
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
    echo.
)

:: Wait a moment for server to start
timeout /t 3 /nobreak >nul

:: Start frontend
echo.
echo Starting React frontend...
echo.
call npm run dev


