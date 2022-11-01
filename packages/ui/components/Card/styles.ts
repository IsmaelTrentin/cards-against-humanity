import { createStyles } from '@mantine/core';

export const useStyles = createStyles(theme => ({
  main: {
    position: 'relative',
    width: 250,
    maxWidth: 250,
    height: 300,
    maxHeight: 300,
    padding: '1.25rem !important',
    border: `1px solid ${theme.colors.gray[1]}`,
    borderRadius: `8px !important`,
    boxShadow: `0 5px 18px 0 ${theme.colors.gray[2]}`,
    cursor: 'pointer',
    transition: '100ms ease',
    '&:hover': {
      transform: 'scale(1.02)',
    },
    overflow: 'hidden',
  },
  id: {
    position: 'absolute',
    bottom: '.5rem',
    right: '1rem',
    left: '1rem',
    textAlign: 'center',
    fontSize: '.75rem',
    letterSpacing: '.1rem',
  },
}));
