import { getCurrentUser } from "@/lib/auth/auth-server";
import { FaRegEnvelope, FaRegImage } from "react-icons/fa6";
import { IoBagOutline } from "react-icons/io5";
import { LuMusic } from "react-icons/lu";
import CreateLink from "./CreateLink";
import DeleteLink from "./DeleteLink";
import EditLink from "./EditLink";
import Switch from "./Switch";

type Link = {
  id: string;
  title: string;
  url: string;
  enabled: boolean;
};

export default async function DashboardLinks() {
  const { user, supabase } = await getCurrentUser();

  const { data }: { data: Link[] | null } = await supabase
    .from("links")
    .select("*")
    .order("id", { ascending: false })
    .eq("user_id", user?.id);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-fraunces font-semibold">Links</p>
        <CreateLink />
      </div>

      <div className="flex flex-col gap-2.5">
        {data &&
          data.map((link) => (
            <div
              key={link.id}
              className="flex items-center justify-between border hover:border-cream-3 border-cream-3/25 rounded-xl px-4 py-3.5 select-none"
            >
              <div className="flex items-center gap-3.5">
                <div className="bg-cream-2 p-3 rounded-xl"></div>
                <div>
                  <p className="text-sm font-semibold">{link.title}</p>
                  <p className="text-xs text-cream-4">{link.url}</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-cream-4">
                <Switch linkId={link.id} enabled={link.enabled} />
                <EditLink linkId={link.id} title={link.title} url={link.url} />
                <DeleteLink linkId={link.id} title={link.title} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
