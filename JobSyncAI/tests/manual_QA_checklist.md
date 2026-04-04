# JobSync AI - Manual QA Checklist

*Instructions: Run through the relevant tests in this document before merging any feature branch into `main` to ensure no regressions have occurred.*

## 1. Authentication (Ticket #1)
- [ ] **Successful Login:** Given valid credentials, When I click "Sign In", Then I am redirected to `/dashboard`.
- [ ] **Logout Flow:** Given I am logged in, When I click "Logout", Then my session ends and I am redirected to `/login`.
- [ ] **Successful Sign Up:** Given I am on the `/signup` page, When I enter a new valid email and password and click "Sign Up", 
Then my account is created in Supabase and I am redirected to `/dashboard`.
- [ ] **Duplicate Account:** Given I am on the `/signup` page, When I try to sign up with an email that is already registered, 
Then I see an error message and I am prevented from accessing the `/dashboard`.

## 2. Routing & Navigation (Ticket #16)
- [ ] **The Bouncer (Protected Routes):** Given I am logged out, When I manually type `/dashboard` into the URL bar, Then I am immediately redirected to `/login`.
- [ ] **The Reverse Bouncer:** Given I am already logged in, When I manually navigate to `/login`, Then I am redirected back to `/dashboard`.
- [ ] **SPA Navigation:** When I click between "Dashboard" and "Settings" in the sidebar, Then the URL updates instantly without the page flashing or doing a full browser reload.
- [ ] **Active State:** When I am on `/dashboard`, Then the Dashboard link is visually highlighted in the sidebar.

## 3. Dashboard UI & Shadcn (Tickets #3 & #22)
- [ ] Verify grid layout is responsive (stacks on mobile, columns on desktop).
- [ ] Placeholder: Verify mock job cards render correctly with Shadcn styles.

## 4. Job Form & Validation (Tickets #2 & #17)
-[ ] The "Happy Path" Submission: Given I fill out all fields correctly, When I click "Save", Then the sheet closes, the form resets to empty, and a new row appears in the Supabase jobs table.
-[ ] Minimalist Entry: Given I only fill out Company and Title (leaving URL and Description blank), When I click "Save", Then the job is successfully created without errors.
-[ ] The Enum Check: When I select "Interviewing" from the status dropdown, Then the record in Supabase shows exactly Interviewing (not lowercase or a default).
-[ ] Persistence Check: When I refresh the browser after a successful save, Then the form remains empty (confirming the reset() worked) but the network tab shows the new job was fetched (once we wire up the fetch logic).
- [ ] Verify form blocks submission if required fields are empty.
- [ ] Verify invalid URLs trigger a Zod error message.

## 5. UI Polishing & UX
-[ ] The "Esc" Key: When the Add Job sheet is open, If I press the Esc key or click the outside overlay, Then the sheet closes without submitting data.
-[ ] Multi-line Text: When I paste a long job description into the textarea, Then the box remains readable and doesn't break the layout of the sheet.

## 5. Validation (#17)- *Upcoming*
-[ ] *Placeholder: TODO*

## 6. Profile Settings (Ticket #5) - *Upcoming*
- [ ] *Placeholder: Verify user can paste and save their Master Resume.*

## 7. AI Match Engine (Tickets #6, #7, #8, #19) - *Upcoming*
- [ ] *Placeholder: Verify clicking "Analyze Match" triggers a loading state.*
- [ ] *Placeholder: Verify Match Score and Missing Keywords render correctly from the AI response.*