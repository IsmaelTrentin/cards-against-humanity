import { BrowseView } from './views/BrowseView';
import { GlobalStyles } from './GlobalStyles';
import { MantineProvider } from '@mantine/core';
import React from 'react';
import { theme } from './theme';

const App: React.FC<Record<string, unknown>> = () => {
  return (
    <MantineProvider
      theme={theme}
      withNormalizeCSS
      withGlobalStyles
    >
      <GlobalStyles />
      <BrowseView />
    </MantineProvider>
  );
};

export default App;
