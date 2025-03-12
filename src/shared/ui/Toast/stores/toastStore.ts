import { create } from "zustand";

export type ToastMessage = {
  id: string | number;
  type: "success" | "error";
  title: string;
  description?: string;

  location?: string;
};

const initialState = {
  messages: [],
};

export interface ToastState {
  messages: ToastMessage[];

  addToast: ({ title, description, type }: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string | number) => void;

  clearToast: () => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  ...initialState,

  addToast: ({ title, description, type, id }: { id?: number | string } & Omit<ToastMessage, "id">) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          location: window.location.pathname,
          id: id ?? Date.now(),
          type,
          title,
          description,
        },
      ],
    })),
  removeToast: (id) => {
    set((state) => {
      return {
        messages: state.messages.filter((msg) => {
          return msg.id !== id && msg.location === window.location.pathname;
        }),
      };
    });
  },

  clearToast: () => {
    set((state) => {
      return {
        ...initialState,
      };
    });
  },
}));
