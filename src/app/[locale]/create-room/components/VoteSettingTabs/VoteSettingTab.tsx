"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { Button, RadioGroup, Tab } from "@/shared/ui";
import { AlertDialog } from "@/shared/ui/Dialog";

import { RawVoteProvider, useVoteContext } from "./VoteProvider";

const VoteSettingTab = () => {
  const { options, selectedOptions, setSelectedOptions } = useVoteContext();

  const tDialog = useTranslations("DIALOG");
  const [initSelectedOptions, setInitSelectedOptions] = useState(selectedOptions);

  return (
    <RawVoteProvider
      options={options}
      selectedOptions={initSelectedOptions}
      setSelectedOptions={setInitSelectedOptions}
    >
      <Tab.Content value="tab0" className="h-full py-4">
        <div className="h-full">
          <div className="flex flex-col gap-4">
            <RadioGroup
              value={initSelectedOptions.id}
              onValueChange={(newSelectedOption) => {
                setInitSelectedOptions(options.find((option) => option.id === newSelectedOption)!);
              }}
            >
              <div className="flex flex-col gap-3">
                {options.map((option) => (
                  <div
                    key={option.id}
                    className="flex h-full items-center px-2 rounded-lg border border-slate-700 p-3 hover:bg-slate-700/30"
                  >
                    <RadioGroup.Label
                      htmlFor={option.id}
                      className="flex flex-col items-start flex-1 gap-2 cursor-pointer"
                    >
                      <div className="flex flex-row items-center gap-3">
                        <RadioGroup.Item id={option.id} value={option.id} className=" h-full border-slate-500" />

                        <div className="flex flex-col">
                          <span className="w-full head-3 text-text-01">{option.text}</span>
                          <span className="pl-1 body-1 text-text-02">{option.description}</span>
                        </div>
                      </div>
                    </RadioGroup.Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>

        <AlertDialog.SubmitForm
          className="sticky bottom-4 left-0 right-0 px-4 w-full"
          submitText={tDialog("SUBMITTEXT")}
          cancelText={tDialog("CANCELTEXT")}
          onSubmit={async (e) => {
            // handleOpenChange(false);
            setSelectedOptions(initSelectedOptions);
          }}
          isCloseOnSubmit={false}
        />
      </Tab.Content>
    </RawVoteProvider>
  );
};

export default VoteSettingTab;
