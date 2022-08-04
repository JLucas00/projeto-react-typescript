import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Modal } from '../components/Modal';
import { postWithdraw, postDeposit } from '../libs/api';
import { Password } from 'phosphor-react';

interface cardProps {
  title: string;
  buttonLabel: string;
}

export const DepositWithdrawCard = ({ title, buttonLabel }: cardProps) => {
  const [modal, setModal] = useState(false);
  const [formData, setformData] = useState({ valor: '', senha: '' });

  const [depositData, setDepositData] = useState({
    account: {
      cpf: '12345678912',
      agency: '5507',
      verificationAgencyDigit: '3',
      accountNumber: '607245',
      verificationAccountDigit: '6',
    },
    value: 0,
  });
  const [withdrawData, setwithdrawData] = useState({
    account: {
      cpf: '12345678912',
      agency: '5507',
      verificationAgencyDigit: '3',
      accountNumber: '607245',
      verificationAccountDigit: '6',
      password: '',
    },
    value: 0,
  });

  useEffect(() => {
    setwithdrawData({ ...withdrawData, value: Number(formData.valor) });
    setDepositData({ ...depositData, value: Number(formData.valor) });
    console.log(withdrawData);
    console.log(depositData);
  }, [formData]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setformData({ ...formData, [name]: value });
  }
  function handleDeposit() {
    try {
      postDeposit({
        account: {
          cpf: depositData.account.cpf,
          agency: depositData.account.agency,
          verificationAgencyDigit: depositData.account.verificationAgencyDigit,
          accountNumber: depositData.account.accountNumber,
          verificationAccountDigit:
            depositData.account.verificationAccountDigit,
        },
        value: Number(formData.valor),
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
          cpf: depositData.account.cpf,
          agency: depositData.account.agency,
          verificationAgencyDigit: depositData.account.verificationAgencyDigit,
          accountNumber: depositData.account.accountNumber,
          verificationAccountDigit:
            depositData.account.verificationAccountDigit,
          password: formData.senha,
        },
        value: Number(formData.valor),
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
          <Input
            placeholder="Agência"
            inputType="short"
            disabled={true}
            value={
              depositData.account.agency +
              '-' +
              depositData.account.verificationAgencyDigit
            }
          />
          <p className="input-label">Agência</p>
        </div>
        <div>
          <Input
            placeholder="Conta"
            inputType="short"
            disabled={true}
            value={
              depositData.account.accountNumber +
              '-' +
              depositData.account.verificationAccountDigit
            }
          />
          <p className="input-label">Conta</p>
        </div>
      </div>
      <div className="mt-5">
        <Input
          placeholder="Valor"
          name="valor"
          type="number"
          inputType="long"
          disabled={false}
          value={formData.valor}
          onChange={handleChange}
        />
      </div>
      <div className="mt-5">
        <Input
          placeholder="Senha"
          name="senha"
          inputType="long"
          disabled={false}
          type="password"
          value={formData.senha}
          onChange={handleChange}
        />
      </div>
      <div className="mt-5">
        <Button
          category="primary"
          label={buttonLabel}
          onClick={() => {
            setModal(true);
          }}
        />
      </div>
    </div>
  );
};
