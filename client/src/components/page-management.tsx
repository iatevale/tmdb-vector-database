"use client";
import { useConfirm, usePrompt } from "@/contexts/dialog";
import { Plus, X } from "lucide-react";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PageManagement = ({ slug }: { slug: string }) => {
  const confirm = useConfirm();
  const prompt = usePrompt();
  const { data: session } = useSession();
  const router = useRouter();

  if (!session?.user?.email) {
    return null;
  }

  const confirmDelete = async () => {
    const confirmed = await confirm({
      title: "Borrar peli",
      body: "¿Seguro que quieres hacer eso?",
      cancelButton: "Me lo pienso...",
    });

    if (confirmed) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/protected/?slug=${slug}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/");
    }
  };

  const add = async () => {
    const id = await prompt({
      title: "Añadir peli TMDB",
      body: "Necesito el ID de la peli de TMDB...",
      defaultValue: "",
    }); // string | false

    if (id) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/protected/?id=${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      const data = await response.json();
      if (data.status === 200) {
        router.push(`/peli/${data.movie.title_slug}`);
      } else {
        console.error(data);
      }
    }
  };

  return (
    <div className="flex w-full justify-end mt-4 gap-4 hover:text-red-800 cursor-pointer">
      <Plus className="w-4 h-4" onClick={add} />
      <X className="w-4 h-4" onClick={confirmDelete} />
    </div>
  );
};

export default PageManagement;
