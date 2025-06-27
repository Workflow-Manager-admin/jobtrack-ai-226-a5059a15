 /**
 * API Utility for backend integration
 * 
 * Contains functions for interacting with the backend API.
 */

// PUBLIC_INTERFACE
export const fetchPlaceholder = async (): Promise<string> => {
  // Placeholder function for demonstrating structure
  return "API utilities will be implemented here.";
};

/**
 * API Base URL (adjust if deploying separately)
 * Default: assumes backend on port 3001.
 */
const BACKEND_API_BASE =
  typeof window === "undefined"
    ? process.env.BACKEND_API_BASE || "http://localhost:3001"
    : "/api"; // allow possible proxying through Next.js

/**
 * PUBLIC_INTERFACE
 * Submits resume file and job description to backend /match-resume endpoint.
 * @param params { resumeFile: File, jobDescription: string }
 * @returns Promise<{ suggestions: string[] }>
 */
export const matchResume = async ({
  resumeFile,
  jobDescription,
}: {
  resumeFile: File;
  jobDescription: string;
}): Promise<{ suggestions: string[] }> => {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("job_description", jobDescription);

  // For direct browser→backend call, adjust CORS/backend as needed.
  const res = await fetch(`${BACKEND_API_BASE}/match-resume`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    // Try to extract error
    let detail = "";
    try {
      const err = await res.json();
      detail = err?.detail || "";
    } catch {
      detail = res.statusText;
    }
    throw new Error(
      `Failed to get match suggestions (${res.status}): ${detail || "Unknown error."}`
    );
  }
  return res.json();
};

/**
 * PUBLIC_INTERFACE
 * Submits cover letter generation request to backend /cover-letter endpoint.
 * Accepts job role, job description, resume (file or text), and tone.
 * @param params { jobRole: string, jobDescription: string, resumeFile?: File | null, resumeText?: string, tone: string }
 * @returns Promise<{ cover_letter: string }>
 */
export const generateCoverLetter = async ({
  jobRole,
  jobDescription,
  resumeFile,
  resumeText,
  tone,
}: {
  jobRole: string;
  jobDescription: string;
  resumeFile?: File | null;
  resumeText?: string;
  tone: string;
}): Promise<{ cover_letter: string }> => {
  const formData = new FormData();
  formData.append("job_role", jobRole);
  formData.append("job_description", jobDescription);
  formData.append("tone", tone);
  if (resumeFile) {
    formData.append("resume", resumeFile);
  } else if (resumeText) {
    formData.append("resume_text", resumeText);
  }

  const res = await fetch(`${BACKEND_API_BASE}/cover-letter`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    let detail = "";
    try {
      const err = await res.json();
      detail = err?.detail || "";
    } catch {
      detail = res.statusText;
    }
    throw new Error(
      `Failed to generate cover letter (${res.status}): ${detail || "Unknown error."}`
    );
  }
  return res.json();
};
