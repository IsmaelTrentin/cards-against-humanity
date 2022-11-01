import { BrowseView } from './views/BrowseView';
import { GlobalStyles } from './GlobalStyles';
import { MantineProvider } from '@mantine/core';
import { Route } from 'wouter';
import { StartView } from './views/StartView';
import { theme } from './theme';

const App = () => {
  return (
    <MantineProvider
      theme={theme}
      withNormalizeCSS
      withGlobalStyles
    >
      <GlobalStyles />
      <Route path="/">
        <StartView />
      </Route>
      <Route path="/browse">
        <BrowseView />
      </Route>
    </MantineProvider>
  );
};

export default App;
