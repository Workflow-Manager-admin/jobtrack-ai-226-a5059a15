# JobTrack AI – Project Folder Structure

This structure organizes the fullstack codebase for clarity, modularity, and team collaboration.  
_Explanatory comments (`// ...`) highlight purpose and conventions. Adapt as the project matures._

---
```
jobtrack-ai/
├── jobtrack_ai_frontend_workspace/
│   └── jobtrack_ai_frontend/
│       ├── src/
│       │   ├── app/                                           // Next.js app directory (App Router)
│       │   │   ├── page.tsx                                   // Home page
│       │   │   ├── match-resume/                              // Resume matching page
│       │   │   │    └── page.tsx
│       │   │   ├── cover-letter/                              // Cover letter generation page
│       │   │   │    └── page.tsx
│       │   │   ├── dashboard/                                 // Job tracking dashboard
│       │   │   │    └── page.tsx
│       │   │   ├── feedback-analyzer/                         // Feedback analyzer UI
│       │   │   │    └── page.tsx
│       │   │   ├── layout.tsx                                 // Root layout (sidebar/nav etc.)
│       │   │   └── globals.css                                // Global styles
│       │   ├── components/                                    // Reusable React components
│       │   │   ├── ResumeUploader.tsx
│       │   │   ├── CoverLetterForm.tsx
│       │   │   └── JobCard.tsx
│       │   ├── utils/
│       │   │   └── api.ts                                     // API helpers (interact with Flask backend)
│       │   ├── styles/                                        // Additional CSS/SCSS modules
│       │   └── public/                                        // Static files (images, logo, etc)
│       ├── package.json
│       ├── tsconfig.json
│       ├── next.config.ts
│       ├── postcss.config.mjs
│       ├── eslint.config.mjs
│       └── README.md
│
├── jobtrack_ai_backend_workspace/
│   └── jobtrack_ai_backend/
│       ├── app/
│       │   ├── __init__.py                                    // Flask app factory
│       │   ├── routes/
│       │   │   ├── __init__.py
│       │   │   ├── health.py                                  // Health check route
│       │   │   ├── resume.py                                  // Resume analysis endpoints
│       │   │   ├── cover_letter.py                            // Cover letter generation endpoint
│       │   │   └── feedback.py                                // Feedback analyzer endpoint
│       │   ├── services/
│       │   │   └── kavai_client.py                            // Service: interaction with Kavai AI API
│       │   └── utils/                                         // Utility functions/helpers
│       ├── tests/                                             // Unit and integration tests
│       │   ├── __init__.py
│       │   ├── test_resume.py
│       │   ├── test_cover_letter.py
│       │   └── test_feedback.py
│       ├── requirements.txt                                   // Backend Python dependencies
│       └── run.py                                             // App entrypoint
│
├── database/
│   └── models.sql                                             // Database schema & migrations (reference)
│
├── .env                                                       // Project-wide environment variables
├── docker-compose.yml                                         // For orchestrating frontend, backend, DB
└── README.md                                                  // Project root readme, setup/overview

// --- Key Structure Notes ---
// - Frontend & backend code are fully separated for clean deployment/dev.
// - Place all job/recruitment/AI logic in Flask backend services/routes, accessible from Next.js via /api calls.
// - Use `.env` for secrets, DB URLs, and API keys (never commit secret keys to VCS!)
// - Expand `/database` with migration tools or ORM folders if you add to schema management.
```
