import { useContext } from 'react';
import { ModeContext } from '../providers/ModeProvider';

type headerProps = {
  name: string;
  birthdate: string;
  document: string;
};

export const MyData = ({ name, birthdate, document }: headerProps) => {
  const useMode = useContext(ModeContext);

  const theme = useMode.theme;
  const objTheme = {
    light: {
      myData:
        'w-full p-1 flex flex-col justify-start gap-y-1 rounded bg-body-light-100',
      textMyData: 'text-my-data-light',
    },
    dark: {
      myData: 'w-full p-1 flex flex-col justify-start gap-y-1',
      textMyData: 'text-my-data-dark',
    },
  };

  return (
    <div className={objTheme[theme].myData}>
      <p className={objTheme[theme].textMyData}>Nome: {name}</p>
      <p className={objTheme[theme].textMyData}>
        Data de nascimento: {birthdate}
      </p>
      <p className={objTheme[theme].textMyData}>CPF: {document}</p>
    </div>
  );
};
