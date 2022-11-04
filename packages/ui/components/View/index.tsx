import React, { ReactNode } from 'react';

import { Transition } from '@mantine/core';
import useStyles from './styles';
import { useTimeoutValue } from 'ui';

interface Props {
  transitionDuration?: number;
  children?: ReactNode;
}

export const View: React.FC<Props> = props => {
  const { transitionDuration = 300, children } = props;
  const { state, start } = useTimeoutValue(false, true, 1);
  const { classes } = useStyles();

  start();

  return (
    <Transition
      mounted={state}
      transition="fade"
      timingFunction="ease"
      duration={transitionDuration}
    >
      {styles => (
        <div
          style={styles}
          className={classes.main}
        >
          {children}
        </div>
      )}
    </Transition>
  );
};
