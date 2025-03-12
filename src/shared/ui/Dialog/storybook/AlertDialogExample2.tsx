import React, { useState } from "react";

import { AlertDialog } from "../AlertDialog";

const TriggerButton = () => {
  return (
    <button style={{ width: "70px", height: "70px", background: "red", margin: "100px" }} type="button">
      click button !
    </button>
  );
};

const AlertDialogExample2 = () => {
  return (
    <>
      <AlertDialog Trigger={TriggerButton}>
        <AlertDialog.Header>Test</AlertDialog.Header>
        <AlertDialog.Body>Test Body</AlertDialog.Body>
        <AlertDialog.SubmitForm submitText="확인" cancelText="취소" onSubmit={async (e) => {}} />
      </AlertDialog>
    </>
  );
};

export default AlertDialogExample2;
