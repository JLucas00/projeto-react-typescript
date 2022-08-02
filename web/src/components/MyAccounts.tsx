import { useContext } from 'react';
import { ModeContext } from '../providers/ModeProvider';

type headerProps = {
  userId: string;
};

export const MyAccounts = ({ userId }: headerProps) => {
  const useMode = useContext(ModeContext);

  const theme = useMode.theme;
  const objTheme = {
    light: {
      card: 'w-5/6 px-4 py-3 border rounded-lg bg-white',
      myAccounts:
        'p-1 flex flex-col justify-start gap-y-1 rounded bg-body-light-100',
      textMyData: 'text-my-data-light',
    },
    dark: {
      card: 'w-5/6 px-4 py-3 border rounded-lg border-btn-secondary-base bg-body-dark',
      myAccounts:
        'p-1 flex flex-col justify-start gap-y-1 border rounded border-btn-secondary-base bg-body-dark',
      textMyData: 'text-my-data-dark',
    },
  };

  return (
    <div className="w-full flex flex-col justify-start gap-y-6">
      <div className={objTheme[theme].myAccounts}>
        <p className={objTheme[theme].textMyData}>Agência: {'Numero'}</p>
        <p className={objTheme[theme].textMyData}>Conta: {'Número'}</p>
      </div>
      <div className={objTheme[theme].myAccounts}>
        <p className={objTheme[theme].textMyData}>Agência: {'Numero'}</p>
        <p className={objTheme[theme].textMyData}>Conta: {'Número'}</p>
      </div>
    </div>
  );
};
