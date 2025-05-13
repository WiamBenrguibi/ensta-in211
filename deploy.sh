#!/bin/bash

echo " Build du front..."
cd frontend
npm run build

echo " Copie des fichiers buildés dans le dossier public du backend..."
rm -rf ../backend/public/*
cp -r build/* ../backend/public/

echo " Déploiement sur Vercel..."
cd .. || exit 1
cmd.exe /c "vercel deploy --prod"

