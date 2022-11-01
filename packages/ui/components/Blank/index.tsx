import React from 'react';
import { useStyles } from './styles';

export const Blank: React.FC<Record<string, unknown>> = () => {
  const { classes } = useStyles();
  return <div className={classes.main}>a</div>;
};
