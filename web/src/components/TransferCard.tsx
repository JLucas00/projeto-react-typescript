import React from 'react';
import { Button } from './Button';
import { Input } from './Input';

export const TransferCard = () => {
  return (
    <div className="w-full flex flex-col">
      <h1>Origem</h1>
      <div className="flex justify-between mt-2">
        <div className="w-full">
          <Input placeholder="Agência" inputType="short" />
          <p className="input-label">Agência</p>
        </div>
        <div>
          <Input placeholder="Conta" inputType="short" />
          <p className="input-label">Conta</p>
        </div>
      </div>
      <h1>Destino</h1>
      <div className="flex justify-between mt-2">
        <div className="w-full">
          <Input placeholder="Agência" inputType="short" />
          <p className="input-label">Agência</p>
        </div>
        <div>
          <Input placeholder="Conta" inputType="short" />
          <p className="input-label">Conta</p>
        </div>
      </div>
      <div className="mt-2">
        <Input placeholder="Valor" inputType="long" />
      </div>
      <div className="mt-2">
        <Input placeholder="Senha" inputType="long" />
      </div>
      <div className="mt-2">
        <Button category="primary" label="Transferir" />
      </div>
    </div>
  );
};
