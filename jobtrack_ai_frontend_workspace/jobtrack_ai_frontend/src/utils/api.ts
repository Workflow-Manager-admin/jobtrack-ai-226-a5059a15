/**
 * Utility functions for API requests in JobTrack AI Frontend.
 * Extend or modify these as necessary for your project.
 */

/**
 * Utility functions for API requests in JobTrack AI Frontend.
 * Extend or modify these as necessary for your project.
 */

// Example: POST request with JSON body & error handling
export async function postJson<T = unknown>(url: string, data: unknown, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...(options?.headers || {}),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

// Example: GET request
export async function getJson<T = unknown>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    ...(options || {}),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

/**
 * Generate a cover letter by sending data to the backend API.
 * @param payload Object with necessary data for cover letter generation.
 * @returns Promise resolving to an object with the cover letter (snake_case property).
 */
// PUBLIC_INTERFACE
export async function generateCoverLetter(payload: Record<string, unknown>): Promise<{ cover_letter: string }> {
  const response = await fetch("/api/generate-cover-letter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Failed to generate cover letter");
  }
  const data = await response.json();
  // Ensure we always return an object with cover_letter property
  if (typeof data.cover_letter === "string") {
    return { cover_letter: data.cover_letter };
  } else if (typeof data.coverLetter === "string") {
    // fallback to camelCase if backend changed
    return { cover_letter: data.coverLetter };
  }
  return { cover_letter: "" };
}

/**
 * Fetches all job applications from the backend API.
 * @returns Promise resolving to an array of application objects.
 */
// PUBLIC_INTERFACE
export async function fetchApplications(): Promise<any[]> {
  const response = await fetch("/api/applications");
  if (!response.ok) throw new Error("Failed to fetch applications");
  return response.json();
}

/**
 * Creates a new job application via backend API.
 * @param application The application object to create.
 * @returns Promise resolving to created application object.
 */
// PUBLIC_INTERFACE
export async function createApplication(application: Record<string, unknown>): Promise<any> {
  const response = await fetch("/api/applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(application),
  });
  if (!response.ok) throw new Error("Failed to create application");
  return response.json();
}

/**
 * Updates an existing job application via backend API.
 * @param id Application ID.
 * @param updates Update fields as an object.
 * @returns Promise resolving to the updated application object.
 */
// PUBLIC_INTERFACE
export async function updateApplication(id: string, updates: Record<string, unknown>): Promise<any> {
  const response = await fetch(`/api/applications/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Failed to update application");
  return response.json();
}

/**
 * Deletes a job application via backend API.
 * @param id Application ID.
 * @returns Promise resolving to deletion confirmation.
 */
// PUBLIC_INTERFACE
export async function deleteApplication(id: string): Promise<{ success: boolean }> {
  const response = await fetch(`/api/applications/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete application");
  return response.json();
}

// Add new API utility functions below as needed

// (If you had code past this point, it may have contained a parsing error.)
// Please ensure new utility functions are valid TypeScript and properly exported.

/**
 * Generate a cover letter by sending data to the backend API.
 * @param payload Object with necessary data for cover letter generation.
 * @returns Promise resolving to an object with the cover letter (snake_case property).
 */
// PUBLIC_INTERFACE
export async function generateCoverLetter(payload: Record<string, unknown>): Promise<{ cover_letter: string }> {
  const response = await fetch("/api/generate-cover-letter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Failed to generate cover letter");
  }
  const data = await response.json();
  // Ensure we always return an object with cover_letter property
  if (typeof data.cover_letter === "string") {
    return { cover_letter: data.cover_letter };
  } else if (typeof data.coverLetter === "string") {
    // fallback to camelCase if backend changed
    return { cover_letter: data.coverLetter };
  }
  return { cover_letter: "" };
}

/**
 * Fetches all job applications from the backend API.
 * @returns Promise resolving to an array of application objects.
 */
// PUBLIC_INTERFACE
export async function fetchApplications(): Promise<any[]> {
  const response = await fetch("/api/applications");
  if (!response.ok) throw new Error("Failed to fetch applications");
  return response.json();
}

/**
 * Creates a new job application via backend API.
 * @param application The application object to create.
 * @returns Promise resolving to created application object.
 */
// PUBLIC_INTERFACE
export async function createApplication(application: Record<string, unknown>): Promise<any> {
  const response = await fetch("/api/applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(application),
  });
  if (!response.ok) throw new Error("Failed to create application");
  return response.json();
}

/**
 * Updates an existing job application via backend API.
 * @param id Application ID.
 * @param updates Update fields as an object.
 * @returns Promise resolving to the updated application object.
 */
// PUBLIC_INTERFACE
export async function updateApplication(id: string, updates: Record<string, unknown>): Promise<any> {
  const response = await fetch(`/api/applications/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Failed to update application");
  return response.json();
}

/**
 * Deletes a job application via backend API.
 * @param id Application ID.
 * @returns Promise resolving to deletion confirmation.
 */
// PUBLIC_INTERFACE
export async function deleteApplication(id: string): Promise<{ success: boolean }> {
  const response = await fetch(`/api/applications/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete application");
  return response.json();
}

// Add new API utility functions below as needed

// (If you had code past this point, it may have contained a parsing error.)
// Please ensure new utility functions are valid TypeScript and properly exported.
