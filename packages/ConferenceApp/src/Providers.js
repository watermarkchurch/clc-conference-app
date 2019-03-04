import React from 'react';
import { Providers } from '@apollosproject/ui-kit';
import ClientProvider from './client';
import theme from './theme';

const AppProvider = (props) => (
  <Providers themeInput={theme}>
    <ClientProvider {...props} />
  </Providers>
);

export default AppProvider;
