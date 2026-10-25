#!/usr/bin/env bash
set -e

echo "Starting JobSync AI Cross-Platform Setup..."

# Detect OS (macOS/Linux vs Windows Git Bash)
OS_TYPE="$(uname -s)"

# 1. Install Pixi if not already on the machine
export PATH="$HOME/.pixi/bin:$PATH"

if ! command -v pixi &> /dev/null; then
    echo "Installing Pixi..."
    if [[ "$OS_TYPE" == MINGW* || "$OS_TYPE" == MSYS* || "$OS_TYPE" == CYGWIN* ]]; then
        echo "Windows detected! Installing Pixi via PowerShell..."
        powershell.exe -ExecutionPolicy ByPass -c "irm -useb https://pixi.sh/install.ps1 | iex"
        export PATH="$USERPROFILE/.pixi/bin:$HOME/.pixi/bin:$PATH"
    else
        echo "macOS/Linux detected! Installing Pixi..."
        curl -fsSL https://pixi.sh/install.sh | bash
        export PATH="$HOME/.pixi/bin:$PATH"
    fi
else
    echo "Pixi is already installed ($(pixi --version)). Checking for updates..."
    pixi self-update || true
fi

# 2. Check / Install Node.js & npm
if ! command -v npm &> /dev/null; then
    echo "Node/npm not found. Installing Node.js globally via Pixi..."
    pixi global install nodejs
    export PATH="$HOME/.pixi/bin:$PATH"
else
    echo "Node ($(node -v)) and npm ($(npm -v)) are already installed."
fi

# 3. Install Frontend Dependencies & Create Frontend .env Template
echo "Installing frontend npm dependencies..."
npm install

if [ ! -f .env ]; then
    echo "Creating root .env template..."
    cat <<EOT > .env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
EOT
    echo "Created root .env! Remember to paste your real Supabase keys."
fi

# 4. Set Up Backend Pixi Environment & Create Backend .env Template
echo "Setting up Python backend with Pixi..."
cd backend

if [ ! -f pixi.toml ]; then
    pixi init
    pixi project platform add win-64 osx-arm64 osx-64 linux-64 || true
    pixi add python=3.11
    pixi add --pypi fastapi uvicorn pydantic openai pypdf python-multipart python-dotenv httpx pydantic-settings
else
    # Ensure current OS platform is supported in pixi.toml before installing
    if [[ "$OS_TYPE" == MINGW* || "$OS_TYPE" == MSYS* || "$OS_TYPE" == CYGWIN* ]]; then
        pixi project platform add win-64 2>/dev/null || true
    fi
    pixi install
fi

# Add a shortcut task so you only ever have to type 'pixi run dev'
pixi task add dev "uvicorn app.main:app --reload --port 8000" 2>/dev/null || true

if [ ! -f .env ]; then
    echo "Creating backend/.env template..."
    cat <<EOT > .env
OPENAI_API_KEY=your_openai_api_key_here
EOT
    echo "Created backend/.env! Remember to paste your real OpenAI key."
fi

cd ..

echo ""
echo "===================================================="
echo "Setup Complete!"
echo "1. Make sure your keys are pasted in .env and backend/.env"
echo "2. Start Frontend: npm run dev"
echo "3. Start Backend:  cd backend && pixi run dev"
echo "===================================================="