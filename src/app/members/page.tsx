'use client'

import React, { useState } from 'react';
import CreateForm from './components/createForm';

const MembersPage = () => {
  const [showModal, setShowModal] = useState(false);
  const members = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ];

  return (
    <div className="p-4">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setShowModal(true)}
      >
        Create User
      </button>

      <h1 className="text-2xl font-bold mb-4">Members</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{member.id}</td>
              <td className="py-2 px-4 border-b">{member.name}</td>
              <td className="py-2 px-4 border-b">{member.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <CreateForm />
      )}
    </div>
  );
}

export default MembersPage;