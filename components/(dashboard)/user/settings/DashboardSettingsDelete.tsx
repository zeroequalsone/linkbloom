"use client";
import DeleteAccountModal from "@/components/modals/settings/DeleteAccountModal";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function DashboardSettingsDelete() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="bg-cream-2 p-6 rounded-xl mb-5.5">
      <p className="text-lg font-fraunces font-semibold">Konto löschen</p>
      <p className="font-light text-cream-4 text-sm mb-4">
        Löscht deine Seite, alle Links und Statistiken unwiderruflich. Diese
        Aktion kann nicht rückgängig gemacht werden.
      </p>
      {modalOpen && <DeleteAccountModal setModalOpen={setModalOpen} />}
      <button
        onClick={() => setModalOpen(true)}
        className="flex gap-2 p-3 text-xs font-semibold rounded-xl bg-cream-6 hover:bg-cream-5 active:bg-cream-4 text-cream-2 cursor-pointer"
      >
        <FaRegTrashAlt size={16} />
        Konto endgültig löschen
      </button>
    </section>
  );
}
