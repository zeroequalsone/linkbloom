"use client";

import CreateLinkModal from "@/components/modals/CreateLinkModal";
import { useState } from "react";

export default function CreateLink() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen && <CreateLinkModal setModalOpen={setModalOpen} />}
      <button
        onClick={() => setModalOpen(true)}
        className="text-white hover:bg-mint-3 active:bg-mint-2 bg-mint-4 py-2.5 px-4.5 rounded-full text-sm font-medium cursor-pointer"
      >
        + Link hinzufügen
      </button>
    </>
  );
}
