"use client";

import React, { useState } from "react";
import { analyzeFeedback } from "../utils/api";

/**
 * Feedback Analyzer Page – Submit recruiter feedback and see AI-powered analysis.
 */
const FeedbackAnalyzerPage: React.FC = () => {
  const [feedback, setFeedback] = useState("");
  const [result, setResult] = useState<null | { summary: string; suggestions: string[] }>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle submission of the feedback to backend API
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(null);
    setError(null);

    if (!feedback.trim()) {
      setError("Please enter recruiter feedback for analysis.");
      return;
    }
    setLoading(true);
    try {
      const response = await analyzeFeedback({ feedback });
      if (response && (response.summary || response.suggestions)) {
        setResult(response);
      } else {
        setError("No analysis results returned from AI.");
      }
    } catch (err: unknown) {
      let errorMsg = "Failed to analyze feedback. Please try again.";
      if (err instanceof Error) errorMsg = err.message;
      setError(errorMsg);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-3 text-blue-800">Feedback Analyzer</h1>
      <p className="mb-7 text-gray-700">
        Paste recruiter feedback to receive AI-powered insights and suggestions for next steps.
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label>
          <span className="font-medium">Recruiter Feedback:</span>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={7}
            className="w-full p-2 mt-2 border rounded"
            placeholder="Paste recruiter or company feedback here..."
            disabled={loading}
          />
        </label>
        <button
          type="submit"
          className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-60 ${
            loading ? "cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Feedback"}
        </button>
      </form>
      {error && <div className="mt-5 text-red-600 font-semibold">{error}</div>}
      {result && (
        <div className="mt-8 bg-blue-50 border border-blue-200 p-4 rounded">
          <h2 className="text-lg font-bold mb-2 text-blue-700">AI Insights</h2>
          <div className="mb-2 text-blue-900">
            <strong>Summary:</strong>
            <div className="mt-1 whitespace-pre-wrap">{result.summary}</div>
          </div>
          <div>
            <strong>Suggestions:</strong>
            <ul className="list-disc list-inside text-blue-900 mt-1">
              {result.suggestions.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackAnalyzerPage;
