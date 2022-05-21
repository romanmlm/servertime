import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import 'typeface-noto-sans';
import CssBaseline from '@material-ui/core/CssBaseline';
import { IntlProvider } from 'react-intl';

import { config } from '../config';
import { GCAppTheme } from 'styles/GCApp.theme';
import ServerTimeApp from './ServerTimeApp';
import en from '../translations/en.json';
import { flatten } from 'flat';

const App: React.FC = () => {
  console.log('Server Time App');
  const theme = GCAppTheme;
  const locale = 'en';
  const langMsg = { en };
  return (
    <ThemeProvider theme={theme}>
      <IntlProvider key={locale} locale={locale} messages={flatten(langMsg[locale])}>
        <CssBaseline />
        <ServerTimeApp config={config} />
      </IntlProvider>
    </ThemeProvider>
  );
};

export default App;

