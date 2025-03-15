import { AnimatePresence } from "motion/react";
import React from "react";

import { Dialog, DialogProps } from "../components/compound";

export interface DialogTemplateProps extends DialogProps {
  Trigger?: () => JSX.Element;
}

export const DialogTemplate = ({
  Trigger,
  className,
  children,
  isVisible,
  swipePercent,
  onChangeVisible,
}: DialogTemplateProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <Dialog swipePercent={swipePercent} isVisible={isVisible} onChangeVisible={onChangeVisible}>
          <Dialog.Root>
            {Trigger && (
              <Dialog.Trigger asChild>
                <Trigger />
              </Dialog.Trigger>
            )}

            <Dialog.Content className={className}>{children}</Dialog.Content>
          </Dialog.Root>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
DialogTemplate.displayName = "Dialog";
