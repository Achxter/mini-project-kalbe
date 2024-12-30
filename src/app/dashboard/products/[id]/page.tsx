import { readUserSession } from '@/lib/actions';
import ProductById from '../components/ProductById';
import { readProductById } from '../actions';
import { redirect } from 'next/navigation';

async function Page({ params }: { params: { id: string } }) {
  const { data: userSession } = await readUserSession();
  const isAdmin = userSession.session?.user.user_metadata.role == "admin";

  const product = await readProductById(params.id);
  console.log(product);
  if (!product || product.length === 0) {
    redirect('/dashboard/products');
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <ProductById product_id={params.id} isAdmin={isAdmin} />
    </div>
  );
}

export default Page;