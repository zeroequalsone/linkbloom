import { supabase } from "../supabase/supabase-client";

export const signUp = async (
  email: string,
  password: string,
  displayName: string,
  username: string,
) => {
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
        username,
      },
    },
  });

  await supabase.from("stats").insert({
    user_id: data.user?.id,
    views: 0,
    views_7_days_ago: 0,
    clicks: 0,
    clicks_7_days_ago: 0,
  });

  if (error) return error;
};

export const signIn = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return error;
};

export const logOut = async () => {
  return await supabase.auth.signOut();
};
