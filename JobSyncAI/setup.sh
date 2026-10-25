#!/usr/bin/env zsh
set -e

echo "Starting JobSync AI Automated Setup..."

# 1. Install Pixi if not already on the machine
if ! command -v pixi &> /dev/null; then
    echo "Installing Pixi..."
    curl -fsSL https://pixi.sh/install.sh | bash
    export PATH="$HOME/.pixi/bin:$PATH"
    if ! grep -q ".pixi/bin" ~/.zshrc; then
        echo 'export PATH="$HOME/.pixi/bin:$PATH"' >> ~/.zshrc
    fi
else
    echo "Pixi is already installed."
fi

# 2. Install Node.js globally via Pixi if Node isn't on the machine
if ! command -v npm &> /dev/null; then
    echo "Node/npm not found. Installing Node.js via Pixi..."
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
    cat <<EOT >> .env
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
    pixi add python=3.11
    pixi add --pypi fastapi uvicorn pydantic openai pypdf python-multipart python-dotenv httpx pydantic-settings
else
    # If pixi.toml already exists in Git, this installs everything in one shot!
    pixi install
fi

# Add a shortcut task so you only ever have to type 'pixi run dev'
pixi task add dev "uvicorn app.main:app --reload --port 8000" 2>/dev/null || true

if [ ! -f .env ]; then
    echo "Creating backend/.env template..."
    cat <<EOT >> .env
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