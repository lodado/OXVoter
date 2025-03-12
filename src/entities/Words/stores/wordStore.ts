"use client";

import { create } from "zustand";

import { Word } from "./type";

interface wordState {
  words: Word[];
  addWord: (word: Word | Word[]) => void;
  removeWord: (id: string) => void;
}

export const useWordStore = create<wordState>((set) => ({
  words: [],

  addWord: (newWord) =>
    set((state) => {
      const newWordArray = Array.isArray(newWord) ? newWord : [newWord];

      return {
        words: [...state.words, ...newWordArray.map((word) => ({ ...word, id: `${Date.now()}${word.word}` }))],
      };
    }),

  removeWord: (id) =>
    set((state) => ({
      words: state.words.filter((word) => word.id !== id),
    })),
}));
