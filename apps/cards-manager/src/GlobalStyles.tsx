import { Global } from '@mantine/core';

export const GlobalStyles = () => {
  return (
    <Global
      styles={theme => ({
        '*': {
          padding: 0,
          margin: 0,
        },
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
        body: {
          ...theme.fn.fontStyles(),
          fontSize: 16,
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[7]
              : theme.colors.white,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
          lineHeight: theme.lineHeight,
        },
      })}
    />
  );
};
