/**
 * 주어진 이미지 URL을 로딩해서,
 * 캔버스에 주어진 width, height 크기로 설정한 뒤
 * 해당 영역을 중앙 정렬로 그려줍니다.
 *
 * @param imageUrl 이미지 소스 URL
 * @param image { x, y, width, height } 원본 이미지에서 잘라낼 영역
 * @param canvas HTMLCanvasElement
 * @param canvasWidth 캔버스 전체 폭
 * @param canvasHeight 캔버스 전체 높이
 */
export const drawImageOnCanvas = (
  imageUrl: string,
  image: { x: number; y: number; width: number; height: number },
  canvas: HTMLCanvasElement,
  canvasWidth: number,
  canvasHeight: number
) => {
  const img = new Image();
  img.src = imageUrl;

  img.onload = () => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 캔버스 크기 설정
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // 원본 이미지에서 잘라낼 시작 좌표와 크기
    const { x, y, width, height } = image;

    // 스케일 값 조정 (필요할 경우 수정)
    const scale = 1;
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;

    // 이미지가 중앙에 오도록 위치 계산
    const centerX = (canvasWidth - scaledWidth) / 2;
    const centerY = (canvasHeight - scaledHeight) / 2;

    // 이미지 그리기
    ctx.drawImage(
      img,
      // 원본에서 잘라낼 영역
      x,
      y,
      width,
      height,
      // 캔버스에 그려지는 위치 (중앙 정렬된 좌표)
      centerX,
      centerY,
      // 캔버스에 그려질 때의 크기
      scaledWidth,
      scaledHeight
    );
  };
};
