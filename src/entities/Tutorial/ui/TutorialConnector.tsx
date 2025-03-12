"use client";

import { useLayoutEffect } from "react";

import { TutorialStep, useTutorialStore } from "../stores/tutorialStore";
import Tutorial from "./Tutorial";

interface TutorialConnectorProps {
  steps: TutorialStep[];
}

const TutorialConnector = ({ steps: initSteps }: TutorialConnectorProps) => {
  const { steps: steps, setSteps } = useTutorialStore();

  useLayoutEffect(() => {
    setSteps(initSteps);
  }, [initSteps, setSteps]);

  return <Tutorial steps={steps} />;
};

export default TutorialConnector;
