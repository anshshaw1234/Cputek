import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { API_SERVER_URL } from "../lib/apiServerClient";
import BlogAdminPanel from "./BlogAdminPanel";

const statuses = ["All", "New", "Contacted", "Converted"];

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState("");
  const [pendingLeadId, setPendingLeadId] = useState("");
  const [activeTab, setActiveTab] = useState("contacts");
  const navigate = useNavigate();
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/admin/login", { replace: true });
  }, [navigate]);

  const loadLeads = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }

    setIsLoading(true);
    setLoadingError("");
    try {
      const response = await fetch(`${API_SERVER_URL}/contact/leads`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        navigate("/admin/login", { replace: true });
        return;
      }
      if (!response.ok) {
        throw new Error(data.message || "Could not load contact submissions.");
      }
      if (!Array.isArray(data.leads) || typeof data.total !== "number") {
        throw new Error("The server returned an invalid contact-submission response.");
      }

      setLeads(data.leads);
      setTotalLeads(data.total);
    } catch (error) {
      setLoadingError(error.message || "Could not load contact submissions.");
      toast.error(error.message || "Could not load contact submissions.");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const filteredLeads = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesSearch =
        !query ||
        [lead.name, lead.email, lead.phone, lead.subject]
          .some((value) => String(value || "").toLowerCase().includes(query));
      const matchesStatus = filterStatus === "All" || (lead.status || "New") === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [filterStatus, leads, searchTerm]);

  const updateStatus = async (id, status) => {
    setPendingLeadId(id);
    try {
      const response = await fetch(`${API_SERVER_URL}/contact/leads/${id}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        navigate("/admin/login", { replace: true });
        return;
      }
      if (!response.ok) {
        throw new Error(data.message || "Could not update contact status.");
      }

      setLeads((current) =>
        current.map((lead) => (lead._id === id ? data.lead : lead)),
      );
      toast.success("Contact status updated.");
    } catch (error) {
      toast.error(error.message || "Could not update contact status.");
    } finally {
      setPendingLeadId("");
    }
  };

  const deleteLead = async (id) => {
    if (!window.confirm("Delete this contact submission? This cannot be undone.")) return;

    setPendingLeadId(id);
    try {
      const response = await fetch(`${API_SERVER_URL}/contact/leads/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        navigate("/admin/login", { replace: true });
        return;
      }
      if (!response.ok) {
        throw new Error(data.message || "Could not delete contact submission.");
      }

      setLeads((current) => current.filter((lead) => lead._id !== id));
      setTotalLeads((current) => Math.max(0, current - 1));
      if (selectedLead?._id === id) setSelectedLead(null);
      toast.success("Contact submission deleted.");
    } catch (error) {
      toast.error(error.message || "Could not delete contact submission.");
    } finally {
      setPendingLeadId("");
    }
  };

  const newLeads = leads.filter((lead) => (lead.status || "New") === "New").length;
  const contactedLeads = leads.filter((lead) => lead.status === "Contacted").length;
  const convertedLeads = leads.filter((lead) => lead.status === "Converted").length;

  if (activeTab === "blogs") {
    return <BlogAdminPanel onContacts={() => setActiveTab("contacts")} onLogout={logout} />;
  }

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">CPUtek Admin</p>
            <h1 className="text-4xl font-bold text-foreground">Contact Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Showing the latest {leads.length} of {totalLeads} contact submissions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("blogs")}
              className="glass-button px-5 py-3 rounded-xl text-foreground hover:text-primary"
            >
              Manage blogs
            </button>
            <button
              type="button"
              onClick={loadLeads}
              disabled={isLoading}
              className="glass-button px-5 py-3 rounded-xl text-foreground hover:text-primary disabled:opacity-50"
            >
              {isLoading ? "Refreshing…" : "Refresh"}
            </button>
            <button
              type="button"
              onClick={logout}
              className="glass-button px-5 py-3 rounded-xl text-foreground hover:text-primary"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "All submissions", value: totalLeads, style: "glass-card" },
            { label: "New in recent list", value: newLeads, style: "border-blue-400/30 bg-blue-500/10" },
            { label: "Contacted in recent list", value: contactedLeads, style: "border-yellow-400/30 bg-yellow-500/10" },
            { label: "Converted in recent list", value: convertedLeads, style: "border-green-400/30 bg-green-500/10" },
          ].map((stat) => (
            <section key={stat.label} className={`${stat.style} border p-5 rounded-2xl`}>
              <h2 className="text-sm text-muted-foreground">{stat.label}</h2>
              <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
            </section>
          ))}
        </div>

        <section className="glass-base p-5 sm:p-7 rounded-3xl">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Recent contact details</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <label className="sr-only" htmlFor="lead-search">Search contacts</label>
              <input
                id="lead-search"
                type="search"
                placeholder="Search name, email, phone, or subject"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full sm:w-72 px-4 py-3 rounded-xl glass-button text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <label className="sr-only" htmlFor="lead-status-filter">Filter by status</label>
              <select
                id="lead-status-filter"
                value={filterStatus}
                onChange={(event) => setFilterStatus(event.target.value)}
                className="px-4 py-3 rounded-xl glass-button text-foreground focus:outline-none focus:border-primary"
              >
                {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
          </div>

          {loadingError && (
            <div role="alert" className="mb-5 p-4 rounded-xl border border-red-400/30 bg-red-500/10 text-red-200">
              {loadingError}
            </div>
          )}

          {isLoading ? (
            <p className="py-12 text-center text-muted-foreground">Loading contact submissions…</p>
          ) : filteredLeads.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              {leads.length ? "No contacts match your search." : "No contact submissions yet."}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead>
                  <tr className="border-b border-white/10 text-sm text-muted-foreground">
                    <th scope="col" className="p-3">Name</th>
                    <th scope="col" className="p-3">Email</th>
                    <th scope="col" className="p-3">Phone</th>
                    <th scope="col" className="p-3">Subject</th>
                    <th scope="col" className="p-3">Received</th>
                    <th scope="col" className="p-3">Status</th>
                    <th scope="col" className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead._id} className="border-b border-white/5 text-sm text-foreground">
                      <td className="p-3 font-medium">{lead.name}</td>
                      <td className="p-3">
                        <a className="hover:text-primary" href={`mailto:${lead.email}`}>{lead.email}</a>
                      </td>
                      <td className="p-3">{lead.phone || "—"}</td>
                      <td className="p-3 max-w-48 truncate">{lead.subject || "—"}</td>
                      <td className="p-3 whitespace-nowrap">
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleString() : "—"}
                      </td>
                      <td className="p-3">
                        <select
                          aria-label={`Status for ${lead.name}`}
                          value={lead.status || "New"}
                          disabled={pendingLeadId === lead._id}
                          onChange={(event) => updateStatus(lead._id, event.target.value)}
                          className="px-2 py-2 rounded-lg glass-button text-foreground disabled:opacity-50"
                        >
                          {statuses.slice(1).map((status) => <option key={status} value={status}>{status}</option>)}
                        </select>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedLead(lead)}
                            className="px-3 py-2 rounded-lg glass-button hover:text-primary"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            disabled={pendingLeadId === lead._id}
                            onClick={() => deleteLead(lead._id)}
                            className="px-3 py-2 rounded-lg border border-red-400/20 text-red-300 hover:bg-red-500/10 disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {selectedLead && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedLead(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-detail-title"
            className="glass-base w-full max-w-xl p-7 sm:p-9 rounded-3xl"
          >
            <h2 id="contact-detail-title" className="text-2xl font-bold text-foreground mb-6">
              Contact details
            </h2>
            <dl className="space-y-4 text-sm">
              {[
                ["Name", selectedLead.name],
                ["Email", selectedLead.email],
                ["Phone", selectedLead.phone || "Not provided"],
                ["Subject", selectedLead.subject || "Not provided"],
                ["Received", selectedLead.createdAt ? new Date(selectedLead.createdAt).toLocaleString() : "Unknown"],
                ["Message", selectedLead.message],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="font-semibold text-primary mb-1">{label}</dt>
                  <dd className="text-muted-foreground whitespace-pre-wrap break-words">{value}</dd>
                </div>
              ))}
            </dl>
            <button
              type="button"
              onClick={() => setSelectedLead(null)}
              className="mt-7 px-5 py-3 rounded-xl glass-button text-foreground hover:text-primary"
            >
              Close
            </button>
          </section>
        </div>
      )}
    </main>
  );
};

export default AdminDashboard;
