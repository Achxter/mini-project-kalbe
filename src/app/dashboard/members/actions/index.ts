"use server"

import { readUserSession } from "@/lib/actions";
import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache";

interface FormDataProps {
  name: string;
  email: string;
  password: string;
  role: "admin" | "staff";
};

export async function createMember(data: {
  name: string;
  email: string;
  password: string;
  role: "admin" | "staff";
}) {
  const { data: userSession } = await readUserSession();
  if (userSession.session?.user.user_metadata.role !== "admin") {
    return { error: { message: "You are not allowed to do this!" } };
  }
  const supabase = await createSupabaseAdmin();
  const createResult = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      role: data.role
    }
  });

  if (createResult.error?.message) {
    return JSON.stringify(createResult.error.message);
  } else {
    const memberResult = await supabase.from("members").insert({
      name: data.name, id: createResult.data.user?.id, email: data.email
    })
    if (memberResult.error?.message) {
      return JSON.stringify(memberResult.error.message);
    } else {
      const permissionResult = await supabase.from("permission").insert({
        role: data.role, member_id: createResult.data.user?.id
      })
      revalidatePath('/dashboard/members');
      return JSON.stringify(permissionResult);
    }
  }
}
export async function updateMemberById(user_id: string, formData: FormDataProps) {
  const supabaseAdmin = await createSupabaseAdmin();
  const userResult = await supabaseAdmin.auth.admin.updateUserById(user_id, {
    email: formData.email,
    password: formData.password,
    email_confirm: true,
    user_metadata: {
      role: formData.role
    }
  });
  if (userResult.error?.message) {
    return JSON.stringify(userResult.error.message);
  } else {
    const supabase = await createSupbaseServerClient();
    const membersResult = await supabase.from("members").update({
      name: formData.name,
      email: formData.email
    }).eq("id", user_id);
    if (membersResult.error?.message) {
      return JSON.stringify(membersResult.error.message);
    } else {
      const permissionResult = await supabase.from("permission").update({
        role: formData.role
      }).eq("member_id", user_id);
      if (permissionResult.error?.message) {
        return JSON.stringify(permissionResult.error.message);
      } else {
        revalidatePath('/dashboard/members');
        return JSON.stringify(permissionResult);
      }
    }
  }
}
export async function deleteMemberById(user_id: string) {
  const { data: userSession } = await readUserSession();
  if (userSession.session?.user.user_metadata.role !== "admin") {
    return { error: { message: "You are not allowed to do this!" } };
  }
  const supabaseAdmin = await createSupabaseAdmin();
  const deleteResult = await supabaseAdmin.auth.admin.deleteUser(user_id);
  if (deleteResult.error?.message) {
    return JSON.stringify(deleteResult.error.message);
  } else {
    const supabase = await createSupbaseServerClient()
    const result = await supabase.from("members").delete().eq("id", user_id);
    revalidatePath('/dashboard/members');
    return JSON.stringify(result);
  }
}
export async function readMembers() {
  const supabase = await createSupbaseServerClient()
  return await supabase.from("permission").select("*,members(*)");
}