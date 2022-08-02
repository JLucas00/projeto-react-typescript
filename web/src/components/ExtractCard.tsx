import React, { useContext } from 'react';
import { ModeContext } from '../providers/ModeProvider';

export const ExtractCard = () => {
  const useMode = useContext(ModeContext);

  const theme = useMode.theme;
  const objTheme = {
    light: {
      extract:
        'w-full p-1 flex flex-col justify-start gap-y-1 rounded bg-body-light-100',
      textMyData: 'text-my-data-light',
    },
    dark: {
      extract: 'w-full p-1 flex flex-col justify-start gap-y-1',
      textMyData: 'text-my-data-dark',
    },
  };

  return <div className={objTheme[theme].extract}></div>;
};
