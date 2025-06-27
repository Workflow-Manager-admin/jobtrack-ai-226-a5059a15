# Supabase Integration & Secrets Management

This project is configured to use Supabase for secure secret storage and backend configuration.

## Attempted Secret Storage

- **Secret Key:** `COHERE_API_KEY`
- **Purpose:** Used by backend to enable Cohere API-powered AI features (resume matching, cover letter generation, feedback analysis).
- **Status:** ❌ Not configured
- **Latest Attempt:** ❌ Failed (2024-06)
- **Reason:** Supabase API/project is missing system functions for SQL execution or secret storage (e.g. public.run_sql, secret_store upsert). Unable to provision secret store or set secrets using available APIs with anon or service credentials.
- **Root Cause:** The Supabase project may not have the "run_sql" Postgres function enabled or may lack the required PostgREST RPCs for secrets/SQL execution. This is typical for projects lacking admin/service role access or custom database extensions.

## Required Actions

- Ensure Supabase project is provisioned and accessible with full admin access (Service Role Key preferred).
- If using a custom Supabase project, verify [Database functions](https://supabase.com/docs/guides/database/functions) and PostgREST RPC access are enabled, specifically `run_sql(query)` or an admin SQL execution endpoint.
- Optionally, provision a secrets table and install RPC extensions required for managed secret storage. See: https://supabase.com/docs/guides/functions/postgres-functions or contact Supabase support for setup help.
- Once credentials and required DB functions are available:
  - The secret can be securely set via the Supabase secret store/table.
  - Update this documentation with the storage confirmation.

## Security Best Practice

- **Do NOT commit API keys or secrets to the repository.**
- Use managed secrets (Supabase or equivalent) for storing keys needed by backend logic.

---
_Last attempted: storing `COHERE_API_KEY` for Cohere integration. Please complete Supabase setup as described above._
