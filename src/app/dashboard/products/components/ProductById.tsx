import React from 'react'
import { readProductById } from '../actions';
import DeleteProduct from './DeleteProduct';
import EditProduct from './EditProduct';

interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

async function ProductById({ product_id, isAdmin }: { product_id: string, isAdmin: boolean }) {
  const product = await readProductById(product_id);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {Array.isArray(product) && product.map((item: ProductProps) => (
        <div key={item.id} className="">
          <h1 className="text-gray-700 text-2xl font-bold mb-2">{item.name}</h1>
          <p className="text-gray-700 mb-4">{item.description}</p>
          <p className="text-gray-700 text-lg font-semibold mb-2">Price: ${item.price}</p>
          <p className="text-gray-600 mb-4">Quantity: {item.quantity}</p>
          <div className="mb-2">
        <EditProduct product_id={item.id} product={item} />
          </div>
          {isAdmin && (
        <div className="">
          <DeleteProduct product_id={item.id} />
        </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ProductById