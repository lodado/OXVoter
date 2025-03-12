"use client";

import { useTransition } from "react";

import useErrorBoundary from "./useErrorBoundary";

const useServerAction = (action: (formData: FormData) => Promise<any | undefined>, afterCallback?: () => void) => {
  const [isPending, startTransition] = useTransition();
  // const dispatch = useDispatch();
  const { setError } = useErrorBoundary();

  const onSubmit = async (formData: FormData) => {
    return new Promise((resolve, reject) => {
      startTransition(async () => {
        try {
          // dispatch(SET_PAGE_LOADING(true));
          resolve(await action(formData));
        } catch (e) {
          setError(e);
          reject(e);
        } finally {
          // dispatch(SET_PAGE_LOADING(false));

          afterCallback?.();
        }
      });
    });
  };

  return { isPending, onSubmit };
};

export default useServerAction;
