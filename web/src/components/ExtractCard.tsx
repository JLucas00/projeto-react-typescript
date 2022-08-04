import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ModeContext } from '../providers/ModeProvider';

interface ExtractProps {
  transferDate: string;
  transferType: string;
  transferValue: number;
  transferSign: string;
  transferColor: string;
}

export const ExtractCard = ({
  transferDate,
  transferType,
  transferValue,
  transferSign,
  transferColor,
}: ExtractProps) => {
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

  return (
    <div className={objTheme[theme].extract}>
      <div className="flex flex-col items-center">
        <h3 className="w-full extract-date-color">{transferDate}</h3>
      </div>
    </div>
  );
};
