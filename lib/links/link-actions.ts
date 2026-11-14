"use server";

import { DEMO_USER_ID, DEMO_LOCKED_MESSAGE } from "../auth/demo";
import { getCurrentUser } from "../supabase/server";
import { validateLink } from "./validate";

export const createLink = async (title: string, url: string) => {
  const { supabase, user } = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  if (user.id === DEMO_USER_ID) return { message: DEMO_LOCKED_MESSAGE };

  const message = validateLink(title, url);
  if (message) return { message };

  const { error } = await supabase.from("links").insert({
    user_id: user.id,
    title: title.trim(),
    url: url.trim(),
    enabled: true,
  });

  if (error) return error;
};

export const editLink = async (linkId: string, title: string, url: string) => {
  const { supabase, user } = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  if (user.id === DEMO_USER_ID) return { message: DEMO_LOCKED_MESSAGE };

  const message = validateLink(title, url);
  if (message) return { message };

  const { error } = await supabase
    .from("links")
    .update({ title: title.trim(), url: url.trim() })
    .eq("id", linkId)
    .eq("user_id", user.id);

  if (error) return error;
};

export const deleteLink = async (linkId: string) => {
  const { supabase, user } = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  if (user.id === DEMO_USER_ID) return { message: DEMO_LOCKED_MESSAGE };

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
    .eq("id", linkId)
    .eq("user_id", user.id);

  if (error) throw error;
};
