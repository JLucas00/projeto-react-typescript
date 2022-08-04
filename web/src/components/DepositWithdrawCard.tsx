import React, { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Modal } from '../components/Modal';
import { postWithdraw, postDeposit } from '../libs/api';

interface cardProps {
  title: string;
  buttonLabel: string;
}

export const DepositWithdrawCard = ({ title, buttonLabel }: cardProps) => {
  const [modal, setModal] = useState(false);
  function handleDeposit() {
    try {
      postDeposit({
        account: {
          cpf: '12345678912',
          agency: '5507',
          verificationAgencyDigit: '3',
          accountNumber: '607245',
          verificationAccountDigit: '6',
        },
        value: 100,
      }).then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
    setModal(false);
  }
  function handleWithdraw() {
    try {
      postWithdraw({
        account: {
          cpf: '12345678912',
          agency: '5507',
          verificationAgencyDigit: '3',
          accountNumber: '607245',
          verificationAccountDigit: '6',
          password: '12345678',
        },
        value: 100,
      }).then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
    setModal(false);
  }
  return (
    <div className="w-full flex flex-col">
      {modal && title === 'saque' && (
        <Modal
          title="Saque"
          setModal={setModal}
          handleConfirmModal={handleWithdraw}
        />
      )}
      {modal && title === 'depósito' && (
        <Modal
          title="Depósito"
          setModal={setModal}
          handleConfirmModal={handleDeposit}
        />
      )}
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
          onClick={() => setModal(true)}
        />
      </div>
    </div>
  );
};
