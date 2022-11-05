import { createStyles } from '@mantine/core';
import { noSelect } from 'ui';

const styles = createStyles((theme, _, getRef) => ({
  'filters-wrapper': {
    ...noSelect,
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '.5rem',
    '& > div': {
      cursor: 'pointer',
    },
  },
  'go-back-wrapper': {
    ...noSelect,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '40vh',
    bottom: '40vh',
    left: 0,
    width: '2.5rem',
    [`&:hover .${getRef('goBack')}`]: {
      left: '1rem',
      opacity: 1,
    },
  },
  'go-back': {
    ref: getRef('goBack'),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 42,
    height: 42,
    left: -21,
    opacity: 0.4,
    borderRadius: '50%',
    boxShadow: `0 0 10px 0 ${theme.colors.gray[4]}`,
    cursor: 'pointer',
    transition: 'all 200ms ease',
  },
}));

export default styles;
