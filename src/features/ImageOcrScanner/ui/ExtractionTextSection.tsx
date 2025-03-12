"use client";

import { Plus } from "lucide-react";
import React, { memo, useCallback } from "react";

import useWordMutation from "@/entities/Words/hooks/useWordMutation";
import { Button, Card, TextArea } from "@/shared/ui";

import { useImageScanner } from "./ImageScannerProvider";

const ClickableWordList = memo(() => {
  const { extractedText, selectedWords, handleWordClick } = useImageScanner();

  if (!extractedText) return null;
  const words = extractedText.split(/\s+/);
  return (
    <div className="flex flex-wrap gap-1 mt-4">
      {words.map((word, index) => {
        const cleanWord = word.replace(/[^\w\s]/gi, "").trim();
        const isSelected = selectedWords.includes(cleanWord);
        return (
          <span
            key={index}
            onClick={() => handleWordClick(cleanWord)}
            className={`cursor-pointer px-1 py-0.5 rounded ${
              isSelected ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
});

export const ExtractedTextSection: React.FC = () => {
  const { extractedText, handleTextAreaChange, selectedWords, addSelectedWords, handleWordClick } = useImageScanner();

  if (!extractedText) return null;

  return (
    <Card>
      <Card.Header>
        <Card.Title>추출된 텍스트</Card.Title>
        <Card.Description>단어를 클릭하여 선택하고 단어장에 추가하세요.</Card.Description>
      </Card.Header>
      <Card.Content className="space-y-4">
        <TextArea value={extractedText} onChange={handleTextAreaChange} className="min-h-[100px]" />
        <ClickableWordList />
        {selectedWords.length > 0 && (
          <div className="mt-4 space-y-2">
            <div className="flex flex-wrap gap-2">
              {selectedWords.map((word, index) => (
                <span key={index}>{word}</span>
              ))}
            </div>
            <Button variant="custom" onClick={addSelectedWords} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              선택한 단어 추가하기 ({selectedWords.length})
            </Button>
          </div>
        )}
      </Card.Content>
    </Card>
  );
};
