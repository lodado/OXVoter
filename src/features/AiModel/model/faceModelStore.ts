import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";

import { LayersModel, loadLayersModel,regularizers, serialization } from "@tensorflow/tfjs";
import * as blazeface from "@tensorflow-models/blazeface";
import { create } from "zustand";

import BaseAsyncStore, { BaseAsyncState } from "@/shared/models/zustand/BaseAsyncStore";

const MODEL_ID = "GHOST_FACE_NET_2";

class L2 {
  static className = "L2";

  constructor(config: any) {
    return regularizers.l1l2(config);
  }
}

serialization.registerClass(L2 as any);

interface FaceModelState extends BaseAsyncState {
  faceRecognitionModel: LayersModel | null;
  faceCropModel: blazeface.BlazeFaceModel | null;

  loadModelWithProgress: () => Promise<void>;
  setModel: (faceRecognitionModel: LayersModel | null, faceCropModel: blazeface.BlazeFaceModel | null) => void;
}

class FaceModelStore extends BaseAsyncStore<FaceModelState> {
  // 모델을 실제로 로딩하는 메서드
  async loadModelWithProgress() {
    if (this.get().isLoading || !!this.get().faceRecognitionModel) return;

    this.startLoading(); // 공통 로딩 시작 로직

    try {
      const faceRecognitionModel = await loadLayersModel("/models/ghostnet2/model.json");
      const faceCropModel = await blazeface.load();

      // 모델 세팅
      this.setModel(faceRecognitionModel, faceCropModel);

      this.finishLoading();

      // offline에서도 사용 가능하도록 indexed DB caching
      await faceRecognitionModel.save(`indexeddb://${MODEL_ID}`);
    } catch (error) {
      this.setModel(null, null);
      this.set({ isLoading: false, isError: true });
    }
  }

  // 모델 세팅
  setModel(faceRecognitionModel: LayersModel | null, faceCropModel: blazeface.BlazeFaceModel | null) {
    this.set({ faceRecognitionModel, faceCropModel });
  }
}

export const useFaceModelStore = create<FaceModelState>((set, get) => {
  // FaceModelStore 인스턴스 생성
  const store = new FaceModelStore(set, get);

  return {
    // BaseAsyncState
    isLoading: false,
    isError: false,
    progress: 0,
    errorMessage: undefined,

    // FaceModelState
    faceRecognitionModel: null,
    faceCropModel: null,

    // 메서드 바인딩
    loadModelWithProgress: store.loadModelWithProgress.bind(store),
    setModel: store.setModel.bind(store),
  };
});
