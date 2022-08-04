import React, { useContext } from 'react';
import { ModeContext } from '../providers/ModeProvider';
import { Button } from './Button';
import { Input } from './Input';

export const TransferCard = () => {
  const useMode = useContext(ModeContext);

  const theme = useMode.theme;
  const objTheme = {
    light: {
      textTitle: 'text-title text-input-text mt-1.5',
    },
    dark: {
      textTitle: 'text-title text-input-base mt-1.5',
    },
  };

  return (
    <div className="w-full flex flex-col">
      <h1 className={objTheme[theme].textTitle}>Origem</h1>
      <div className="flex justify-between my-2.5">
        <div className="w-full ">
          <Input placeholder="Agência" inputType="short" disabled={true} />
          <p className="text-label text-input-inactive">Agência</p>
        </div>
        <div>
          <Input placeholder="Conta" inputType="short" disabled={true} />
          <p className="text-label text-input-inactive">Conta</p>
        </div>
      </div>

      <h1 className={objTheme[theme].textTitle}>Destino</h1>
      <div className="flex justify-between my-1.5">
        <div className="w-full">
          <Input placeholder="Agência" inputType="short" disabled={false} />
          <p className="text-label text-input-inactive">Agência</p>
        </div>
        <div>
          <Input placeholder="Conta" inputType="short" disabled={false} />
          <p className="text-label text-input-inactive">Conta</p>
        </div>
      </div>

      <div className="mt-2.5">
        <Input placeholder="Valor" inputType="long" disabled={false} />
      </div>
      <div className="mt-5">
        <Input placeholder="Senha" inputType="long" disabled={false} />
      </div>
      <div className="mt-3.5">
        <Button
          category="primary"
          label="Transferir"
          onClick={() => console.log('')}
        />
      </div>
    </div>
  );
};
