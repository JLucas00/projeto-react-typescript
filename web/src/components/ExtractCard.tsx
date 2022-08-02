import React, { useContext } from 'react';
import { ModeContext } from '../providers/ModeProvider';

export const ExtractCard = () => {
  const useMode = useContext(ModeContext);

  const theme = useMode.theme;
  const objTheme = {
    light: {
      icons: 'text-icon-light',
      card: 'w-5/6 px-4 py-3 border rounded-lg bg-white',
    },
    dark: {
      icons: 'text-icon-dark',
      card: 'w-5/6 px-4 py-3 border rounded-lg border-btn-secondary-base bg-body-dark',
    },
  };

  return <div className="w-5/6 h-10 body-color rounded"></div>;
};
