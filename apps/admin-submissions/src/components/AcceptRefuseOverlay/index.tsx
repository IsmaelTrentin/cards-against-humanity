import { Check, X } from 'tabler-icons-react';

import React from 'react';
import { UnstyledButton } from '@mantine/core';
import cx from 'classnames';
import { useStyles } from './styles';

interface Props {
  children?: React.ReactNode;
  onAccept?: () => void;
  onRefuse?: () => void;
}

export const AcceptRefuseOverlay: React.FC<Props> = props => {
  const { children, onAccept, onRefuse } = props;
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.main}>
      <>{children}</>
      <div className={classes.options}>
        <UnstyledButton
          className={cx(classes['option-btn'], classes.accept)}
          onClick={onAccept}
        >
          <Check
            size={32}
            color="#fff"
          />
        </UnstyledButton>
        <UnstyledButton
          className={cx(classes['option-btn'], classes.refuse)}
          onClick={onRefuse}
        >
          <X
            size={32}
            color="#fff"
          />
        </UnstyledButton>
      </div>
    </UnstyledButton>
  );
};
