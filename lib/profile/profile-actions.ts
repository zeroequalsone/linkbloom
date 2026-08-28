"use server";

import { getCurrentUser } from "../supabase/server";
import { ButtonStyle, Font, Theme } from "./profile-types";

export const updateTheme = async (theme: Theme) => {
  const { supabase, user } = await getCurrentUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase

    .from("profiles")

    .update({ theme })

    .eq("user_id", user.id);

  if (error) return error;
};

export const updateFont = async (font: Font) => {
  const { supabase, user } = await getCurrentUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase

    .from("profiles")

    .update({ font })

    .eq("user_id", user.id);

  if (error) return error;
};

export const updateButtonStyle = async (buttonStyle: ButtonStyle) => {
  const { supabase, user } = await getCurrentUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase

    .from("profiles")

    .update({ button_style: buttonStyle })

    .eq("user_id", user.id);

  if (error) return error;
};
