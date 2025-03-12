interface OCRWordData {
  left: number;
  top: number;
  width: number;
  height: number;
}

export type OCRResult = Record<string, OCRWordData[]>;

/**
 * Tesseract TSV 문자열을 JSON으로 변환하는 함수
 */
export function parseTesseractTSVFromString(tsvString: string): OCRResult {
  const lines = tsvString.split("\n");
  const result: OCRResult = {};

  // 첫 번째 줄은 헤더 (무시)
  lines.forEach((line) => {
    const parts = line.split("\t");
    if (parts.length < 12) return;

    const level = parseInt(parts[0], 10);
    if (level !== 5) return; // 단어 수준(level 5)만 처리

    const text = parts[11].trim();
    if (!text || text === "-1") return; // 빈 텍스트 무시

    const left = parseInt(parts[6], 10);
    const top = parseInt(parts[7], 10);
    const width = parseInt(parts[8], 10);
    const height = parseInt(parts[9], 10);

    if (!result[text]) {
      result[text] = [];
    }

    result[text].push({ left, top, width, height });
  });

  return result;
}
