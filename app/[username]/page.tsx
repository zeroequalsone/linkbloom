import Button from "@/components/ui/Button";
import {
  createSupabaseServerClient,
  getCurrentUser,
} from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaImage } from "react-icons/fa";

type UserProfilePageProps = {
  params: Promise<{ username: string }>;
};

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  const { username } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .eq("public", true)
    .maybeSingle();

  if (!user) notFound();

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .order("id", { ascending: false })
    .eq("user_id", user.user_id)
    .eq("enabled", true);

  const displayName = user.display_name;
  const displayNameInitial = displayName.charAt(0);

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.user_id)
    .single();

  const { user: loggedInUser } = await getCurrentUser();

  const description = profile.description;
  const theme = profile.theme;
  const font = profile.font;
  const buttonStyle = profile.button_style;

  return (
    <div className="p-8">
      <div
        className={`relative flex flex-col lg:max-w-md max-w-xs mx-auto items-center justify-center gap-12 py-8 mt-8 mb-16 rounded-2xl
        ${theme === "bloom" ? "text-cream-4" : ""}
        ${theme === "meadow" ? "text-mint-4 bg-mint-1" : ""}
        ${theme === "caramel" ? "text-cream-5 bg-cream-2" : ""}
        ${theme === "morningDew" ? "text-mint-3" : ""}`}
      >
        <div className="flex flex-col items-center">
          <div
            className={`flex items-center justify-center rounded-full size-24 text-4xl mb-4
            ${theme === "bloom" ? "bg-cream-2" : ""}
            ${theme === "meadow" ? "bg-cream-1" : ""}
            ${theme === "caramel" ? "bg-cream-1" : ""}
            ${theme === "morningDew" ? "bg-mint-1" : ""}`}
          >
            {displayNameInitial}
          </div>
          {username === loggedInUser?.user_metadata.username && (
            <div className="absolute top-0 right-0 -translate-x-4 translate-y-4 lg:text-xs text-[10px]">
              <Button variant={1} title="Bearbeiten" href="/dashboard" />
            </div>
          )}
          <p
            className={`text-2xl font-semibold mb-3
            ${font === "elegant" && "font-fraunces italic"}
            ${font === "playful" && "font-caveat text-4xl"}`}
          >
            {displayName}
          </p>

          {description && (
            <p className="text-cream-4 font-light text-sm text-center max-w-xs">
              {description}
            </p>
          )}
        </div>
        <div className="flex flex-col items-center gap-3 lg:w-xs w-3xs">
          {links && links.length >= 1 ? (
            links.slice(0, 5).map((link) => (
              <Link
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex gap-4 items-center w-full
                  ${buttonStyle === "filled" ? "hover:bg-mint-3 active:bg-mint-2 bg-mint-4 text-white px-5.5 py-2 rounded-lg cursor-pointer" : ""}
                  ${buttonStyle === "outlined" ? "bg-cream-1 hover:bg-cream-3 hover:border-transparent active:bg-cream-3/50 border-2 border-cream-3 px-5.5 py-2 rounded-lg cursor-pointer" : ""}
                  ${buttonStyle === "soft" ? " text-cream-5 font-medium px-5.5 py-2 rounded-xl cursor-pointer hover:text-cream-6 bg-cream-2" : ""}`}
              >
                <FaImage
                  className={`
                  ${buttonStyle === "filled" ? "" : ""}
                  ${buttonStyle === "outlined" ? "" : ""}
                  ${buttonStyle === "outlined" ? "" : ""}`}
                />
                <p className="text-sm">{link.title}</p>
              </Link>
            ))
          ) : (
            <>
              <Image
                src={"/golden-pothos.png"}
                alt="Golden Pothos Plant Image"
                height={48}
                width={48}
                loading="eager"
              ></Image>
              <p className="font-fraunces text-cream-6 font-semibold">
                Hier wachsen bald Links
              </p>
              <p className="text-sm text-cream-4 text-center max-w-2xs">
                Sobald {displayName.split(" ")[0]} welche hinzufügt, tauchen sie
                hier auf.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
