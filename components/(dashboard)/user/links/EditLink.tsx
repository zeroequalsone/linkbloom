"use client";
import EditLinkModal from "@/components/modals/EditLinkModal";
import { useState } from "react";
import { HiPencilAlt } from "react-icons/hi";

type EditLinkProps = {
  linkId: string;
  title: string;
  url: string;
};

export default function EditLink({ linkId, title, url }: EditLinkProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen && (
        <EditLinkModal
          linkId={linkId}
          title={title}
          url={url}
          setModalOpen={setModalOpen}
        />
      )}
      <button className="p-1">
        <HiPencilAlt
          className="cursor-pointer hover:text-cream-6"
          onClick={() => setModalOpen(true)}
        />
      </button>
    </>
  );
}
