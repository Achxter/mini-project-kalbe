'use client'
import React, { useState } from 'react'
import { updateMemberById } from '../actions';
import { PencilIcon } from '@heroicons/react/24/solid';

interface EditMemberProps {
  user_id: string;
  role: "admin" | "staff";
  members: {
    id: string;
    name: string;
    email: string;
    created_at: string;
  };
}

function EditMember({ user_id, member }: { user_id: string, member: EditMemberProps }) {
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await updateMemberById(user_id, formData);
    const result = typeof response === 'string' ? JSON.parse(response) : response;
    if (result?.error?.message) {
      alert("Failed to edit");
    } else {
      alert("Edited successfully");
      window.location.reload();
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    role: "admin" | "staff";
  }>({
    name: member.members.name,
    email: member.members.email,
    password: '',
    role: member.role
  });

  return (
    <>
      <button className="px-2 py-1 w-24 bg-orange-500 text-white rounded" onClick={() => setShowModal(true)}>
        <div className="flex gap-2 items-center">
          <PencilIcon className="size-5 text-white" />
          Edit
        </div>
      </button>
      {showModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 flex items-center justify-center'>
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Cancel
          </button>
          <div className="max-w-md w-96 x-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-700">Edit Member</h1>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password:</label>
                <input
                  type="password"
                  name="password"
                  placeholder='Retype your password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role:</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default EditMember