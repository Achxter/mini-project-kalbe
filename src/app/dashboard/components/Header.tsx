'use client'
import { logout } from '@/app/auth/actions';
import { useRouter } from 'next/navigation';
import React from 'react'
import { HomeIcon, UserGroupIcon, ArchiveBoxIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid'


function Header() {
  const router = useRouter();

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <div>
        <button
          onClick={() => router.push('/dashboard/')}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 mr-2"
        >
          <div className="flex gap-2">
            <HomeIcon className="size-6 text-white" />
            Dashboard
          </div>
        </button>
        <button
          onClick={() => router.push('/dashboard/members')}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 mr-2"
        >
          <div className="flex gap-2">
            <UserGroupIcon className="size-6 text-white" />
            Members
          </div>
        </button>
        <button
          onClick={() => router.push('/dashboard/products')}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700"
        >
          <div className="flex gap-2">
            <ArchiveBoxIcon className="size-6 text-white" />
            Products
          </div>
        </button>
      </div>
      <div>
        <button
          onClick={async () => {
            logout();
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          <div className="flex gap-2">
            <ArrowRightStartOnRectangleIcon className="size-6 text-white" />
            Sign Out
          </div>
        </button>
      </div>
    </header>
  )
}

export default Header