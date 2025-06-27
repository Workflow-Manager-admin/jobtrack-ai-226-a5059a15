"use client";

import React, { useState } from "react";
import { matchResume } from "../utils/api";

/**
 * Match Resume Page
 * Provides a form for the user to upload a resume and paste a job description.
 * Submits data to the backend and displays AI-tailored resume improvement suggestions.
 */
const MatchResumePage: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle resume file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuggestions(null);

    try {
      if (!resumeFile) {
        setError("Please upload your resume file.");
        setIsSubmitting(false);
        return;
      }
      if (!jobDescription.trim()) {
        setError("Please paste the job description.");
        setIsSubmitting(false);
        return;
      }

      // Call API util to match resume
      const response = await matchResume({
        resumeFile,
        jobDescription,
      });

      if (response && response.suggestions) {
        setSuggestions(response.suggestions);
      } else {
        setError("No suggestions returned from AI.");
      }
    } catch (err: unknown) {
      let errorMessage = "Failed to process resume matching. Please try again.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-3">Match Resume</h1>
      <p className="mb-7 text-gray-700">
        Upload your resume and paste a job description below to receive AI-powered suggestions for tailoring your resume.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          <span className="font-medium">Resume File (PDF/DOCX):</span>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="block mt-2"
          />
        </label>
        <label>
          <span className="font-medium">Job Description:</span>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={8}
            className="w-full p-2 mt-2 border rounded"
            placeholder="Paste the full job description here..."
          />
        </label>
        <button
          type="submit"
          className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-60 ${isSubmitting ? "cursor-not-allowed" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Analyzing..." : "Get Suggestions"}
        </button>
      </form>

      {error && (
        <div className="mt-5 text-red-600 font-semibold">{error}</div>
      )}

      {suggestions && (
        <div className="mt-8 bg-blue-50 border border-blue-200 p-4 rounded">
          <h2 className="text-lg font-bold mb-2 text-blue-700">AI Suggestions</h2>
          <ul className="list-disc list-inside text-blue-900">
            {suggestions.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MatchResumePage;
