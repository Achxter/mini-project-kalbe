import { readUserSession } from '@/lib/actions';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'
import Header from './components/Header';

async function page({ children }: { children: ReactNode }) {
  const { data: userSession } = await readUserSession();

  if (!userSession.session) {
    return redirect("/auth");
  }
  return (
    <div>
      <Header />
      <div className="w-full flex justify-center">
        {children}
      </div>
    </div>
  )
}

export default page