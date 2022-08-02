import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './providers/UserProvider';
import { ModeProvider } from './providers/ModeProvider';
import { Router } from './routes/routes';
import './styles/global.css';

/**
 * Archive: src/App.tsx
 *
 * Description: Main application component
 *
 * Date: 2022/07/17
 *
 * Author: Rey
 */

export const App = () => {
  return (
    <UserProvider>
      <ModeProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ModeProvider>
    </UserProvider>
  );
};
