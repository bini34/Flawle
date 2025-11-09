#!/usr/bin/env bash

# Setup helper for development (Linux/macOS)
# On Windows use the corresponding commands or WSL.

echo "1) Create Python venv and install backend deps"
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r backend/requirements.txt

echo "2) Install web deps"
cd web || exit
npm install --legacy-peer-deps || true

echo "3) (Optional) Open mobile in Flutter"
# flutter pub get

echo "Done. Edit .env from .env.example and run services."
