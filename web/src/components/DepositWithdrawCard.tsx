import React from 'react';
import { Button } from './Button';
import { Input } from './Input';

interface cardProps {
  title: string;
  buttonLabel: string;
}

export const DepositWithdrawCard = ({ title, buttonLabel }: cardProps) => {
  return (
    <div className="w-full flex flex-col">
      <h1>Dados para {title}</h1>
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
      <div className="mt-5">
        <Input placeholder="Valor" inputType="long" />
      </div>
      <div className="mt-5">
        <Input placeholder="Senha" inputType="long" />
      </div>
      <div className="mt-5">
        <Button category="primary" label={buttonLabel} />
      </div>
    </div>
  );
};
