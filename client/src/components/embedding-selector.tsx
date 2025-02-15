import React from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

const EmbeddingSelector = ({
  embedding,
  setEmbedding,
}: {
  embedding: string;
  setEmbedding: (value: string) => void;
}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <p className="mb-2 mt-2">Embeddings</p>
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
