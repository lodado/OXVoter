"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Loader2, Search, Upload } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { Button, Card } from "@/shared/ui";

import { useImageScanner } from "./ImageScannerProvider";

export const ImageUploadSection: React.FC = () => {
  const { isProcessing, wordDetectedCoord, imageUrl, processImage, setImageUrl, setExtractedText, setSelectedWords } =
    useImageScanner();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // 툴팁 상태 관리
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; text: string }>({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setExtractedText("");
      setSelectedWords([]);
    }
  };

  useEffect(() => {
    if (!imageUrl || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = imageUrl;
    imageRef.current = img;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;

      /* 
      Object.entries(wordDetectedCoord).forEach(([key, word]) => {
        const { x0, x1, y0, y1 } = word.bbox;
        const width = x1 - x0;
        const height = y1 - y0;

        ctx.strokeRect(x0, y0, width, height);
      });
      */
    };

    // 마우스 이벤트 핸들러
    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width; // 너비 스케일링 비율
      const scaleY = canvas.height / rect.height; // 높이 스케일링 비율

      // 스케일링 보정된 마우스 좌표 계산
      const mouseX = (event.clientX - rect.left) * scaleX;
      const mouseY = (event.clientY - rect.top) * scaleY;

      let foundWord = { text: "", x: 0, y: 0 };

      Object.entries(wordDetectedCoord).forEach(([key, word]) => {
        const { x0, x1, y0, y1 } = word.bbox;

        if (mouseX >= x0 && mouseX <= x1 && mouseY >= y0 && mouseY <= y1) {
          foundWord = { text: word.text, x: event.offsetX, y: event.offsetY };
        }
      });

      if (foundWord.text !== "") {
        setTooltip({
          visible: true,
          x: foundWord.x,
          y: foundWord.y,
          text: foundWord.text,
        });
      } else {
        //  setTooltip((prev) => ({ ...prev, visible: false }));
      }
    };

    // canvas.addEventListener("mousemove", handleMouseMove);
    return () => {
      // canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [imageUrl, wordDetectedCoord]);

  return (
    <TooltipProvider>
      <Card className="w-full">
        <Card.Header>
          <Card.Title>이미지 스캔</Card.Title>
          <Card.Description>영어 텍스트가 포함된 이미지를 업로드하여 단어를 추출하세요.</Card.Description>
        </Card.Header>
        <Card.Content className="space-y-4">
          <div className="flex items-center gap-4">
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            <Button variant="custom" onClick={() => fileInputRef.current?.click()} className="flex-1">
              <Upload className="w-4 h-4 mr-2" />
              이미지 업로드
            </Button>
            <Button onClick={processImage} disabled={!imageUrl || isProcessing} className="flex-1">
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  처리 중...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  텍스트 추출
                </>
              )}
            </Button>
          </div>

          {imageUrl && (
            <div className="relative aspect-video mt-4 border rounded-md overflow-hidden">
              <canvas ref={canvasRef} className="w-full h-auto" />

              {tooltip.text !== "" && (
                <div style={{ position: "absolute", top: `${tooltip.y + 15}px`, left: `${tooltip.x}px` }}>
                  <span className="bg-black text-white px-2 py-1 rounded-md">{tooltip.text}</span>
                </div>
              )}
            </div>
          )}
        </Card.Content>
      </Card>
    </TooltipProvider>
  );
};
