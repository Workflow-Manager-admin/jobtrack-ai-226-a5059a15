import React from "react";

/**
 * JobCard Component – Placeholder
 */
const JobCard: React.FC<{ title?: string; company?: string }> = ({ title, company }) => {
  return (
    <div>
      <h3>{title ?? "Job Title"}</h3>
      <p>{company ?? "Company"}</p>
      <span>Job card details go here.</span>
    </div>
  );
};

export default JobCard;
