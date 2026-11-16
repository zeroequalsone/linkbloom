import RegisterForm from "@/components/auth/RegisterForm";
import { REGISTRATION_DISABLED } from "@/lib/auth/registration";
import { redirect } from "next/navigation";

export default function Register() {
  if (REGISTRATION_DISABLED) redirect("/login");

  return <RegisterForm />;
}
