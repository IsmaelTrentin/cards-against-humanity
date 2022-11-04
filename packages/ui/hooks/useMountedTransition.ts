import { useTimeoutValue } from 'ui';

export const useMountedTransition = (timeout: number = 1) => {
  const { state, setState, start, clear } = useTimeoutValue(
    false,
    true,
    timeout
  );

  return [state, start, clear, setState] as const;
};
