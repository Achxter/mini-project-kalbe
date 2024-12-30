'use client'
import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

function DetailProduct({ product_id }: { product_id: string }) {
  return (
    <div>
      <button
        onClick={() => window.location.href = `/dashboard/products/${product_id}`}
        className="bg-blue-500 px-4 py-2 rounded text-white"
      >
        <div className="flex gap-1 items-center">
          Details
          <MagnifyingGlassIcon className='size-5 text-white' />
        </div>
      </button>
    </div>
  )
}

export default DetailProduct