# JobSync AI - Manual QA Checklist

*Instructions: Run through the relevant tests in this document before merging any feature branch into `main` to ensure no regressions have occurred.*

## 1. Authentication (Ticket #1)
- [ ] **Successful Login:** Given valid credentials, When I click "Sign In", Then I am redirected to `/dashboard`.
- [ ] **Logout Flow:** Given I am logged in, When I click "Logout", Then my session ends and I am redirected to `/login`.
- [ ] **Successful Sign Up:** Given I am on the `/signup` page, When I enter a new valid email and password and click "Sign Up", Then my account is created in Supabase and I am redirected to `/dashboard`.
- [ ] **Duplicate Account:** Given I am on the `/signup` page, When I try to sign up with an email that is already registered, Then I see an error message and I am prevented from accessing the `/dashboard`.

## 2. Routing & Navigation (Ticket #16)
- [ ] **The Bouncer (Protected Routes):** Given I am logged out, When I manually type `/dashboard` into the URL bar, Then I am immediately redirected to `/login`.
- [ ] **The Reverse Bouncer:** Given I am already logged in, When I manually navigate to `/login`, Then I am redirected back to `/dashboard`.
- [ ] **SPA Navigation:** When I click between "Dashboard" and "Settings" in the sidebar, Then the URL updates instantly without the page flashing or doing a full browser reload.
- [ ] **Active State:** When I am on `/dashboard`, Then the Dashboard link is visually highlighted in the sidebar.

## 3. Dashboard UI & Shadcn (Tickets #3 & #22)
- [ ] **Responsive Grid:** Given I am viewing the dashboard, When I resize the browser from desktop to mobile width, Then the job cards transition from a multi-column grid to a single stacked column.
- [ ] **Card Rendering:** Given I have jobs in the database, When I view the dashboard, Then the mock job cards render correctly with Shadcn styling and layout.

## 4. Job Form & Validation (Tickets #2 & #17)
- [ ] **The "Happy Path" Submission:** Given I fill out all fields correctly, When I click "Save", Then the sheet closes, the form resets to empty, and a new row appears in the Supabase jobs table.
- [ ] **Minimalist Entry:** Given I only fill out Company and Title (leaving URL and Description blank), When I click "Save", Then the job is successfully created without errors.
- [ ] **The Enum Check:** When I select "Interviewing" from the status dropdown, Then the record in Supabase shows exactly Interviewing (not lowercase or a default).
- [ ] **Persistence Check:** When I refresh the browser after a successful save, Then the form remains empty (confirming the reset() worked) but the network tab shows the new job was fetched.
- [ ] **Required Fields Blocker:** Given I am adding a new job, When I leave required fields empty and submit, Then the form blocks submission.
- [ ] **URL Validation:** Given I am adding a new job, When I type an invalid URL, Then a Zod error message appears.

## 5. UI Polishing & UX
- [ ] **The "Esc" Key:** When the Add Job sheet is open, If I press the Esc key or click the outside overlay, Then the sheet closes without submitting data.
- [ ] **Multi-line Text:** When I paste a long job description into the textarea, Then the box remains readable and doesn't break the layout of the sheet.

## 6. Add Realtime Dashboard Sync & UI Polish (Ticket #34)
- [ ] **The Realtime Test:** Given I am on the `/dashboard`, When I add a new job via the AddJobSheet, Then the new job card appears at the very top of the list instantly without a browser refresh.
- [ ] **The History Test:** Given I have added new jobs, When I manually refresh the browser (Cmd+R), Then all of my jobs (including the new ones) load successfully from the database.
- [ ] **The Date Polish Test:** Given a job card is displayed, Then the "Applied" date is formatted in a human-readable way (e.g., 4/4/2026) instead of a raw database timestamp.
- [ ] **The "Read More" Test:** Given I add a job with a massively long description, When it renders on the dashboard, Then it is clamped to 3 lines, and clicking "Read More" expands only that specific card.

## 7. Client-Side Validation & Errors (Ticket #17)
- [ ] **The "Required" Blocker:** Given I am on the `/login` or `/signup` page, When I leave all fields blank and click Submit, Then the form does not submit and red Zod error messages appear under the inputs.
- [ ] **The Email Format Check:** Given I am filling out the Auth form, When I type an invalid email like `john@doe` and submit, Then Zod catches the format and displays an inline error.
- [ ] **The Password Strength Check:** Given I am on the `/signup` page, When I type a password shorter than 6 characters or missing required constraints, Then Zod catches the constraint and displays an inline error.
- [ ] **The Global Toast Anchor:** Given I am trying to sign up, When I enter an email that already exists in the database, Then the backend catches the duplicate and a Sonner toast notification appears at the top of the screen.

## 8. Profile Settings (Ticket #5)
- [ ] **Data Fetching:** Given I have previously saved my resume, When I navigate to `/profile`, Then the textarea is pre-populated with my resume text automatically.
- [ ] **The Save Flow:** Given I am on the `/profile` page, When I paste text and click "Save Resume", Then the button disables temporarily, a success toast appears, and the new data persists on a hard refresh.
- [ ] **The Trigger Check:** Given I create a brand new account, When I navigate to `/profile`, Then the page loads without crashing and I can successfully save my first resume.

## 9. Upcoming Core Features
- [ ] **Ticket #6 (AI Match Engine):** *Placeholder: Verify clicking "Analyze" sends the job description and user resume to the backend and returns a match score.*
- [ ] **Ticket #19 (Missing Keywords):** *Placeholder: Verify the UI correctly highlights keywords missing from the user's resume compared to the job posting.*
- [ ] **Ticket #27 (Cover Letter Generation):** *Placeholder: Verify the "Generate Cover Letter" button produces a formatted letter using the specific job and resume context.*