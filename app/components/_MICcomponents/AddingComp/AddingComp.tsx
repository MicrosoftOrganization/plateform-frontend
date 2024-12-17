// src/components/AddUserForm.jsx
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddUserForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    NomPrenom: "",
    Email: "",
    Password: "",
    Role: "member", // Default role
    Departement: "",
    Adresse: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit() {
    if (!Object.values(form).every((value) => value !== "")) {
      toast.error("Please fill all the fields", {
        position: "bottom-center",
      });
      return;
    }
    setLoading(true);
    console.log("User Submitted", form);

    // Simulate an API call
    setTimeout(() => {
      toast.success("User added successfully!", {
        position: "bottom-center",
      });
      setLoading(false);
    }, 1000);

    // Reset form after submission
    setForm({
      NomPrenom: "",
      Email: "",
      Password: "",
      Role: "member",
      Departement: "",
      Adresse: "",
    });
  }

  return (
    <div id="add-user" className="pt-16 min-h-screen">
      <ToastContainer />
      <div className="container mx-auto p-4 lg:w-8/12">
        <div className="title text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 text-purple-700">Add User</h1>
          <p className="text-lg text-gray-700">
            Fill out the form to add a new member or instructor.
          </p>
        </div>
        <div className="form grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="NomPrenom col-span-2">
            <label htmlFor="NomPrenom" className="block text-purple-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="NomPrenom"
              id="NomPrenom"
              placeholder="John Doe"
              onChange={handleChange}
              value={form.NomPrenom}
              className="w-full p-3 border border-gray-300 rounded-md focus:border-purple-700 focus:outline-none"
            />
          </div>
          <div className="Email col-span-2">
            <label htmlFor="Email" className="block text-purple-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="Email"
              id="Email"
              placeholder="john.doe@example.com"
              onChange={handleChange}
              value={form.Email}
              className="w-full p-3 border border-gray-300 rounded-md focus:border-purple-700 focus:outline-none"
            />
          </div>
          <div className="Password col-span-2">
            <label htmlFor="Password" className="block text-purple-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="Password"
              id="Password"
              placeholder="Enter a strong password"
              onChange={handleChange}
              value={form.Password}
              className="w-full p-3 border border-gray-300 rounded-md focus:border-purple-700 focus:outline-none"
            />
          </div>
          <div className="Role col-span-2">
            <label htmlFor="Role" className="block text-purple-700 font-medium mb-2">
              Role
            </label>
            <select
              name="Role"
              id="Role"
              onChange={handleChange}
              value={form.Role}
              className="w-full p-3 border border-gray-300 rounded-md focus:border-purple-700 focus:outline-none"
            >
              <option value="member">Member</option>
              <option value="instructor">Instructor</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          {/* Additional fields for Instructors or Members */}
          {form.Role !== "super_admin" && (
            <div className="Departement col-span-2">
              <label htmlFor="Departement" className="block text-purple-700 font-medium mb-2">
                Department
              </label>
              <select
                name="Departement"
                id="Departement"
                onChange={handleChange}
                value={form.Departement}
                className="w-full p-3 border border-gray-300 rounded-md focus:border-purple-700 focus:outline-none"
              >
                <option value="">Select Department</option>
                <option value="Basic">Basic</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          )}
          <div className="Adresse col-span-2">
            <label htmlFor="Adresse" className="block text-purple-700 font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              name="Adresse"
              id="Adresse"
              placeholder="1234 Street Name"
              onChange={handleChange}
              value={form.Adresse}
              className="w-full p-3 border border-gray-300 rounded-md focus:border-purple-700 focus:outline-none"
            />
          </div>
          <div className="submit col-span-2 flex items-center gap-4">
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="bg-purple-700 text-white py-3 px-6 rounded-md focus:outline-none"
            >
              {loading ? "Adding..." : "Add User"}
            </button>
            {loading && (
              <div className="loading w-6 h-6 border-4 border-purple-800 border-t-transparent border-r-transparent rounded-full animate-spin"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
