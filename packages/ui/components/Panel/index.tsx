import React, { CSSProperties } from 'react';

import { useMantineTheme } from '@mantine/core';

interface Props {
  padding?: string | number;
  margin?: string | number;
  borderRadius?: string | number;
  backgroundColor?: string;
  fullWidth?: boolean;
  style?: CSSProperties;
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
    style,
    className,
    children,
  } = props;

  return (
    <div
      style={{
        backgroundColor,
        padding,
        margin,
        borderRadius,
        ...style,
        width: fullWidth ? '100%' : undefined,
      }}
      className={className}
    >
      {children}
    </div>
  );
};
