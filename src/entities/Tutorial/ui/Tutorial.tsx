"use client";

import "./style.scss";

import { ComponentProps, useEffect, useMemo } from "react";
import { preload } from "react-dom";
import Joyride, { CallBackProps, STATUS } from "react-joyride";

import { useIsClient } from "@/shared/hooks";

import { TutorialStep, useTutorialStore } from "../stores";

interface ReactTutorialProps extends Omit<ComponentProps<typeof Joyride>, "run"> {
  steps: TutorialStep[];
}

interface JoyrideCallbackData extends CallBackProps {}

const defaultOptions = {
  backgroundColor: "transparent",
  beaconSize: 36,
  overlayColor: "rgba(0, 0, 0, 0.5)",
  primaryColor: "var(--Primary-01)",
  spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
  textColor: "var(--Text-00)",
  width: "max-content",
  height: "max-content",
};

const Tutorial = ({ steps, ...rest }: ReactTutorialProps) => {
  const isClient = useIsClient();
  const { run, setRuns } = useTutorialStore();

  const handleJoyrideCallback = (data: JoyrideCallbackData) => {
    const { lifecycle, status, index, type } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    const step = steps[index];

    if (type === "step:before") {
      step.callbackBeforeStart?.(index);

      /* 
          Using querySelector in React might feel nasty,
          but since react-joyride uses element Id as targets, 
          it's effective in this case.
        */
      const element = document.querySelector(step.target);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    if (type === "step:after") {
      step.callbackAfterStart?.(index);
    }

    // @ts-ignore
    if (finishedStatuses.includes(status)) {
      setRuns(false);
    }
  };

  const preprocessedSteps = useMemo(() => {
    return steps.map((step) => {
      return {
        ...step,
      };
    });
  }, [steps]);

  useEffect(() => {
    /** cursor image preload */
    preload("https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage//finger.webp", {
      as: "image",
      fetchPriority: "low",
    });
  }, []);

  return (
    <>
      {isClient && (
        <Joyride
          steps={preprocessedSteps}
          continuous={false} // Next 버튼 제거
          showProgress={false} // 진행 상황 숨김
          showSkipButton={false} // Skip 버튼 숨김
          run={run}
          scrollToFirstStep={false}
          disableScrolling={true}
          floaterProps={{}}
          styles={{
            options: defaultOptions,
            tooltip: {},
            buttonNext: {
              display: "none", // Next 버튼 숨기기
            },
            buttonBack: {
              display: "none", // Back 버튼 숨기기
            },
            buttonClose: {
              display: "none", // 닫기 버튼 숨기기
            },
          }}
          {...rest}
          callback={handleJoyrideCallback}
        />
      )}
    </>
  );
};

export default Tutorial;
