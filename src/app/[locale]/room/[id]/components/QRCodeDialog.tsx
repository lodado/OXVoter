'use client'

import React, { useState } from 'react';
import QRCode from 'react-qr-code';

import { Button } from '@/shared/ui';
import { AlertDialog } from '@/shared/ui/Dialog';

const QRCodeDialog = () => {
  const [isVisible, setVisible] = useState(false);

  return (
    <>        
      <Button
         variant="primaryLine"
        className="border-slate-600 body-2 rounded-md h-10 text-slate-200 hover:bg-slate-700"
        type="button"
      
        onClick={() => {
          setVisible(true);
        }}
      >
        QR
      </Button>
      <AlertDialog isVisible={isVisible} onChangeVisible={setVisible}>
        <AlertDialog.Header>QR Code</AlertDialog.Header>
        <AlertDialog.Body className="w-full mb-10 flex justify-center items-center"> 
          <QRCode
          value={typeof window !== "undefined" ? window.location.href : ""}
          size={200}
          fgColor={"#fff"}
          bgColor={"inherit"}
          level="H" // 오류 정정 레벨: L, M, Q, H
         
        /></AlertDialog.Body>
        
      </AlertDialog>
     
    </>
  );
};

export default QRCodeDialog;
