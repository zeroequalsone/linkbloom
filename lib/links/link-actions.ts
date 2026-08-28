"use server";

import { getCurrentUser } from "../supabase/server";

export const createLink = async (title: string, url: string) => {
  const { supabase, user } = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("links").insert({
    user_id: user.id,
    title,
    url,
    enabled: true,
  });

  if (error) return error;
};

export const editLink = async (linkId: string, title: string, url: string) => {
  const { supabase, user } = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("links")
    .update({ title, url })
    .eq("id", linkId);

  if (error) return error;
};

export const deleteLink = async (linkId: string) => {
  const { supabase, user } = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("links")
    .delete()
    .eq("id", linkId)
    .eq("user_id", user.id);

  if (error) return error;
};

export const updateEnabled = async (linkId: string, enabled: boolean) => {
  const { supabase, user } = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("links")
    .update({ enabled })
    .eq("id", linkId);

  if (error) throw error;
};
