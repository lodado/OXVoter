import React from "react";

import { Word } from "@/entities/Words";
import { request } from "@/shared";

export const getVocabularyMeaning = async ({ newWord }: { newWord: string }) => {
  // Check if the word exists in the dictionary first
  const response = await request<Word>({
    method: "GET",
    url: `https://api.dictionaryapi.dev/api/v2/entries/en/${newWord.trim().toLowerCase()}`,
  });

  return response;
};
