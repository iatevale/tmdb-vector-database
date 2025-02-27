"use client";

import { createContext, useEffect, useState } from "react";

type EmbeddingProviderProps = {
  children: React.ReactNode;
  defaultEmbedding?: string;
  storageKey?: string;
};

export type EmbeddingProviderState = {
  embedding: string;
  setEmbedding: (embedding: string) => void;
};

const initialState = {
  embedding: "openai",
  setEmbedding: () => null,
};

export const EmbeddingProviderContext =
  createContext<EmbeddingProviderState>(initialState);

export function EmbeddingProvider({
  children,
  defaultEmbedding = "openai",
  storageKey = "shadcn-ui-embedding",
  ...props
}: EmbeddingProviderProps) {
  const [embedding, setEmbedding] = useState<string>(defaultEmbedding);

  useEffect(() => {
    const lsEmbedding = localStorage.getItem(storageKey) ?? defaultEmbedding;
    setEmbedding(lsEmbedding);
  }, [defaultEmbedding, storageKey]);

  return (
    <EmbeddingProviderContext.Provider
      {...props}
      value={{
        embedding,
        setEmbedding: (embedding: string) => {
          localStorage.setItem(storageKey, embedding);
          setEmbedding(embedding);
        },
      }}
    >
      {children}
    </EmbeddingProviderContext.Provider>
  );
}
