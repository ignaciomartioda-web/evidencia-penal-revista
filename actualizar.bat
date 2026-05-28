@echo off
echo ========================================
echo   ACTUALIZANDO CAMPAÑA FERRARO
echo ========================================
echo.

git add .
git commit -m "Mejoras en el diseno y fluidos dinámicos"
git push -u origin main

echo.
echo ========================================
echo   ¡EXITO! Tu web se está actualizando...
echo   Revisa el link en 30 segundos.
echo ========================================
pause
