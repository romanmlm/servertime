import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';

//const language = (navigator.languages && navigator.languages[0]) || navigator.language;

//const languageWithoutRegionalCode = language.toLowerCase().split(/[_-]+/)[0] ?? 'en';

console.log(`${process.env.REACT_APP_NAME} ${process.env.REACT_APP_VERSION}`);

ReactDOM.render(
    <App />,
  document.querySelector('#root')
);
