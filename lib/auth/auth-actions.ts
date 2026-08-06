import { supabase } from "../supabase/supabase-client";

export const signUp = async (
  email: string,
  password: string,
  displayName: string,
  username: string,
) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
        username,
      },
    },
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
