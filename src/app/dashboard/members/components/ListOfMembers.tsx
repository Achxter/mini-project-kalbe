'use server'
import React from 'react'
import { readMembers } from '../actions'
import DeleteMember from './DeleteMember';
import EditMember from './EditMember';

interface ListOfMembersProps {
  isAdmin: boolean;
}

async function ListOfMembers({ isAdmin }: ListOfMembersProps) {
  const { data: members } = await readMembers();
  // console.log(members);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Members</h1>
      <table className="min-w-full bg-gray-900 border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            {isAdmin && <th className="py-2 px-4 border-b">Action</th>}
          </tr>
        </thead>
        <tbody>
          {members?.map((member, index) => {
            return (
              <tr key={index} className="bg-gray-800">
                <td className="py-2 px-4 border-b">{member.id}</td>
                <td className="py-2 px-4 border-b">{member.members.name}</td>
                <td className="py-2 px-4 border-b">{member.members.email}</td>
                <td className="py-2 px-4 border-b">{member.role}</td>
                {isAdmin && (
                  <td className="py-2 px-4 border-b">
                    <div className="mb-2">
                      <EditMember user_id={member.member_id} member={member} />
                    </div>
                    <div className="">
                      <DeleteMember user_id={member.member_id} />
                    </div>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ListOfMembers