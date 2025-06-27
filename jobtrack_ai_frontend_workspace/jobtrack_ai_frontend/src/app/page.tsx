import Link from "next/link";

/**
 * Landing page for JobTrack AI – Smart Job Application Manager
 * Features: Hero section, navigation to Resume Matcher, Cover Letter Generator, Dashboard, Feedback Analyzer.
 * Themed with modern, minimal aesthetic using primary (#1C64F2), secondary (#4338CA), accent (#10B981).
 */

const FEATURES = [
  {
    label: "Resume Matcher",
    href: "/match-resume",
    description: "Upload your resume & get AI-powered, job-matching resume suggestions.",
    color: "from-blue-500 to-indigo-500",
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="3" className="stroke-blue-600" />
        <path d="M8 7h8M8 11h4m-4 4h8" className="stroke-blue-400" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Cover Letter Generator",
    href: "/cover-letter",
    description: "Instantly generate custom, AI-written cover letters for every job.",
    color: "from-indigo-600 to-blue-800",
    icon: (
      <svg className="w-8 h-8 text-indigo-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7" className="stroke-indigo-700" />
        <path d="M22 7l-10 6L2 7" className="stroke-blue-400" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    description: "Track applications, interviews & offers in a unified dashboard.",
    color: "from-emerald-400 to-blue-500",
    icon: (
      <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <rect x="5" y="9" width="6" height="10" rx="2" className="stroke-emerald-600" />
        <rect x="13" y="5" width="6" height="14" rx="2" className="stroke-blue-800" />
      </svg>
    ),
  },
  {
    label: "Feedback Analyzer",
    href: "/feedback-analyzer",
    description: "Paste recruiter feedback & get actionable, AI-driven insights.",
    color: "from-blue-500 to-emerald-500",
    icon: (
      <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" className="stroke-blue-400" />
        <path d="M10 13l2 2l4 -4" className="stroke-green-500" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* HERO SECTION */}
      <section className="w-full max-w-5xl mx-auto py-16 px-5 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h1 className="font-extrabold text-4xl md:text-5xl text-blue-800 mb-4 tracking-tight">
            JobTrack AI
          </h1>
          <h2 className="mb-6 text-xl md:text-2xl font-medium text-blue-700 max-w-lg text-center md:text-left">
            Smart Job Application Manager
          </h2>
          <p className="mb-8 text-gray-700 text-lg max-w-xl text-center md:text-left">
            Supercharge your job search – tailor resumes, create cover letters, track every application, and extract recruiter insights. All AI-powered.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {FEATURES.map((f) => (
              <Link
                href={f.href}
                key={f.href}
                className={`inline-block px-5 py-3 rounded-full font-semibold text-md shadow-lg transition-transform hover:scale-105 focus:ring-2 focus:ring-blue-200 text-white bg-gradient-to-r ${f.color}`}
              >
                {f.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="rounded-2xl border border-blue-100 shadow-lg px-10 py-10 bg-white bg-opacity-80 max-w-xs flex flex-col items-center">
            <svg width="56" height="56" fill="none" className="mb-2" aria-hidden>
              <circle cx="28" cy="28" r="27" fill="#E0F2FE" stroke="#1C64F2" strokeWidth="2"/>
              <rect x="17" y="20" width="22" height="16" rx="3" fill="#fff" stroke="#1C64F2" strokeWidth="1.5"/>
              <path d="M17 23l11 7 11-7" stroke="#1C64F2" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
            </svg>
            <span className="text-lg font-bold text-blue-700">Welcome to Your AI Job Search Hub</span>
            <span className="mt-2 text-gray-500 text-center text-sm">AI, analytics, & tracking in one place</span>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-6xl mx-auto pb-14 px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.href}
              className="relative group bg-white border border-blue-100 rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-start transition-all duration-150"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="mt-7 mb-2 text-xl font-bold text-blue-800 flex gap-2 items-center">
                <Link
                  href={feature.href}
                  className="hover:underline hover:text-blue-700 focus:ring"
                >
                  {feature.label}
                </Link>
              </h3>
              <p className="text-gray-600 text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      <footer className="w-full py-6 text-center text-sm text-gray-400 border-t border-blue-100 bg-white bg-opacity-60">
        &copy; {new Date().getFullYear()} JobTrack AI &mdash; Smart Job Application Manager
      </footer>
    </div>
  );
}
