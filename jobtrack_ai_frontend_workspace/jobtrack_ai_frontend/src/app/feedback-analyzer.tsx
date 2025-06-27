"use client";
import React, { useState } from "react";

type FeedbackAnalysisResult = {
  summary: string;
  key_points?: string[];
  tips?: string[];
};

/**
 * FeedbackAnalyzer
 * Enhanced UI/UX for recruiter feedback analysis with polished layout, vibrant styling, animations, and responsive interaction states.
 */
// PUBLIC_INTERFACE
export default function FeedbackAnalyzer() {
  const [feedback, setFeedback] = useState("");
  const [analysis, setAnalysis] = useState<FeedbackAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Animation state to trigger subtle highlight for results
  const [resultAnim, setResultAnim] = useState(false);

  // Handler for analyzing the feedback via the backend API
  // PUBLIC_INTERFACE
  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    setAnalysis(null);
    setResultAnim(false);
    try {
      const response = await fetch("/api/analyze-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      });
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data: FeedbackAnalysisResult = await response.json();
      setAnalysis(data);
      setTimeout(() => setResultAnim(true), 100); // Trigger result animation
    } catch {
      setError("Failed to analyze feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // UI Colors corresponding to the theme
  const colorPrimary = "#1C64F2";
  const colorSecondary = "#4338CA";
  const colorAccent = "#10B981";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-12 px-2 sm:px-4 bg-gradient-to-br from-blue-50 via-white to-emerald-50"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
    >
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl shadow-blue-100 border border-gray-100 px-6 sm:px-10 py-10 animate-fade-in">
        <h1
          className="text-3xl font-extrabold text-center mb-2"
          style={{
            color: colorPrimary,
            letterSpacing: "-0.015em",
            textShadow: "0 2px 12px rgba(28,100,242,0.08)",
          }}
        >
          Feedback Analyzer
        </h1>
        <p className="text-center text-gray-600 mb-6 font-medium">
          Get AI-powered insights from recruiter feedback and actionable tips to sharpen your applications.
        </p>
        <form
          autoComplete="off"
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (!feedback.trim()) return;
            handleAnalyze();
          }}
        >
          <label htmlFor="feedback-input" className="block text-lg font-semibold mb-1 text-gray-700">
            Paste Recruiter Feedback <span className="text-red-400">*</span>
          </label>
          <textarea
            id="feedback-input"
            className="w-full resize-none border-2 border-gray-200 rounded-xl px-4 py-3 text-lg mb-2 shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none bg-gray-50 transition-all duration-150"
            style={{ minHeight: 112 }}
            placeholder="e.g. We appreciate your application but suggest more detail about your leadership experience..."
            disabled={loading}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            aria-required="true"
            spellCheck={true}
            autoFocus
          />
          <div className="flex items-center justify-center mt-2">
            <button
              type="submit"
              className={`relative flex items-center justify-center gap-2 px-7 py-3 rounded-full font-semibold text-lg shadow-md focus:ring-2 focus:ring-accent-300 transition-all duration-150
                ${loading || !feedback.trim()
                  ? "bg-gray-300 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 hover:scale-105 hover:shadow-lg ring-2 ring-blue-200 active:scale-95"}`}
              style={{
                background:
                  !loading && feedback.trim()
                    ? `linear-gradient(90deg, ${colorPrimary} 40%, ${colorSecondary} 85%, ${colorAccent} 100%)`
                    : undefined,
                boxShadow: !loading && feedback.trim() ? "0 1px 16px -3px #1C64F222" : undefined,
              }}
              disabled={loading || !feedback.trim()}
              aria-busy={loading}
              aria-disabled={loading || !feedback.trim()}
            >
              {loading && (
                <span className="animate-spin w-5 h-5 mr-2 border-2 border-t-blue-100 border-blue-600 rounded-full"></span>
              )}
              {loading ? "Analyzing..." : "Analyze Feedback"}
            </button>
          </div>
        </form>

        {/* Loading or error or empty state */}
        <div className="mt-8 min-h-[60px]">
          {loading && (
            <div className="flex flex-col items-center justify-center animate-fade-in">
              <div
                className="w-7 h-7 border-4 border-blue-500 border-t-transparent rounded-full animate-spin my-0.5"
                aria-label="Loading"
              />
              <span className="text-blue-600 mt-2 font-medium animate-pulse">Analyzing feedback...</span>
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center text-red-600 font-semibold mb-2 animate-fade-in">
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {error}
            </div>
          )}
          {!loading && !analysis && !error && (
            <div className="text-gray-400 text-center animate-fade-in-slow">
              <span>
                Enter recruiter feedback above and click <span className="font-semibold text-blue-500">Analyze Feedback</span> to get a polished summary, key points, and actionable tips.
              </span>
            </div>
          )}
        </div>
        {/* Results state */}
        {analysis && !loading && (
          <div
            className={`mt-8 animate-fade-in ${
              resultAnim ? "animate-pulse-highlight" : ""
            } bg-gradient-to-br from-blue-50/60 to-green-50/40 rounded-xl shadow-inner p-6 border border-blue-100`}
            tabIndex={0}
            aria-live="polite"
          >
            <h2 className="text-xl font-bold mb-3 text-blue-700 flex items-center gap-2">
              <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" className="text-blue-300"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12.5l2.5 2.5 5-5" className="text-emerald-500" strokeWidth="2" />
              </svg>
              Analysis Result
            </h2>
            <section className="mb-4">
              <h3 className="font-semibold text-blue-600 mb-1">Summary</h3>
              <p className="text-gray-800 mb-2 leading-relaxed">
                {analysis.summary}
              </p>
            </section>
            <section className="mb-4">
              <h3 className="font-semibold text-violet-600 mb-1">Key Points</h3>
              {Array.isArray(analysis.key_points) && analysis.key_points.length > 0 ? (
                <ul className="list-disc list-inside pl-1">
                  {analysis.key_points.map((point: string, idx: number) => (
                    <li key={idx} className="mb-1 text-gray-700">{point}</li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-gray-400 italic">No key points were detected.</div>
              )}
            </section>
            <section>
              <h3 className="font-semibold text-emerald-600 mb-1">Actionable Tips</h3>
              {Array.isArray(analysis.tips) && analysis.tips.length > 0 ? (
                <ul className="list-disc list-inside pl-1">
                  {analysis.tips.map((tip: string, idx: number) => (
                    <li key={idx} className="mb-1 text-gray-800">{tip}</li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-gray-400 italic">No actionable tips found.</div>
              )}
            </section>
          </div>
        )}
      </div>
      {/* Animations CSS */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.47,0,0.745,0.715) both;
        }
        .animate-fade-in-slow {
          animation: fadeIn 1.6s cubic-bezier(0.47,0,0.745,0.715) both;
        }
        .animate-pulse-highlight {
          animation: pulseHighlight 2s cubic-bezier(0.23, 1, 0.32, 1) 1;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(18px);}
          100% { opacity: 1; transform: none;}
        }
        @keyframes pulseHighlight {
          0% {
            box-shadow: 0 0 0 0 ${colorAccent}33;
            background: linear-gradient(95deg, #e0fbfa55, #f5faf7bb 80%);
          }
          70% {
            box-shadow: 0 0 14px 8px ${colorAccent}44;
            background: linear-gradient(95deg, #d5fbe977, #f6f8fbcc 80%);
          }
          100% {
            box-shadow: none;
            background: none;
          }
        }
      `}</style>
    </div>
  );
}
