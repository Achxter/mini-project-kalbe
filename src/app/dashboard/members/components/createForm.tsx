'use client'
import React, { useState } from 'react';
import { createMember } from '../actions';
import { PlusCircleIcon } from '@heroicons/react/24/solid'

interface CreateFormProps {
  isAdmin: boolean;
}

const CreateForm: React.FC<CreateFormProps> = ({ isAdmin }) => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    role: "admin" | "staff";
  }>({
    name: '',
    email: '',
    password: '',
    role: 'admin'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createMember(formData);
    const parsedResult = typeof result === 'string' ? JSON.parse(result) : result;
    const { error } = parsedResult;
    if (error?.message) {
      alert("Failed to create member: " + error.message);
    } else {
      alert('Member created successfully');
      window.location.reload();
    }
  };
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="">
      {isAdmin && (
        <>
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setShowModal(true)}
          >
            <div className="flex gap-2">
              <PlusCircleIcon className="size-6 text-white" />
              Create User
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
              <div className="max-w-md w-96 mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-gray-700">Member Form</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
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
      )}
    </div>
  );
};

export default CreateForm;