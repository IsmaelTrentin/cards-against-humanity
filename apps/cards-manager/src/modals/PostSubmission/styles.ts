import { createStyles } from '@mantine/core';
import { noSelect } from 'ui';

export const useStyles = createStyles(theme => ({
  columns: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'flex-start',
    width: 800,
    maxWidth: 800,
    height: 600,
    paddingBottom: '2rem',
  },
  left: {
    width: '50%',
    '& > div': {
      marginBottom: '1rem',
    },
    '& > div:last-child': {
      marginBottom: 0,
    },
  },
  right: {
    ...noSelect,
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '50%',
  },
  'submit-btn': {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '3rem',
    fontWeight: 400,
    fontSize: '1rem',
    borderRadius: '0 0 4px 4px',
  },
  reset: {
    ...noSelect,
    marginTop: '1rem',
    textDecoration: 'underline',
    color: theme.colors.gray[4],
    cursor: 'pointer',
    transition: 'all 100ms ease',
    '&:hover, &:focus, &:focus-within': {
      color: theme.colors.indigo[4],
    },
  },
}));
