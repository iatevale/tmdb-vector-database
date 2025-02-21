"use client";

import React from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { EmbeddingProviderContext } from "@/contexts/embedding";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const EmbeddingSelector = () => {
  const { embedding, setEmbedding } = React.useContext(
    EmbeddingProviderContext
  );
  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("embedding", embedding);
    router.replace(`?${params.toString()}`);
  }, [embedding, router, searchParams]);

  return (
    <div className="flex flex-col w-full gap-2">
      <ToggleGroup onValueChange={setEmbedding} value={embedding} type="single">
        <ToggleGroupItem value="ollama" className="py-4">
          Ollama
        </ToggleGroupItem>
        <ToggleGroupItem value="deepseek" className="py-4">
          DeepSeek
        </ToggleGroupItem>
        <ToggleGroupItem value="openai" className="py-4">
          OpenAI
        </ToggleGroupItem>
        <ToggleGroupItem value="vertex" className="py-4">
          Google
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default EmbeddingSelector;
