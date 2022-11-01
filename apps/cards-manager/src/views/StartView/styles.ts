import { noSelect } from '@/utils/css.classes';
import { createStyles } from '@mantine/core';

const styles = createStyles((theme) => ({
  main: {
    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center',
    width: '100vw',
    height: '100vh',
  },
  wrapper: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '3rem'
  },
  copyright: {
    ...noSelect,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 40,
    textAlign: 'center',
    '& > span': {
      opacity: 0.5,
    },
  },
}));

export default styles;