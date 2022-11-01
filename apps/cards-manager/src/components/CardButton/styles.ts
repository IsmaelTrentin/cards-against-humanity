import { noSelect } from '@/utils/css.classes';
import { createStyles } from '@mantine/core';

const styles = createStyles((theme) => ({
  main: {
    ...noSelect,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 230,
    height: 300,
    border: `1px solid ${theme.colors.gray[3]}`,
    borderRadius: 5,
    transition: 'all 150ms ease',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.colors.gray[0],
    },
    '&:active': {
      transform: 'scale(0.98)'
    },
  }
}));

export default styles;