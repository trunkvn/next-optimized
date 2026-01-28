import { useRef, useInsertionEffect } from "react";

/**
 * Advanced Pattern: advanced-use-latest
 * Returns a ref that always points to the latest value passed to it.
 * Useful for stable callbacks that need to access fresh state.
 */
export function useLatest<T>(value: T) {
  const ref = useRef(value);

  useInsertionEffect(() => {
    ref.current = value;
  });

  return ref;
}
