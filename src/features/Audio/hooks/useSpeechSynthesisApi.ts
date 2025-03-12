import { useToastStore } from "@/shared/ui/Toast/stores";

export const useSpeechSynthesisApi = ({ setIsPlaying }: { setIsPlaying?: (isPlaying: boolean) => void }) => {
  const { addToast } = useToastStore();

  const handleSpeakWord = (text: string) => {
    // Check if speech synthesis is available
    if (!window.speechSynthesis) {
      addToast({
        type: "error",
        title: "Speech synthesis not supported",
        description: "Your browser does not support speech synthesis.",
      });
      return;
    }

    // Stop any current speech
    window.speechSynthesis.cancel();

    // Create a new speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9; // Slightly slower for better clarity

    // Set speaking state
    setIsPlaying?.(true);

    // Add event listeners
    utterance.onend = () => {
      setIsPlaying?.(false);
    };

    utterance.onerror = () => {
      setIsPlaying?.(false);
      addToast({
        title: "Speech synthesis error",
        description: "There was an error playing the pronunciation.",
        type: "error",
      });
    };

    // Speak the word
    window.speechSynthesis.speak(utterance);
  };

  return { handleSpeakWord };
};
