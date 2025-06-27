# JobTrack AI Backend – Cohere Integration Setup

This backend uses Cohere's API for AI-powered text generation and analysis (resume suggestions, cover letter, feedback interpretation).

## Environment Variable Setup

Before running the backend, set your Cohere API key as an environment variable:

- **COHERE_API_KEY**  
  Your secret API key from [Cohere](https://dashboard.cohere.com/api-keys).  
  _Example (Linux/macOS):_

  ```
  export COHERE_API_KEY=your-cohere-key-here
  ```

  _Or create a `.env` file in the backend root with:_
  ```
  COHERE_API_KEY=your-cohere-key-here
  ```

The Flask backend will auto-load this environment variable for secure API calls.

## Dependencies

Make sure `requests` and `python-dotenv` are installed (see `requirements.txt`).

## Where it's used

- `app/services/cohere_client.py` – Handles the Cohere API calls.
- All AI endpoints (resume matching, cover letter, feedback) use Cohere for processing.
