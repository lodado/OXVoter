// store/tutorialStore.ts
import { ReactNode } from "react";
import { Step } from "react-joyride";
import { create } from "zustand";

export interface TutorialStep extends Step {
  target: string;
  content: ReactNode;
  locale?: {
    skip: ReactNode;
  };
  disableBeacon: boolean;

  callbackBeforeStart?: (index: number) => void;
  callbackAfterStart?: (index: number) => void;
}

export interface TutorialStoreState {
  steps: TutorialStep[];
  setSteps: (steps: TutorialStep[]) => void;

  run: boolean;
  setRuns: (newRunState: boolean) => void;
}

export const useTutorialStore = create<TutorialStoreState>((set) => ({
  // 초기 상태
  steps: [],
  run: false,

  // steps 설정 함수
  setSteps: (newSteps) => set({ steps: newSteps }),

  setRuns: (newRunState: boolean) => set({ run: newRunState }),
}));
