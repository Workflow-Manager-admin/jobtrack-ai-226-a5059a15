"use client";

import React, { useState } from "react";

/**
 * Tracker Dashboard Page
 * Displays a job application Kanban board (with Table toggle), allows adding/updating jobs.
 * Uses mock data initially.
 */

type JobStatus = "Saved" | "Applied" | "Interview" | "Offer" | "Rejected";
interface JobApplication {
  id: number;
  status: JobStatus;
  company: string;
  role: string;
  notes: string;
  appliedDate?: string;
}

// Kanban pipeline stages
const STATUS_OPTIONS: JobStatus[] = ["Saved", "Applied", "Interview", "Offer", "Rejected"];
const STATUS_COLORS: Record<JobStatus, string> = {
  Saved: "bg-gray-100 border-gray-300",
  Applied: "bg-blue-100 border-blue-400",
  Interview: "bg-yellow-100 border-yellow-500",
  Offer: "bg-green-100 border-green-500",
  Rejected: "bg-red-100 border-red-400",
};

const MOCK_APPLICATIONS: JobApplication[] = [
  { id: 1, status: "Applied", company: "Google", role: "Software Engineer", notes: "Online assessment completed.", appliedDate: "2024-06-01" },
  { id: 2, status: "Interview", company: "Amazon", role: "Frontend Developer", notes: "Technical interview upcoming.", appliedDate: "2024-05-25" },
  { id: 3, status: "Saved", company: "Stripe", role: "Product Designer", notes: "Job saved for later. Research team.", appliedDate: "" },
  { id: 4, status: "Offer", company: "Meta", role: "Backend Engineer", notes: "Received offer, weighing options.", appliedDate: "2024-04-18" },
  { id: 5, status: "Rejected", company: "Netflix", role: "React Developer", notes: "Ghosted after phone screen.", appliedDate: "2024-05-12" },
];

const DashboardPage: React.FC = () => {
  const [applications, setApplications] = useState<JobApplication[]>(MOCK_APPLICATIONS);
  const [viewType, setViewType] = useState<"kanban" | "table">("kanban");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editApplication, setEditApplication] = useState<JobApplication | null>(null);

  // Form state for adding/editing job
  const [formData, setFormData] = useState<JobApplication>({
    id: -1,
    status: "Saved",
    company: "",
    role: "",
    notes: "",
    appliedDate: "",
  });

  // Modal open/close helpers
  const openAddModal = () => {
    setModalMode("add");
    setFormData({ id: -1, status: "Saved", company: "", role: "", notes: "", appliedDate: "" });
    setIsModalOpen(true);
    setEditApplication(null);
  };

  const openEditModal = (app: JobApplication) => {
    setModalMode("edit");
    setEditApplication(app);
    setFormData(app);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditApplication(null);
  };

  // Form handlers
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update job
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (modalMode === "add") {
      // Assign a new id (mock auto-increment)
      const newId = Math.max(...applications.map(a => a.id), 0) + 1;
      setApplications([
        ...applications,
        { ...formData, id: newId, appliedDate: formData.appliedDate || undefined },
      ]);
    } else if (modalMode === "edit" && editApplication) {
      setApplications(applications.map((a) => (a.id === editApplication.id ? { ...formData, id: editApplication.id } : a)));
    }
    closeModal();
  };

  // Move to another status (kanban drag simulation)
  const moveAppStatus = (app: JobApplication, status: JobStatus) => {
    setApplications((prev) =>
      prev.map((a) =>
        a.id === app.id
          ? { ...a, status }
          : a
      )
    );
  };

  // Renderers
  const renderKanbanBoard = () => (
    <div className="w-full flex flex-col md:flex-row gap-4 mt-6 overflow-x-auto">
      {STATUS_OPTIONS.map((status) => (
        <div key={status} className={`min-w-[240px] flex-1 rounded border ${STATUS_COLORS[status]} p-3 shadow-sm`}>
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-md">{status}</span>
            <span className="rounded-full bg-gray-200 text-xs px-2 py-1 ml-2">{applications.filter(a => a.status === status).length}</span>
          </div>
          <div className="space-y-3">
            {applications.filter((a) => a.status === status).map((app) => (
              <div
                key={app.id}
                className="bg-white border rounded p-3 shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => openEditModal(app)}
                title="Edit job"
              >
                <div className="flex flex-col gap-1">
                  <div className="text-blue-800 font-semibold">{app.role}</div>
                  <div className="text-gray-700">{app.company}</div>
                  <div className="text-xs text-gray-500">{app.appliedDate ? `Applied: ${app.appliedDate}` : ""}</div>
                  <div className="text-sm text-gray-500 italic truncate">{app.notes}</div>
                </div>
                {/* Move status dropdown (inline quick update) */}
                <select
                  className="mt-2 w-full border rounded px-2 py-1 text-xs bg-gray-100 hover:bg-blue-100"
                  value={app.status}
                  onChange={(e) => moveAppStatus(app, e.target.value as JobStatus)}
                >
                  {STATUS_OPTIONS.map(opt => (
                    <option value={opt} key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
            {/* Add shortcut */}
            {status === "Saved" && (
              <button
                className="mt-2 w-full bg-blue-50 border-blue-200 border rounded py-1 hover:bg-blue-200 text-blue-700"
                onClick={openAddModal}
              >
                + Add Job
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderTableView = () => (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-white border rounded shadow">
        <thead className="bg-blue-100">
          <tr>
            <th className="py-2 px-3 text-left">Status</th>
            <th className="py-2 px-3 text-left">Company</th>
            <th className="py-2 px-3 text-left">Role</th>
            <th className="py-2 px-3 text-left">Notes</th>
            <th className="py-2 px-3 text-left">Applied Date</th>
            <th className="py-2 px-3"></th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="border-b cursor-pointer hover:bg-blue-50" onClick={() => openEditModal(app)}>
              <td className="py-2 px-3">{app.status}</td>
              <td className="py-2 px-3">{app.company}</td>
              <td className="py-2 px-3">{app.role}</td>
              <td className="py-2 px-3 truncate max-w-xs">{app.notes}</td>
              <td className="py-2 px-3">{app.appliedDate || ""}</td>
              <td className="py-2 px-3">
                <button className="text-blue-700 hover:underline" onClick={e => { e.stopPropagation(); openEditModal(app); }}>Edit</button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={6} className="text-center py-3">
              <button
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                onClick={openAddModal}
              >+ Add Job
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  // Modal dialog for add/edit form
  const renderModal = () => (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-20 flex items-center justify-center">
      <div className="bg-white border rounded shadow-lg p-6 min-w-[340px] max-w-[95vw] relative">
        <h2 className="text-lg font-bold mb-3">{modalMode === "add" ? "Add New Job Application" : "Edit Job Application"}</h2>
        <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
          <label>
            <span className="text-sm">Status:</span>
            <select
              name="status"
              className="w-full border mt-1 p-2 rounded"
              value={formData.status}
              onChange={handleFormChange}
              required
            >
              {STATUS_OPTIONS.map(opt => (
                <option value={opt} key={opt}>{opt}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="text-sm">Company:</span>
            <input
              name="company"
              type="text"
              className="w-full border mt-1 p-2 rounded"
              value={formData.company}
              onChange={handleFormChange}
              placeholder="Company Name"
              required
            />
          </label>
          <label>
            <span className="text-sm">Role:</span>
            <input
              name="role"
              type="text"
              className="w-full border mt-1 p-2 rounded"
              value={formData.role}
              onChange={handleFormChange}
              placeholder="Job Title"
              required
            />
          </label>
          <label>
            <span className="text-sm">Notes:</span>
            <textarea
              name="notes"
              className="w-full border mt-1 p-2 rounded"
              value={formData.notes}
              onChange={handleFormChange}
              rows={3}
              placeholder="Notes, reminders, or comments"
            />
          </label>
          <label>
            <span className="text-sm">Applied Date:</span>
            <input
              name="appliedDate"
              type="date"
              className="w-full border mt-1 p-2 rounded"
              value={formData.appliedDate || ""}
              onChange={handleFormChange}
            />
          </label>
          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-100 border border-gray-400 px-3 py-1 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              {modalMode === "add" ? "Add" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="max-w-screen-xl mx-auto my-8 px-4">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Tracker Dashboard</h1>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded border ${viewType === "kanban" ? "bg-blue-600 text-white" : "bg-white border-blue-600 text-blue-700"}`}
            onClick={() => setViewType("kanban")}
          >Kanban</button>
          <button
            className={`px-3 py-1 rounded border ${viewType === "table" ? "bg-blue-600 text-white" : "bg-white border-blue-600 text-blue-700"}`}
            onClick={() => setViewType("table")}
          >Table</button>
        </div>
      </div>
      <div>
        {viewType === "kanban" ? renderKanbanBoard() : renderTableView()}
      </div>
      {isModalOpen && renderModal()}
      <div className="mt-10 text-sm text-gray-500">
        <p>
          <span className="font-semibold">Note:</span> This dashboard is using mock data. All actions are local and not saved to a backend. Backend integration will enable live data persistence.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
