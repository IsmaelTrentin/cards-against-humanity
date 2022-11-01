import { createStyles } from '@mantine/core';

const styles = createStyles(theme => ({
  card: {
    position: 'absolute',
    width: 230 - 150,
    height: 300 - 180,
    border: `3px solid ${theme.colors.gray[3]}`,
    borderRadius: 5,
    background: '#fff',
    ':nth-of-type(2)': {
      transformOrigin: 'bottom left',
      transform: 'rotate(10deg)',
    },
    ':nth-of-type(3)': {
      transformOrigin: 'bottom left',
      transform: 'rotate(20deg)',
    },
  },
}));

export default styles;
