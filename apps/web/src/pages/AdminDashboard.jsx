import React, { useEffect, useState } from "react";
import { API_SERVER_URL } from "../lib/apiServerClient";



const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [blogs, setBlogs] = useState([]);

  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "CPUtek",
    image: null,
  });
  useEffect(() => {
  fetch(`${API_SERVER_URL}/contact/leads`)
    .then((res) => res.json())
    .then((data) => {
      setLeads(data.leads);
    })
    .catch((err) => console.error(err));

  fetch(`${API_SERVER_URL}/blogs`)
    .then((res) => res.json())
    .then((data) => {
      setBlogs(data.blogs);
    })
    .catch((err) => console.error(err));

}, []);

  const deleteLead = async (id) => {
  try {
    await fetch(`${API_SERVER_URL}/contact/leads/${id}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    setLeads((prev) =>
      prev.filter((lead) => lead._id !== id)
    );
  } catch (error) {
    console.error(error);
  }
};

const updateStatus = async (id, status) => {
  try {
    await fetch(`${API_SERVER_URL}/contact/leads/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    setLeads((prev) =>
      prev.map((lead) =>
        lead._id === id ? { ...lead, status } : lead
      )
    );
  } catch (error) {
    console.error(error);
  }
};

const createBlog = async () => {
  try {
    console.log(blogForm);
    const formData = new FormData();

    formData.append("title", blogForm.title);
    formData.append("slug", blogForm.slug);
    formData.append("excerpt", blogForm.excerpt);
    formData.append("content", blogForm.content);
    formData.append("author", blogForm.author);
    formData.append("status", "Published");

    if (blogForm.image) {
      formData.append("image", blogForm.image);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const token = localStorage.getItem("token");

const response = await fetch(`${API_SERVER_URL}/blogs`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
});

    const data = await response.json();

    if (data.success) {
      setBlogs((prev) => [data.blog, ...prev]);

      setBlogForm({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author: "CPUtek",
        image: null,
      });

      alert("Blog Created Successfully");
    }
  } catch (error) {
    console.error(error);
  }
};

const filteredLeads = leads.filter((lead) => {
  const matchesSearch =
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesStatus =
    filterStatus === "All" ||
    (lead.status || "New") === filterStatus;

  return matchesSearch && matchesStatus;
});
const totalLeads = leads.length;

const newLeads = leads.filter(
  (lead) => (lead.status || "New") === "New"
).length;

const contactedLeads = leads.filter(
  (lead) => lead.status === "Contacted"
).length;

const convertedLeads = leads.filter(
  (lead) => lead.status === "Converted"
).length;


  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <h2 className="text-2xl font-semibold mb-4">
        Total Leads: {leads.length}
        <input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </h2>

      <div className="flex gap-2 mb-4">
  <button onClick={() => setFilterStatus("All")} className="bg-gray-700 text-white px-4 py-2 rounded">All</button>
  <button onClick={() => setFilterStatus("New")} className="bg-blue-600 text-white px-4 py-2 rounded">New</button>

  <button
    onClick={() => setFilterStatus("Contacted")}
    className="bg-yellow-600 text-white px-4 py-2 rounded"
  >
    Contacted
  </button>

  <button
    onClick={() => setFilterStatus("Converted")}
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    Converted
  </button>
</div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
  
  <div className="bg-gray-800 text-white p-4 rounded-lg shadow">
    <h3 className="text-sm text-gray-400">Total Leads</h3>
    <p className="text-3xl font-bold">{totalLeads}</p>
  </div>

  <div className="bg-blue-600 text-white p-4 rounded-lg shadow">
    <h3 className="text-sm">New</h3>
    <p className="text-3xl font-bold">{newLeads}</p>
  </div>

  <div className="bg-yellow-600 text-white p-4 rounded-lg shadow">
    <h3 className="text-sm">Contacted</h3>
    <p className="text-3xl font-bold">{contactedLeads}</p>
  </div>

  <div className="bg-green-600 text-white p-4 rounded-lg shadow">
    <h3 className="text-sm">Converted</h3>
    <p className="text-3xl font-bold">{convertedLeads}</p>
  </div>

</div>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions </th>
          </tr>
        </thead>

        <tbody>
          {filteredLeads.map((lead) => (
            <tr key={lead._id}>
              <td className="border p-2">{lead.name}</td>
              <td className="border p-2">{lead.email}</td>
              <td className="border p-2">{lead.phone}</td>
              <td className="border p-2">{lead.subject}</td>
              <td className="border p-2">
  <select
    value={lead.status || "New"}
    onChange={(e) =>
      updateStatus(lead._id, e.target.value)
    }
    className="border border-gray-600 bg-gray-800 text-white rounded px-2 py-1"
  >
    <option value="New">New</option>
    <option value="Contacted">Contacted</option>
    <option value="Converted">Converted</option>
  </select>
</td>

<td className="border p-2">
  <div className="flex gap-2">
    <button onClick={() => setSelectedLead(lead)} className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
    <button onClick={() => deleteLead(lead._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
  </div>
</td>
</tr>
))}
</tbody>
</table>

      {selectedLead && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white text-black p-6 rounded-lg w-[500px] shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        Lead Details
      </h2>

      <p><strong>Name:</strong> {selectedLead.name}</p>
      <p><strong>Email:</strong> {selectedLead.email}</p>
      <p><strong>Phone:</strong> {selectedLead.phone}</p>
      <p><strong>Subject:</strong> {selectedLead.subject}</p>
      <p><strong>Message:</strong> {selectedLead.message}</p>

      <p className="mt-2">
        <strong>Date:</strong>{" "}
        {new Date(selectedLead.createdAt).toLocaleString()}
      </p>

      <button
        onClick={() => setSelectedLead(null)}
        className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  </div>
)} 

<div className="mt-12 border-t pt-8">
  <h2 className="text-3xl font-bold mb-6">
    Blog Management
  </h2>

  <div className="flex flex-col gap-4 max-w-3xl">

    <input
      type="text"
      placeholder="Title"
      value={blogForm.title}
      onChange={(e) =>
        setBlogForm({
          ...blogForm,
          title: e.target.value,
        })
      }
      className="border p-2 rounded bg-white text-black"
    />

    <input
      type="text"
      placeholder="Slug"
      value={blogForm.slug}
      onChange={(e) =>
        setBlogForm({
          ...blogForm,
          slug: e.target.value,
        })
      }
      className="border p-2 rounded bg-white text-black"
    />

    <input
      type="text"
      placeholder="Excerpt"
      value={blogForm.excerpt}
      onChange={(e) =>
        setBlogForm({
          ...blogForm,
          excerpt: e.target.value,
        })
      }
      className="border p-2 rounded bg-white text-black"
    />


<input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setBlogForm({
      ...blogForm,
      image: e.target.files[0],
    })
  }
  className="border p-2 rounded bg-white text-black"
/>



    <textarea
      rows="6"
      placeholder="Blog Content"
      value={blogForm.content}
      onChange={(e) =>
        setBlogForm({
          ...blogForm,
          content: e.target.value,
        })
      }
      className="border p-2 rounded bg-white text-black"
    />

    <button
      onClick={createBlog}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Publish Blog
    </button>
  </div>
</div>
    </div>
  );
};

export default AdminDashboard;