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
          <Input placeholder="Agência" inputType="short" disabled={true} />
          <p className="input-label">Agência</p>
        </div>
        <div>
          <Input placeholder="Conta" inputType="short" disabled={true} />
          <p className="input-label">Conta</p>
        </div>
      </div>
      <div className="mt-5">
        <Input placeholder="Valor" inputType="long" disabled={false} />
      </div>
      <div className="mt-5">
        <Input placeholder="Senha" inputType="long" disabled={false} />
      </div>
      <div className="mt-5">
        <Button
          category="primary"
          label={buttonLabel}
          onClick={() => console.log('Saque')}
        />
      </div>
    </div>
  );
};
