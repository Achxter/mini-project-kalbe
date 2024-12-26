import { readUserSession } from '@/lib/actions';
import React from 'react'
import CreateForm from './components/CreateForm';
import ListOfProducts from './components/ListOfProducts';

async function page() {
  const { data: userSession } = await readUserSession();
  const isAdmin = userSession.session?.user.user_metadata.role == "admin";

  return (
    <div className='p-4'>
      <CreateForm isAdmin={isAdmin} />
      <ListOfProducts isAdmin={isAdmin} />
    </div>
  )
}

export default page