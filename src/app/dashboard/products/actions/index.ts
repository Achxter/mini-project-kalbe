"use server"

import { readUserSession } from "@/lib/actions";
import { createSupbaseServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache";

interface FormDataProps {
  name: string;
  description: string;
  quantity: number;
  price: number;
};

export async function createProduct(data: FormDataProps) {
  const { data: userSession } = await readUserSession();
  if (userSession.session?.user.user_metadata.role !== "admin") {
    return { error: { message: "You are not allowed to do this!" } };
  }
  const supabase = await createSupbaseServerClient();
  const createResult = await supabase.from("products").insert({
    name: data.name,
    description: data.description,
    quantity: data.quantity,
    price: data.price
  });

  if (createResult.error?.message) {
    return JSON.stringify(createResult.error.message);
  } else {
    revalidatePath('/dashboard/products');
    return JSON.stringify(createResult);
  }
}
export async function updateProductById(product_id: string, formData: FormDataProps) {
  const supabase = await createSupbaseServerClient();
  const updateResult = await supabase.from("products").update({
    name: formData.name,
    description: formData.description,
    quantity: formData.quantity,
    price: formData.price
  }).eq("id", product_id);
  revalidatePath('/dashboard/products');
  return JSON.stringify(updateResult);
}

export async function deleteProductById(product_id: string) {
  const { data: userSession } = await readUserSession();
  if (userSession.session?.user.user_metadata.role !== "admin") {
    return { error: { message: "You are not allowed to do this!" } };
  }
  const supabase = await createSupbaseServerClient();
  const deleteResult = await supabase.from("products").delete().eq("id", product_id);
  if (deleteResult.error?.message) {
    return JSON.stringify(deleteResult.error.message);
  } else {
    revalidatePath('/dashboard/products');
    return JSON.stringify(deleteResult);
  }
}
export async function readProduct() {
  const supabase = await createSupbaseServerClient()
  return await supabase.from("products").select("*");
}