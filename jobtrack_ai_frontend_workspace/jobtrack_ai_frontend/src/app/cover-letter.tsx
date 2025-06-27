"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { generateCoverLetter } from "../utils/api";

/**
 * Cover Letter Generator Page
 * Renders form for job role, job description, resume (upload or paste), tone selection,
 * sends data to backend and displays the generated cover letter.
 */
const TONE_OPTIONS = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "concise", label: "Concise" },
  { value: "enthusiastic", label: "Enthusiastic" },
];

const CoverLetterPage: React.FC = () => {
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [resumeInputType, setResumeInputType] = useState<"file" | "text">("file");
  const [tone, setTone] = useState("professional");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResumeFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
      setResumeText("");
    }
  };

  const handleResumeTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(e.target.value);
    setResumeFile(null);
  };

  const handleToggleResumeInput = () => {
    setResumeInputType(resumeInputType === "file" ? "text" : "file");
    setResumeFile(null);
    setResumeText("");
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setCoverLetter(null);

    // Validation
    if (!jobRole.trim()) {
      setError("Please enter the job role/position.");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please provide the job description.");
      return;
    }
    if (resumeInputType === "file" && !resumeFile) {
      setError("Please upload your resume file.");
      return;
    }
    if (resumeInputType === "text" && !resumeText.trim()) {
      setError("Please paste your resume text.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare form data
      let response;
      if (resumeInputType === "file") {
        response = await generateCoverLetter({
          jobRole,
          jobDescription,
          resumeFile,
          resumeText: "",
          tone,
        });
      } else {
        response = await generateCoverLetter({
          jobRole,
          jobDescription,
          resumeFile: null,
          resumeText,
          tone,
        });
      }

      if (response && response.cover_letter) {
        setCoverLetter(response.cover_letter);
      } else {
        setError("No cover letter returned from AI.");
      }
    } catch (err: unknown) {
      let errorMessage = "Failed to generate cover letter. Please try again.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-3 text-blue-800">Cover Letter Generator</h1>
      <p className="mb-7 text-gray-700">
        Enter details below to generate a job-tailored, AI-powered cover letter.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          <span className="font-medium">Job Role / Position:</span>
          <input
            type="text"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="w-full p-2 mt-2 border rounded"
            placeholder="e.g. Software Engineer"
          />
        </label>
        <label>
          <span className="font-medium">Job Description:</span>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
            className="w-full p-2 mt-2 border rounded"
            placeholder="Paste the job description here..."
          />
        </label>
        <div>
          <button
            type="button"
            className="text-sm text-blue-600 underline mb-2"
            onClick={handleToggleResumeInput}
          >
            {resumeInputType === "file" ? "Paste resume text instead" : "Upload resume file instead"}
          </button>
          {resumeInputType === "file" ? (
            <label className="block">
              <span className="font-medium">Upload Resume (PDF/DOCX):</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeFileChange}
                className="block mt-2"
              />
            </label>
          ) : (
            <label className="block">
              <span className="font-medium">Paste Resume Text:</span>
              <textarea
                value={resumeText}
                onChange={handleResumeTextChange}
                rows={6}
                className="w-full p-2 mt-2 border rounded"
                placeholder="Paste your resume here..."
              />
            </label>
          )}
        </div>
        <label>
          <span className="font-medium">Tone:</span>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full p-2 mt-2 border rounded"
          >
            {TONE_OPTIONS.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-60 ${isSubmitting ? "cursor-not-allowed" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Generating..." : "Generate Cover Letter"}
        </button>
      </form>

      {error && (
        <div className="mt-5 text-red-600 font-semibold">{error}</div>
      )}

      {coverLetter && (
        <div className="mt-10 bg-blue-50 border border-blue-200 p-4 rounded">
          <h2 className="text-lg font-bold mb-2 text-blue-700">AI-Generated Cover Letter</h2>
          <pre className="whitespace-pre-wrap text-blue-900">{coverLetter}</pre>
        </div>
      )}
    </div>
  );
};

export default CoverLetterPage;
