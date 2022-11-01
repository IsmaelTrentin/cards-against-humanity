import { UnstyledButton } from '@mantine/core';
import React, { ReactNode } from 'react';
import useStyles from './styles';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const CardButton: React.FC<Props> = props => {
  const {
    children
  } = props;
  const { classes } = useStyles();

  return (
    <UnstyledButton
      {...props}
      className={classes.main}
    >
      <div></div>
      {children}
    </UnstyledButton>
  );
};