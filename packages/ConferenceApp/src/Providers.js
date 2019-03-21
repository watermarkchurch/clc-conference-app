import React from 'react';
import { Providers } from '@apollosproject/ui-kit';
import ClientProvider from './client';
import theme from './theme';
import { WebBrowserProvider } from './ui/WebBrowser';

const AppProvider = (props) => (
  <Providers themeInput={theme}>
    <WebBrowserProvider>
      <ClientProvider {...props} />
    </WebBrowserProvider>
  </Providers>
);

export default AppProvider;
