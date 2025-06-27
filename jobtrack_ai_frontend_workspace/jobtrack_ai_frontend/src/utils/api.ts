 /**
 * API Utility for backend integration
 * 
 * Contains functions for interacting with the backend API.
 */

// API Base URL (adjust if deploying separately)
// Default: assumes backend on port 3001.
const BACKEND_API_BASE =
  typeof window === "undefined"
    ? process.env.BACKEND_API_BASE || "http://localhost:3001"
    : "/api"; // allow possible proxying through Next.js

/**
 * Types for job applications (shared between API and frontend)
 */
export type JobStatus = "Saved" | "Applied" | "Interview" | "Offer" | "Rejected";
export interface JobApplication {
  id: number;
  status: JobStatus;
  company: string;
  role: string;
  notes: string;
  appliedDate?: string;
}
export type JobApplicationCreatePayload = Omit<JobApplication, "id">;
export type JobApplicationUpdatePayload = Omit<JobApplication, "id">;

// PUBLIC_INTERFACE
/**
 * Fetch all job applications from the backend.
 * @returns Promise<JobApplication[]>
 */
export const fetchApplications = async (): Promise<JobApplication[]> => {
  const res = await fetch(`${BACKEND_API_BASE}/applications`, {
    method: "GET",
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
      `Failed to fetch job applications (${res.status}): ${detail || "Unknown error."}`
    );
  }
  return res.json();
};

/**
 * PUBLIC_INTERFACE
 * Fetch a single job application by ID.
 * @param id Application ID
 */
export const fetchApplicationById = async (id: number): Promise<JobApplication> => {
  const res = await fetch(`${BACKEND_API_BASE}/applications/${id}`, {
    method: "GET",
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
      `Failed to fetch job application (${res.status}): ${detail || "Unknown error."}`
    );
  }
  return res.json();
};

/**
 * PUBLIC_INTERFACE
 * Create a new job application.
 * @param payload JobApplicationCreatePayload
 */
export const createApplication = async (payload: JobApplicationCreatePayload): Promise<JobApplication> => {
  const res = await fetch(`${BACKEND_API_BASE}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
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
      `Failed to create job application (${res.status}): ${detail || "Unknown error."}`
    );
  }
  return res.json();
};

/**
 * PUBLIC_INTERFACE
 * Update an existing job application.
 * @param id Application ID
 * @param payload JobApplicationUpdatePayload
 */
export const updateApplication = async (
  id: number,
  payload: JobApplicationUpdatePayload
): Promise<JobApplication> => {
  const res = await fetch(`${BACKEND_API_BASE}/applications/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
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
      `Failed to update job application (${res.status}): ${detail || "Unknown error."}`
    );
  }
  return res.json();
};

/**
 * PUBLIC_INTERFACE
 * Delete a job application by ID.
 * @param id Application ID
 */
export const deleteApplication = async (id: number): Promise<{ success: boolean }> => {
  const res = await fetch(`${BACKEND_API_BASE}/applications/${id}`, {
    method: "DELETE",
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
      `Failed to delete job application (${res.status}): ${detail || "Unknown error."}`
    );
  }
  return res.json();
};

// ---------- Resume/cover-letter utilities (preserved) ----------

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
