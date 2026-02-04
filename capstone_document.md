# Module: Agile & DevOps Practices
Trainee: Manaf Mohammed  
Specialization: Data Engineering

## Phase 1: Sprint 0 (Planning)

### 1. Product Vision
A minimal, reliable JobListing web app that enables job seekers to browse, search, and filter jobs, and enables employers to securely post new listings after authentication.

### 2. Product Backlog

| ID | User Story | Acceptance Criteria | Story Points |
| --- | --- | --- | --- |
| US-101 | As an employer, I want to register an account so that I can securely manage job postings. | - Registration requires company name, work email, and password (min 8 chars).<br>- Duplicate email is rejected with a clear message.<br>- Successful registration returns employer profile data. | 5 |
| US-102 | As an employer, I want to log in so that I can post jobs. | - Login requires email + password.<br>- Invalid credentials return a 401 with error message.<br>- Successful login returns a token and employer profile.<br>- Token has an expiry time. | 5 |
| US-103 | As an authenticated employer, I want to post a new job listing so that I can attract candidates. | - Posting requires authentication token.<br>- Form fields: title, company, location, description (required).<br>- Client-side validation; server returns 422 if missing fields.<br>- Success shows confirmation and saved job includes employer id. | 5 |
| US-104 | As a job seeker, I want to view a list of job postings so that I can see available opportunities. | - Displays list with title, company, location, posted date.<br>- Shows “No jobs yet” when empty.<br>- API supports pagination-ready response format (list). | 5 |
| US-105 | As a job seeker, I want to search for jobs by keyword so that I can find relevant positions quickly. | - Text input filters by title/company.<br>- Results update on change.<br>- Query reflected via API (e.g., `/jobs?search=frontend`). | 3 |
| US-106 | As a job seeker, I want to view details of a specific job so that I can learn more about it. | - Detail page shows title, company, location, description, posted date.<br>- 404 error message if job not found. | 3 |
| US-107 | As a job seeker, I want to filter jobs by location so that I can focus on nearby opportunities. | - Location filter dropdown.<br>- Combined with search keyword.<br>- API supports location query param: `/jobs?location=Remote`. | 2 |
| US-108 | As an employer, I want to sign out so that my account remains secure on shared devices. | - Sign out clears token in local storage.<br>- UI updates to show “Employer Login.” | 2 |

### 3. Definition of Done (DoD)
- Acceptance criteria met and demoed.
- Unit/integration tests pass locally and in CI.
- CI workflows green; failing tests block merge.
- Incremental commits (no big‑bang).
- Backend tests are modular (split by feature area).
- Logging enabled for API startup, DB, and auth-related events.
- Lint passes, code is readable.

### 4. Sprint Plan
**Sprint 1:** Deliver employer authentication and job posting.  
Stories: US-101, US-102, US-103, US-108.  
Total points: 17.

**Sprint 2:** Deliver job search/browse features for job seekers.  
Stories: US-104, US-105, US-106, US-107.  
Total points: 13.

---

## Sprint Retrospectives

### Sprint 1
**Sprint Goal:** Deliver the first increment of the JobListing app: employer registration/login and posting jobs.

**What Went Well**
1. Setting up the backend went faster than expected. Using Pydantic models for the Job data structure helped validate inputs early, which reduced bugs when connecting the frontend.
2. Although it failed the first two times due to directory path issues, getting GitHub Actions to successfully run pytest on every push was a big win. It gave me confidence that my backend changes didn't break the build.
3. Using Tailwind for the styling allowed me to create a decent-looking UI for the Job List (US-104) without writing a separate heavy CSS file.

**What Didn’t Go Well**
1. I lost about 2 hours debugging an error where the React frontend couldn't talk to the FastAPI backend. I realized late that I hadn't configured CORSMiddleware in main.py.
2. Looking at my git history, my first few commits were big. I realized I was coding for too long without committing, which goes against the "iterative" nature of the assignment.
3. I initially struggled to update the job list immediately after posting a new job (US-103) without refreshing the page manually.

**Commitments for Sprint 2**
1. I will force myself to commit every time I finish a small logical task (e.g., "Add Search Component UI" separate from "Add Search Logic") rather than waiting for the whole feature to be perfect.
2. I relied too much on the CI pipeline to catch errors. In Sprint 2, I will run pytest locally before pushing to save time on waiting for GitHub Actions.

### Sprint 2
**Sprint Goal:** Deliver remaining MVP features: browse jobs, search jobs, view job detail, and filter by location.

**Review of Sprint 1 Commitments**
- I successfully improved this. My commit history for the "Search" feature shows distinct steps (Backend update -> Frontend UI -> Integration), making it easier to track changes.
- I ran tests locally before pushing. This reduced the number of "red" builds in my CI pipeline history compared to Sprint 1.

**What Went Well**
1. Implementing the Location Filter (US-107) was very smooth because I reused the logic I wrote for the Keyword Search (US-105). I simply extended the backend query parameters.
2. Implementing the Job Details page (US-106) using react-router-dom was straightforward and effectively separated the "List View" from the "Detail View."

**What Didn’t Go Well**
1. While I have unit tests for the backend and frontend, I did not implement enough testing edge cases due to time constraints. In a real-world scenario, I would add tests to cover more edge cases increasing coverage.
2. I added the logging module to the backend. Watching the logs print gave me immediate visibility into where and when error occured, which makes debugging much easier than guessing.

### Final Lessons Learned
- Breaking the project into two sprints helped manage the workload. If I had tried to do everything in one "Big Bang," I likely would have been overwhelmed by the integration of Search and Filters.
- Having the pipeline run automatically meant I never worried about "does it work on my machine only?" If the pipeline passed, I knew the code was stable.
- Focusing strictly on the Acceptance Criteria prevented me from adding unnecessary features (like user login or fancy animations), allowing me to deliver a working product on time.
