// import React, { useEffect, useState } from "react";

// const BlogAdminPage = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [selectedBlog, setSelectedBlog] = useState(null);
//   const [editingBlog, setEditingBlog] = useState(null);


//   useEffect(() => {
//     fetch(`${API_SERVER_URL}/blogs`)
//       .then((res) => res.json())
//       .then((data) => setBlogs(data.blogs))
//       .catch(console.error);
//   }, []);



//   const deleteBlog = async (id) => {
//   const confirmDelete = window.confirm(
//     "Are you sure you want to delete this blog?"
//   );

//   if (!confirmDelete) return;

//   try {
//     await fetch(`${API_SERVER_URL}/blogs/${id}`, {
//       method: "DELETE",
//     });

//     setBlogs((prev) =>
//       prev.filter((blog) => blog._id !== id)
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };

// const saveBlog = async () => {
//   try {
//     const response = await fetch(
//       `${API_SERVER_URL}/blogs/${editingBlog._id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(editingBlog),
//       }
//     );

//     const data = await response.json();

//     if (data.success) {
//       setBlogs((prev) =>
//         prev.map((blog) =>
//           blog._id === editingBlog._id
//             ? data.updatedBlog
//             : blog
//         )
//       );

//       setEditingBlog(null);

//       alert("Blog Updated Successfully");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// const updateBlogStatus = async (id, status) => {
//   try {
//     await fetch(
//       `${API_SERVER_URL}/blogs/${id}/status`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status }),
//       }
//     );

//     setBlogs((prev) =>
//       prev.map((blog) =>
//         blog._id === id
//           ? { ...blog, status }
//           : blog
//       )
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };

//   return (
//     <div className="min-h-screen p-8">
//       <h1 className="text-4xl font-bold mb-6">
//         Blog Management
//       </h1>

//       <button className="bg-green-600 text-white px-4 py-2 rounded mb-6">
//         + Create Blog
//       </button>

//       <table className="w-full border">
//         <thead>
//           <tr>
//             <th className="border p-2">Title</th>
//             <th className="border p-2">Author</th>
//             <th className="border p-2">Status</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {blogs.map((blog) => (
//             <tr key={blog._id}>
//               <td className="border p-2">{blog.title}</td>
//               <td className="border p-2">{blog.author}</td>
//               <td className="border p-2">
//   <select
//     value={blog.status || "Draft"}
//     onChange={(e) =>
//       updateBlogStatus(
//         blog._id,
//         e.target.value
//       )
//     }
//     className="border border-gray-600 bg-gray-800 text-white rounded px-2 py-1"
//   >
//     <option value="Draft">
//       Draft
//     </option>

//     <option value="Published">
//       Published
//     </option>
//   </select>
// </td>

//               <td className="border p-2">
//                 <div className="flex gap-2">
//                   <button onClick={() => setSelectedBlog(blog)} className="bg-blue-500 text-white px-3 py-1 rounded">View</button>

//                   <button onClick={() => setEditingBlog(blog)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>

//                   <button onClick={() => deleteBlog(blog._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {selectedBlog && (
//   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//     <div className="bg-white text-black p-6 rounded-lg w-[700px] max-h-[80vh] overflow-y-auto shadow-lg">

//       <h2 className="text-2xl font-bold mb-4">
//         {selectedBlog.title}
//       </h2>

//       <p className="mb-2">
//         <strong>Author:</strong> {selectedBlog.author}
//       </p>

//       <p className="mb-2">
//         <strong>Status:</strong> {selectedBlog.status}
//       </p>

//       <p className="mb-4">
//         <strong>Excerpt:</strong> {selectedBlog.excerpt}
//       </p>

//       <div className="border-t pt-4 whitespace-pre-wrap">
//         {selectedBlog.content}
//       </div>

//       <button
//         onClick={() => setSelectedBlog(null)}
//         className="mt-6 bg-gray-700 text-white px-4 py-2 rounded"
//       >
//         Close
//       </button>

//     </div>
//   </div>
// )}

// {editingBlog && (
//   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//     <div className="bg-white text-black p-6 rounded-lg w-[700px] shadow-lg">

//       <h2 className="text-2xl font-bold mb-4">
//         Edit Blog
//       </h2>

//       <input
//         type="text"
//         value={editingBlog.title}
//         onChange={(e) =>
//           setEditingBlog({
//             ...editingBlog,
//             title: e.target.value,
//           })
//         }
//         className="w-full border p-2 mb-3"
//       />

//       <input
//         type="text"
//         value={editingBlog.excerpt}
//         onChange={(e) =>
//           setEditingBlog({
//             ...editingBlog,
//             excerpt: e.target.value,
//           })
//         }
//         className="w-full border p-2 mb-3"
//       />

//       <textarea
//         rows="8"
//         value={editingBlog.content}
//         onChange={(e) =>
//           setEditingBlog({
//             ...editingBlog,
//             content: e.target.value,
//           })
//         }
//         className="w-full border p-2 mb-3"
//       />

//       <div className="flex gap-3">
//         <button
//           onClick={saveBlog}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Save
//         </button>

//         <button
//           onClick={() => setEditingBlog(null)}
//           className="bg-gray-600 text-white px-4 py-2 rounded"
//         >
//           Cancel
//         </button>
//       </div>

//     </div>
//   </div>
// )}
//     </div>
//   );
// };


// export default BlogAdminPage;