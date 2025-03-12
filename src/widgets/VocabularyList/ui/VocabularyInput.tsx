"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import useWordMutation from "@/entities/Words/hooks/useWordMutation";
import { Button, Card, Input } from "@/shared/ui";

const VocabularyInput = () => {
  const [newWord, setNewWord] = useState("");
  const { handleAddWord } = useWordMutation({ onSuccessCallback: () => setNewWord("") });

  return (
    <Card>
      <Card.Header>
        <Card.Title>단어 추가</Card.Title>
        <Card.Description>직접 단어를 입력하여 단어장에 추가하세요.</Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="flex items-center gap-2">
          <Input
            className="h-4"
            value={newWord}
            setValue={(newValue) => setNewWord(newValue)}
            placeholder="새 단어 입력"
            onKeyDown={(e) => e.key === "Enter" && handleAddWord(newWord)}
          />
          <Button className="h-full" onClick={() => handleAddWord(newWord)}>
            <Plus className="w-4 h-4 mr-2" />
            추가
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default VocabularyInput;
