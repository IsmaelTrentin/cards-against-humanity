import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme, _, getRef) => ({
  main: {
    position: 'relative',
    overflow: 'hidden',
    [`
    &:hover .${getRef('options')}, 
    &:focus .${getRef('options')}, 
    &:focus-within .${getRef('options')}
    `]: {
      bottom: '1.5rem',
    },
  },
  options: {
    ref: getRef('options'),
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    gap: '1.5rem',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '-100%',
    transition: 'all 220ms ease',
  },
  'option-btn': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    overflow: 'hidden',
    transition: 'transform 120ms ease',
    '&:active': {
      transform: 'scale(0.98)',
    },
  },
  accept: {
    backgroundColor: theme.colors.green[4],
    boxShadow: `0 0 10px 0 ${theme.colors.green[4]}`,
  },
  refuse: {
    backgroundColor: theme.colors.red[5],
    boxShadow: `0 0 10px 0 ${theme.colors.red[5]}`,
  },
}));
