'use server'
import React from 'react'
import { readProduct } from '../actions'
import DetailProduct from './DetailProduct';

async function ListOfProducts() {
  const { data: products } = await readProduct();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <table className="min-w-full bg-gray-900 border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            {/* <th className="py-2 px-4 border-b">Description</th> */}
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => {
            return (
              <tr key={index} className="bg-gray-800">
                <td className="py-2 px-4 border-b">{product.id}</td>
                <td className="py-2 px-4 border-b">{product.name}</td>
                {/* <td className="py-2 px-4 border-b">{product.description}</td> */}
                <td className="py-2 px-4 border-b">{product.quantity}</td>
                <td className="py-2 px-4 border-b">{product.price}</td>
                <td className="py-2 px-4 border-b">
                  <DetailProduct product_id={product.id} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ListOfProducts