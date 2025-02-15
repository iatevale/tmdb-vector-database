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
        <ToggleGroupItem value="ollama" className="py-8">
          Ollama: mxbai-embed-large
        </ToggleGroupItem>
        <ToggleGroupItem value="deepseek" className="py-8">
          VLLM: DeepSeek-R1-Distill-Llama-8B
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default EmbeddingSelector;
