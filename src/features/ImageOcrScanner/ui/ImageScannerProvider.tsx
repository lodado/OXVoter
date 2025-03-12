"use client";
 
import React, { createContext, useContext, useState } from "react";
import { createWorker } from "tesseract.js";

import { useWordMutation } from "@/entities";

import { OCRResult, parseTesseractTSVFromString } from "../utils/parseTesseractTSVFromString";

interface ImageScannerContextType {
  isProcessing: boolean;
  imageUrl: string | null;
  extractedText: string;
  selectedWords: string[];
  wordDetectedCoord: Tesseract.Word[];

  processImage: () => Promise<void>;
  handleWordClick: (word: string) => void;
  addSelectedWords: () => void;
  handleTextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setExtractedText: React.Dispatch<React.SetStateAction<string>>;
  setSelectedWords: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageScannerContext = createContext<ImageScannerContextType | undefined>(undefined);

interface ProviderProps {
  lang?: string;
  onWordDetected: (word: string) => void;
  children: React.ReactNode;
}

export const ImageScannerProvider: React.FC<ProviderProps> = ({ lang = "eng", onWordDetected, children }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [wordDetectedCoord, setWordDetectedCoord] = useState<Tesseract.Word[]>([]);

  const { handleAddWord } = useWordMutation({ onSuccessCallback: () => {} });

  const processImage = async () => {
    if (!imageUrl) return;
    setIsProcessing(true);
    try {
      const worker = await createWorker(lang);
      const result = await worker.recognize(imageUrl, {}, { blocks: true });
      /*
      // Array of paragraphs
      const paragraphs = result.data.blocks.map((block) => block.paragraphs).flat();
      
      // Array of lines
      const lines = result.data.blocks.map((block) => block.paragraphs.map((paragraph) => paragraph.lines)).flat(2);
      */

      // Array of words
      const words = (result.data.blocks ?? [])
        .map((block) => block.paragraphs.map((paragraph) => paragraph.lines.map((line) => line.words)))
        .flat(3);
      /* 
      // Array of symbols
      const symbols = result.data.blocks
        .map((block) =>
          block.paragraphs.map((paragraph) => paragraph.lines.map((line) => line.words.map((word) => word.symbols)))
        )
        .flat(4);
      */

      setExtractedText(result.data.text);
      setWordDetectedCoord(words);

      await worker.terminate();
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWordClick = (word: string) => {
    if (!word || word.trim() === "") return;
    const cleanWord = word.replace(/[^\w\s]/gi, "").trim();
    if (cleanWord === "") return;
    if (selectedWords.includes(cleanWord)) {
      setSelectedWords((prev) => prev.filter((w) => w !== cleanWord));
    } else {
      setSelectedWords((prev) => [...prev, cleanWord]);
    }
  };

  const addSelectedWords = () => {
    selectedWords.forEach((word) => {
      handleAddWord(word);
      onWordDetected(word);
    });
    setSelectedWords([]);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExtractedText(e.target.value);
  };

  return (
    <ImageScannerContext.Provider
      value={{
        isProcessing,
        imageUrl,
        extractedText,
        selectedWords,
        wordDetectedCoord,

        processImage,
        handleWordClick,
        addSelectedWords,
        handleTextAreaChange,
        setImageUrl,
        setExtractedText,
        setSelectedWords,
      }}
    >
      {children}
    </ImageScannerContext.Provider>
  );
};

export const useImageScanner = () => {
  const context = useContext(ImageScannerContext);
  if (context === undefined) {
    throw new Error("useImageScanner must be used within an ImageScannerProvider");
  }
  return context;
};
