import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './providers/UserProvider';
import { ModeProvider } from './providers/ModeProvider';
import { ExtractProvider } from './providers/ExtractProvider';
import { Router } from './routes/routes';
import './styles/global.css';
import { EyeProvider } from './providers/EyeProvider';

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
      <ExtractProvider>
        <EyeProvider>
          <ModeProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </ModeProvider>
        </EyeProvider>
      </ExtractProvider>
    </UserProvider>
  );
};
