import React, { ReactNode, createContext, useState } from 'react';

interface ContextTypes {
  toggle: any;
  mode: boolean;
  theme: 'dark' | 'light';
}

interface ProviderTypes {
  children: ReactNode;
}

export const ModeContext = createContext<ContextTypes>({
  toggle: () => {
    console.log('Start ModeProvider dark');
  },
  mode: true,
  theme: 'dark',
});

export const ModeProvider = ({ children }: ProviderTypes) => {
  const [mode, setMode] = useState(true);

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

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
