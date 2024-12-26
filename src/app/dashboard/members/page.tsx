import React from 'react';
import CreateForm from './components/createForm';
import ListOfMembers from './components/ListOfMembers';
import { readUserSession } from '@/lib/actions';

async function Page() {
  const { data: userSession } = await readUserSession();
  const isAdmin = userSession.session?.user.user_metadata.role == "admin";

  return (
    <div className="p-4">
      <CreateForm isAdmin={isAdmin} />
      <ListOfMembers isAdmin={isAdmin} />
    </div>
  );
};

export default Page;