"use server"

import { createSupabaseAdmin } from "@/lib/supabase"

export async function createMember(data: {
  name: string;
  email: string;
  password: string;
  role: "admin" | "staff";
}) {
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
      name: data.name, id: createResult.data.user?.id
    })
    if (memberResult.error?.message) {
      return JSON.stringify(memberResult.error.message);
    } else {
      const permissionResult = await supabase.from("permission").insert({
        role: data.role, member_id: createResult.data.user?.id
      })
      return JSON.stringify(permissionResult);
    }
  }
}
export async function updateMemberById() {

}
export async function deleteMemberById() {

}
export async function readMembers() {

}