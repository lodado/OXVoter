"use client";

import VocabularyInput from "./VocabularyInput";
import VocabularyList from "./VocabularyList";

const VocabularyContainer = () => {
  return (
    <div className="w-full space-y-6">
      <VocabularyInput />
      <VocabularyList />
    </div>
  );
};

export default VocabularyContainer;
