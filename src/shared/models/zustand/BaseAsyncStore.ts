export interface BaseAsyncState {
  isLoading: boolean;
  isError: boolean;
  progress: number;
  errorMessage?: string;
}

export default class BaseAsyncStore<State extends BaseAsyncState> {
  protected set: (partial: Partial<State>) => void;
  protected get: () => State;

  constructor(set: (partial: Partial<State>) => void, get: () => State) {
    this.set = set;
    this.get = get;
  }

  startLoading() {
    this.set({
      ...this.get(),
      isLoading: true,
      isError: false,
      progress: 0,
      errorMessage: undefined,
    });
  }

  finishLoading() {
    this.set({
      ...this.get(),
      isLoading: false,
      isError: false,
      progress: 100,
      errorMessage: undefined,
    });
  }

  setError(errorMessage?: string) {
    this.set({
      ...this.get(),
      isLoading: false,
      isError: true,
      progress: 0,
      errorMessage,
    });
  }

  setProgress(progress: number) {
    this.set({ ...this.get(), progress });
  }
}
