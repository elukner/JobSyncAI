# JobSync AI

## The Mission
JobSync AI is a secure, full-stack applicant tracking web application designed to help developers manage their job hunt. Phase 1 (MVP) focuses on secure client-side routing and database ingestion. Phase 2 introduces a Python microservice utilizing Large Language Models (LLMs) to analyze resumes against saved job descriptions. Phase 3 targets enterprise-level SaaS scalability, integrating Stripe for premium tier access and Multi-Factor Authentication (MFA) for enhanced security.

## Tech Stack
* **Frontend:** React, TypeScript, Vite
* **Styling & UI:** Tailwind CSS, shadcn/ui
* **Forms & Validation:** React Hook Form, Zod
* **Backend / Auth:** Supabase (PostgreSQL)
* **AI Engine (Upcoming):** Python, FastAPI, OpenAI API

## Current Features (V1 Roadmap)
- [x] Secure User Authentication (Sign up, Log in, Log out)
- [x] Protected Client-Side Routing (React Router)
- [ ] User Dashboard with interactive Job Cards
- [ ] Form Validation for manual job ingestion
- [ ] Profile Settings to store Master Resume data
- [ ] AI Match Score and Keyword Gap Analysis
- [ ] Cloud Deployment (Frontend on Vercel, Python API on Render)
- [ ] Custom Domain Configuration

## Getting Started

### Prerequisites
* Node.js installed
* A Supabase project instance

### Installation
1. Clone the repository:
   `git clone https://github.com/yourusername/JobSyncAI.git`
2. Install dependencies:
   `npm install`
3. Set up your environment variables (Create a `.env` file in the root):
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
4. Start the development server:
   `npm run dev`
