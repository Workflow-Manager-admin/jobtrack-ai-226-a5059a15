# Supabase Integration & Secrets Management

This project is configured to use Supabase for secure secret storage and backend configuration.

## Attempted Secret Storage

- **Secret Key:** `COHERE_API_KEY`
- **Purpose:** Used by backend to enable Cohere API-powered AI features (resume matching, cover letter generation, feedback analysis).
- **Status:** ❌ Not configured
- **Reason:** Supabase client could not be initialized due to missing Supabase URL/key or project credentials.

## Required Actions

- Ensure Supabase project is provisioned and accessible to this instance.
- Obtain and securely provide your Supabase URL and service role key or equivalent credentials for backend access.
- Once credentials are available:
  - The secret can be securely set via the Supabase secret store/table.
  - Update this documentation with the storage confirmation.

## Security Best Practice

- **Do NOT commit API keys or secrets to the repository.**
- Use managed secrets (Supabase or equivalent) for storing keys needed by backend logic.

---
_Last attempted: storing `COHERE_API_KEY` for Cohere integration. Please complete Supabase setup as described above._
