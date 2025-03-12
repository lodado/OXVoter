"use client";

import { Search, Trash2 } from "lucide-react";
import { useState } from "react";

import { useWordStore } from "@/entities/Words";
import useWordMutation from "@/entities/Words/hooks/useWordMutation";
import { AudioPlayer } from "@/features/Audio/ui";
import { BadgeButton, Button, Card, Input } from "@/shared/ui";
import { Accordion } from "@/shared/ui/Accordion/ui";

const VocabularyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { words } = useWordStore();

  const filteredWords = words.filter((word) => word.word.toLowerCase().includes(searchTerm.toLowerCase()));

  const { handleRemoveWord } = useWordMutation({});

  return (
    <Card>
      <Card.Header>
        <Card.Title>내 단어장</Card.Title>
        <Card.Description>저장된 단어 목록 ({words.length}개)</Card.Description>
      </Card.Header>
      <Card.Content className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            value={searchTerm}
            setValue={(newValue) => setSearchTerm(newValue)}
            placeholder="단어 검색"
            className="pl-10"
          />
        </div>

        {filteredWords.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {searchTerm ? "검색 결과가 없습니다." : "단어장이 비어 있습니다."}
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {filteredWords.map((word) => (
              <Accordion.Item key={word.id} value={word.id}>
                <Accordion.Trigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{word.word}</span>
                      {word.phonetic && <span className="text-sm text-muted-foreground">{word.phonetic}</span>}
                      <AudioPlayer word={word.word} audioUrl={word.audioUrl} />
                    </div>
                    <Button
                      variant="custom"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveWord(word.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Accordion.Trigger>
                <Accordion.Content>
                  <div className="space-y-4 pt-2">
                    {word.meanings?.map((meaning, index: number) => (
                      <div key={index} className="flex flex-col gap-2">
                        <BadgeButton className="w-max px-2">{meaning.partOfSpeech}</BadgeButton>
                        <ol className="flex flex-col gap-2 text-sm">
                          {meaning.definitions.map((definition, index: number) => (
                            <li key={index}>
                              <div>
                                <span>{index + 1}.</span> <span>{definition.definition}</span>
                              </div>
                              {definition?.example && (
                                <span className="body-1 text-sm text-muted-foreground italic">
                                  example - {definition?.example}
                                </span>
                              )}
                            </li>
                          ))}
                        </ol>
                      </div>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </Card.Content>
    </Card>
  );
};

export default VocabularyList;
