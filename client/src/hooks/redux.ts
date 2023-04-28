import {
  TypedUseSelectorHook,
  useSelector as useSelectorR,
  useDispatch as useDispatchR,
} from "react-redux";
import { StoreDispatch, StoreStateType } from "../@types/redux";
import { useEffect, useRef } from "react";

export const useSelector: TypedUseSelectorHook<StoreStateType> = useSelectorR;
export const useDispatch = useDispatchR<StoreDispatch>;

export function useIsomorficEffect() {
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    return () => {
      isFirstRun.current = true;
    };
  }, []);

  return isFirstRun.current;
}
