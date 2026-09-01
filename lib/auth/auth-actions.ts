"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient, getCurrentUser } from "../supabase/server";
import { createClient } from "@supabase/supabase-js";

export const signUp = async (
  email: string,
  password: string,
  displayName: string,
  username: string,
) => {
  const supabase = await createSupabaseServerClient();

  const normalizedDisplayName = displayName.trim();

  if (!normalizedDisplayName) {
    return "Bitte gib deinen Namen ein.";
  }

  if (normalizedDisplayName.length > 40) {
    return "Der Name darf maximal 40 Zeichen lang sein.";
  }

  const normalizedUsername = username.toLowerCase().trim();

  if (!normalizedUsername) {
    return "Bitte gib deinen Usernamen ein.";
  }

  if (!/^[a-z0-9]{3,20}$/.test(normalizedUsername)) {
    return "Der Username darf nur Kleinbuchstaben und Zahlen enthalten.";
  }

  const normalizedEmail = email.toLowerCase().trim();

  if (!normalizedEmail) {
    return "Bitte gib deine E-Mail ein.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return "Bitte gib eine gültige E-Mail ein.";
  }

  const { data: existingUser, error: usernameError } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", normalizedUsername)
    .maybeSingle();

  if (usernameError) {
    return "Fehler beim Überprüfen des Usernames.";
  }

  if (existingUser) {
    return "Username existiert bereits.";
  }

  const { data, error: signUpError } = await supabase.auth.signUp({
    email: normalizedEmail,
    password,
    options: {
      data: {
        display_name: normalizedDisplayName,
        username: normalizedUsername,
      },
    },
  });

  if (signUpError) {
    if (signUpError.code === "user_already_exists") {
      return "E-Mail existiert bereits.";
    }

    if (signUpError.code === "weak_password") {
      return "Das Passwort ist zu schwach.";
    }

    return "Bei der Registrierung ist ein Fehler aufgetreten.";
  }

  if (!data.user) {
    return "Bei der Registrierung ist ein Fehler aufgetreten.";
  }

  redirect("/dashboard");
};

export const signIn = async (email: string, password: string) => {
  const supabase = await createSupabaseServerClient();

  const normalizedEmail = email.toLowerCase().trim();

  if (!normalizedEmail) {
    return "Bitte gib deine E-Mail ein.";
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password,
  });

  if (error) return error;

  redirect("/dashboard");
};

export const logOut = async () => {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) return error;

  redirect("/login");
};

export const deleteAccount = async () => {
  const { user } = await getCurrentUser();

  if (!user) redirect("/login");

  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { error } = await adminSupabase.auth.admin.deleteUser(user.id);

  if (error) {
    return { message: error.message };
  }

  await logOut();
};
