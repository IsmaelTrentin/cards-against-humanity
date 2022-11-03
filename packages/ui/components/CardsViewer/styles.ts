import { createStyles } from '@mantine/core';

export const useStyles = createStyles(theme => ({
  main: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '1.5rem',
    height: '100%',
    width: '100%',
    padding: '1rem 0',
  },
}));
