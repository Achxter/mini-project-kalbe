'use client'
import React from 'react'
import { deleteProductById } from '../actions'
import { TrashIcon } from '@heroicons/react/24/solid'

function DeleteProduct({ product_id }: { product_id: string }) {
  const onSubmit = async () => {
    const response = await deleteProductById(product_id);
    const result = typeof response === 'string' ? JSON.parse(response) : response;
    if (result?.error?.message) {
      alert("Failed to delete");
    } else {
      alert("Deleted successfully");
      window.location.reload();
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <button className="px-2 py-1 w-24 bg-red-500 text-white rounded">
        <div className="flex gap-2 items-center">
          <TrashIcon className="size-5 text-white" />
          Delete
        </div>
      </button>
    </form>
  )
}

export default DeleteProduct