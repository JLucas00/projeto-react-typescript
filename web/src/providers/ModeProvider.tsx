import React, { ReactNode, createContext, useState } from 'react';

interface ContextTypes {
  toggle: any;
  mode: boolean;
  theme: string;
}

interface ProviderTypes {
  children: ReactNode;
}

export const ModeContext = createContext<Partial<ContextTypes>>({});

export const ModeProvider = ({ children }: ProviderTypes) => {
  const [mode, setMode] = useState(false);

  const [theme, setTheme] = useState('dark');

  function toggle() {
    if (mode) {
      console.log('Modo Dia');
      setTheme('light');
    } else {
      console.log('Modo Noturno');
      setTheme('dark');
    }
    setMode(!mode);
  }

  return (
    <ModeContext.Provider value={{ toggle, mode, theme }}>
      {children}
    </ModeContext.Provider>
  );
};
