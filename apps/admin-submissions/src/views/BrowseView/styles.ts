import { createStyles } from '@mantine/core';

const styles = createStyles(() => ({
  'filters-wrapper': {
    // ...noSelect,
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '.5rem',
    '& > div': {
      cursor: 'pointer',
    },
  },
}));

export default styles;
