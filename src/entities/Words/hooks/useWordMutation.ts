import { useMutationWithNotification } from "@/shared/hooks";
import { getVocabularyMeaning } from "@/widgets/VocabularyList/api/getVocabulary";

import { useWordStore } from "../stores";

interface UseWordMutationProps {
  onSuccessCallback?: (newWord?: string) => void;
}

const useWordMutation = ({ onSuccessCallback }: UseWordMutationProps) => {
  const { words, addWord, removeWord } = useWordStore();

  const mutation = useMutationWithNotification(
    {
      isDebounceEnabled: false,

      mutationFn: async (newWord: string) => {
        if (words.find((word) => word.word === newWord)) {
          throw new Error("이미 추가된 단어입니다.");
        }

        return await getVocabularyMeaning({ newWord });
      },
      onSuccess: (data, newWord) => {
        addWord(data);
        onSuccessCallback?.(newWord);
      },
      onError: (error: any) => {
        onSuccessCallback?.("");
      },
    },

    {
      title: "단어 추가 실패",
      description: "단어를 추가하는 중에 문제가 발생했습니다. 다시 시도해주세요.",
    }
  );

  return { handleAddWord: mutation.mutate, handleRemoveWord: removeWord };
};

export default useWordMutation;
