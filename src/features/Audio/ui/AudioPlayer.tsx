"use client";

import { Volume2 } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/shared/ui";
import { useToastStore } from "@/shared/ui/Toast/stores";

import { useSpeechSynthesisApi } from "../hooks/useSpeechSynthesisApi";

interface AudioPlayerProps {
  word: string;
  audioUrl?: string | null;
}

export default function AudioPlayer({ word, audioUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { addToast } = useToastStore();

  const { handleSpeakWord } = useSpeechSynthesisApi({ setIsPlaying });

  useEffect(() => {
    // Create audio element if audioUrl is provided
    if (audioUrl) {
      audioRef.current = new Audio(audioUrl);

      // Add event listeners
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });

      audioRef.current.addEventListener("error", () => {
        setIsPlaying(false);

        addToast({
          title: "Audio error",
          description: "Could not play the pronunciation audio.",
          type: "error",
        });
      });
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", () => {});
        audioRef.current.removeEventListener("error", () => {});
      }
    };
  }, [audioUrl]);

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent accordion from toggling

    // If we have an audio URL, play that
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch((error) => {
          handleSpeakWord(word);
        });

        setIsPlaying(true);
      }
    } else {
      handleSpeakWord(word);
    }
  };

  return (
    <Button variant="custom" className="w-8 h-8" onClick={handlePlayAudio}>
      {isPlaying ? <Volume2 className="h-4 w-4 text-primary-01" /> : <Volume2 className="h-4 w-4" />}
    </Button>
  );
}
