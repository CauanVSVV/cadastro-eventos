import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import { EventContextProvider } from './contexts/EventContext';
import { ThemeProvider } from 'styled-components';

const tema = {
cinza:'#ccc',
blue: 'blue',
red: 'red'
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EventContextProvider>
      <ThemeProvider theme={tema}>
      <App />
      </ThemeProvider>
    </EventContextProvider>
  </React.StrictMode>
);
