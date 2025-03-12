"use client";

import React from "react";

import { ExtractedTextSection } from "./ExtractionTextSection";
import { ImageScannerProvider } from "./ImageScannerProvider";
import { ImageUploadSection } from "./ImageUploadSection";

interface ImageScannerProps {}

const ImageOcrScanner: React.FC<ImageScannerProps> = ({}) => {
  return (
    <ImageScannerProvider onWordDetected={() => {}}>
      <>
        <ImageUploadSection />
        <ExtractedTextSection />
      </>
    </ImageScannerProvider>
  );
};

export default ImageOcrScanner;
