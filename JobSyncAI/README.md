# JobSync AI

## The Mission
JobSync AI is a secure, full-stack applicant tracking web application designed to help developers manage their job hunt. Phase 1 (MVP) focuses on secure client-side routing and database ingestion. Phase 2 introduces a Python microservice utilizing Large Language Models (LLMs) to analyze resumes against saved job descriptions. Phase 3 targets enterprise-level SaaS scalability, integrating Stripe for premium tier access and Multi-Factor Authentication (MFA) for enhanced security.

## Tech Stack
- **Frontend:** React, TypeScript, Vite
- **Styling & UI:** Tailwind CSS, shadcn/ui
- **Forms & Validation:** React Hook Form, Zod
- **Backend / Auth:** Supabase (PostgreSQL)
- **AI Engine:** Python 3.11, FastAPI, OpenAI API, Pixi (Package & Environment Manager)

## Current Features (V1 Roadmap)
- [x] Secure User Authentication (Sign up, Log in, Log out)
- [x] Protected Client-Side Routing (React Router)
- [x] User Dashboard with interactive Job Cards
- [ ] Form Validation for manual job ingestion
- [ ] Profile Settings to store Master Resume data
- [ ] AI Match Score and Keyword Gap Analysis
- [ ] Cloud Deployment (Frontend on Vercel, Python API on Render)
- [ ] Custom Domain Configuration

---

## Getting Started

### Prerequisites
- A Supabase project instance
- An OpenAI API key
- *Note: Pixi, Python 3.11, and Node.js will be installed automatically if you use the automated setup script.*

### Quick Start (Automated Setup)
1. Clone the repository and navigate into the project:
   ```bash
   git clone https://github.com/yourusername/JobSyncAI.git
   cd JobSyncAI
   ```
2. Make the bootstrap script executable and run it:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
   *(This automatically installs Pixi, Node.js, frontend `npm` packages, the isolated Python 3.11 backend environment, and generates `.env` templates).*
3. Add your API keys to the generated `.env` files:
   - **Frontend (`.env` in root):**
     ```env
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
   - **Backend (`backend/.env`):**
     ```env
     OPENAI_API_KEY=your_openai_api_key
     ```

### Manual Installation (Alternative)
1. Clone the repository and navigate into the project:
   ```bash
   git clone https://github.com/yourusername/JobSyncAI.git
   cd JobSyncAI
   ```
2. Install frontend dependencies in the root directory:
   ```bash
   npm install
   ```
3. Set up the Python backend environment using Pixi:
   ```bash
   cd backend
   pixi install
   cd ..
   ```
4. Create a `.env` file in the root directory for the frontend:
   ```env
   VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
5. Create a `.env` file inside the `backend/` directory for the API:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   ```

---

## Developer Commands

### Frontend (React/Vite)
- **Start the development server:**
  ```bash
  npm run dev
  ```
- **Run unit tests:**
  ```bash
  npm run test
  ```

### Backend (Python/FastAPI via Pixi)
- **Start the local API server:**
  ```bash
  cd backend
  pixi run uvicorn app.main:app --reload --port 8000
  ```
  *(Or simply run `pixi run dev` if you configured the shortcut via `./setup.sh`).*

  > **Note:** If you ever get a CORS or `ERR_CONNECTION_RESET` error, press `Ctrl + C` in the terminal to kill the zombie server, and run the command again to start it fresh.

- **Add a new Python package:**
  ```bash
  cd backend
  pixi add --pypi <package-name>
  ```

- **Test the API manually:**
  Open `http://127.0.0.1:8000/docs` in your browser to view the interactive Swagger UI and test your endpoints.