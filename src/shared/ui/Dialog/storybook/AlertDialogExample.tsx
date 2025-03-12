import React, { useState } from "react";

import { AlertDialog } from "../AlertDialog";

const AlertDialogExample = () => {
  const [isVisible, setVisible] = useState(false);

  return (
    <>
      <button
        style={{ width: "70px", height: "70px", background: "red", margin: "100px" }}
        type="button"
        onClick={() => {
          setVisible(true);
        }}
      >
        click button !
      </button>
      <AlertDialog isVisible={isVisible} onChangeVisible={setVisible}>
        <AlertDialog.Header>Test</AlertDialog.Header>
        <AlertDialog.Body>Test Body</AlertDialog.Body>

        <AlertDialog.SubmitForm submitText="확인" cancelText="취소" onSubmit={async (e) => {}} />
      </AlertDialog>
    </>
  );
};

export default AlertDialogExample;
