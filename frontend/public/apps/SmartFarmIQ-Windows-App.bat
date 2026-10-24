@echo off
title Smart Farm IQ - Desktop App Launcher
color 0A
echo ========================================================
echo       SMART FARM IQ - AI AGRICULTURAL ASSISTANT
echo ========================================================
echo.
echo Launching Smart Farm IQ Standalone Desktop App...
echo.

set APP_URL=https://plant-care-ai-gules.vercel.app

set BROWSER=
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    set "BROWSER=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
) else if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
    set "BROWSER=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
) else if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    set "BROWSER=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
) else if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    set "BROWSER=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
)

if "%BROWSER%"=="" (
    echo [INFO] Opening default browser...
    start %APP_URL%
    exit /b
)

echo Creating Desktop App Shortcut on your Windows Desktop...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ws = New-Object -ComObject WScript.Shell; $d = [Environment]::GetFolderPath('Desktop'); $s = $ws.CreateShortcut([System.IO.Path]::Combine($d, 'Smart Farm IQ.lnk')); $s.TargetPath = '%BROWSER%'; $s.Arguments = '--app=%APP_URL% --window-size=1280,840'; $s.Description = 'Smart Farm IQ - AI Agricultural Platform'; $s.Save()"

echo.
echo [SUCCESS] Smart Farm IQ Desktop Shortcut created on your Desktop!
echo Launching standalone app window now...
start "" "%BROWSER%" --app=%APP_URL% --window-size=1280,840
timeout /t 3 >nul
exit
