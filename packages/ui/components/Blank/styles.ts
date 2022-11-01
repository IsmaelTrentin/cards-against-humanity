import { createStyles } from '@mantine/core';

export const useStyles = createStyles(theme => ({
  main: {
    height: '1.1rem',
    minWidth: '6rem',
    margin: '0 .2rem',
    color: 'transparent',
    backgroundColor: theme.colors.gray[9],
    borderRadius: 4,
    overflow: 'hidden',
    transform: 'translateY(0.05rem)',
  },
}));
