import { useEffect, useState } from 'react';

import { useTimeout } from '@mantine/hooks';

export const useTimeoutValue = <T>(
  initialValue: T,
  finalValue: T,
  timeout: number = 1
) => {
  const [state, setState] = useState<T>(initialValue);
  const { start, clear } = useTimeout(() => setState(finalValue), timeout);

  useEffect(() => {
    return () => clear();
  }, [clear]);

  return {
    state,
    setState,
    start,
    clear,
  };
};
