@echo off
cd /d %~dp0 REM Change to the script's directory

echo Adding all files...
git add .

echo Enter commit message:
set /p commitMessage=
git commit -m "%commitMessage%"

echo Pushing to repository...
git push origin main

echo Done!
pause