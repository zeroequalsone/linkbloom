import { supabase } from "../supabase/supabase-client";

export const signUp = async (
  email: string,
  password: string,
  displayName: string,
  username: string,
) => {
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
};

export const signIn = async (email: string, password: string) => {
  const normalizedEmail = email.toLowerCase().trim();

  if (!normalizedEmail) {
    return "Bitte gib deine E-Mail ein.";
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password,
  });

  if (error) return error;
};

export const logOut = async () => {
  return await supabase.auth.signOut();
};
