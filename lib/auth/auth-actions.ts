"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient, getCurrentUser } from "../supabase/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "../supabase/admin";
import { revalidatePath } from "next/cache";

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

  // TODO: Return custom error message
  if (error) return error;

  redirect("/dashboard");
};

export const logOut = async () => {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  // TODO: Return custom error message
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

  // TODO: Return custom error message
  if (error) {
    return { message: error.message };
  }

  await logOut();
};

export const updateProfile = async (formData: FormData) => {
  const { user } = await getCurrentUser();

  if (!user) return "Nicht authentifiziert.";

  const displayName = (formData.get("displayName") as string) ?? "";
  const username = (formData.get("username") as string) ?? "";
  const email = (formData.get("email") as string) ?? "";

  const normalizedDisplayName = displayName.trim();
  const normalizedUsername = username.toLowerCase().trim();
  const normalizedEmail = email.toLowerCase().trim();

  if (!normalizedDisplayName) return "Bitte gib deinen Namen ein.";
  if (!normalizedUsername) return "Bitte gib deinen Usernamen ein.";
  if (!normalizedEmail) return "Bitte gib deine E-Mail ein.";

  if (normalizedDisplayName.length > 40)
    return "Der Name darf maximal 40 Zeichen lang sein.";
  if (normalizedUsername.length < 3 || normalizedUsername.length > 20)
    return "Der Username muss zwischen 3 und 20 Zeichen lang sein.";

  const strictEmailRegex =
    /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*\@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!strictEmailRegex.test(normalizedEmail))
    return "Bitte gib eine gültige E-Mail ein.";

  if (!/^[a-z0-9]+$/.test(normalizedUsername))
    return "Der Username darf nur Kleinbuchstaben und Zahlen enthalten.";

  const { data: usernameTaken } = await supabaseAdmin
    .from("profiles")
    .select("user_id")
    .eq("username", normalizedUsername)
    .neq("user_id", user.id)
    .maybeSingle();

  if (usernameTaken) return "Dieser Username ist bereits vergeben.";

  const { data: emailTaken } = await supabaseAdmin.rpc("check_email_exists", {
    email_to_check: normalizedEmail,
    current_user_id: user.id,
  });

  if (emailTaken) return "Diese E-Mail ist bereits vergeben.";

  const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
    user.id,
    {
      email: normalizedEmail,
      email_confirm: true,
      user_metadata: {
        email: normalizedEmail,
        display_name: normalizedDisplayName,
        username: normalizedUsername,
      },
    },
  );

  if (authError) return "Profil konnte nicht aktualisiert werden.";

  revalidatePath("/dashboard/settings");
};

export const updatePassword = async (formData: FormData) => {
  const { user } = await getCurrentUser();

  if (!user || !user.email) return "Nicht authentifiziert.";

  const supabase = await createSupabaseServerClient();

  const currentPassword = (formData.get("currentPassword") as string) ?? "";
  const newPassword = (formData.get("newPassword") as string) ?? "";
  const confirmPassword = (formData.get("confirmPassword") as string) ?? "";

  if (!currentPassword) return "Bitte gib dein aktuelles Passwort ein.";
  if (!newPassword) return "Bitte gib dein neues Passwort ein.";
  if (!confirmPassword) return "Bitte bestätige dein neues Passwort.";

  if (newPassword.length < 8) {
    return "Mindestens 8 Zeichen (Groß-/Kleinbuchstaben, Zahl, Sonderzeichen).";
  }

  if (newPassword === currentPassword) {
    return "Das neue Passwort darf nicht mit dem alten identisch sein.";
  }

  if (newPassword !== confirmPassword) {
    return "Die neuen Passwörter stimmen nicht überein.";
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (signInError) {
    return "Das aktuelle Passwort ist falsch.";
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    if (updateError.code === "same_password") {
      return "Das neue Passwort darf nicht mit dem alten identisch sein.";
    }
    return "Passwort erfüllt nicht die Sicherheitsanforderungen oder konnte nicht geändert werden.";
  }

  revalidatePath("/dashboard/settings");
};
