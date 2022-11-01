import React from 'react';
import { useMantineTheme } from '@mantine/core';

interface Props {
  padding?: string | number;
  margin?: string | number;
  borderRadius?: string | number;
  backgroundColor?: string;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Panel: React.FC<Props> = props => {
  const theme = useMantineTheme();
  const {
    padding = '1rem',
    margin = 0,
    borderRadius = 5,
    backgroundColor = theme.colors.gray[1],
    fullWidth,
    className,
    children,
  } = props;

  return (
    <div
      style={{
        width: fullWidth ? '100%' : undefined,
        backgroundColor,
        padding,
        margin,
        borderRadius,
      }}
      className={className}
    >
      {children}
    </div>
  );
};
