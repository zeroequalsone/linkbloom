"use client";
import DeleteLinkModal from "@/components/modals/DeleteLinkModal";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

type DeleteLinkProps = {
  title: string;
  linkId: string;
};

export default function DeleteLink({ linkId, title }: DeleteLinkProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen && (
        <DeleteLinkModal
          linkId={linkId}
          title={title}
          setModalOpen={setModalOpen}
        />
      )}
      <button className="p-1">
        <FaRegTrashAlt
          className="cursor-pointer hover:text-cream-6"
          onClick={() => setModalOpen(true)}
        />
      </button>
    </>
  );
}
