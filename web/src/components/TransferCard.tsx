import React, { useContext, useState } from 'react';
import { ModeContext } from '../providers/ModeProvider';
import { Button } from './Button';
import { Input } from './Input';
import { postTransfer } from '../libs/api';
import { Modal } from '../components/Modal';
export const TransferCard = () => {
  const useMode = useContext(ModeContext);
  const [modal, setModal] = useState(false);
  async function handleTranfer() {
    try {
      postTransfer({
        accountOrigin: {
          cpf: '12345678912',
          agency: '5507',
          verificationAgencyDigit: '3',
          accountNumber: '607245',
          verificationAccountDigit: '6',
          password: '12345678',
        },
        accountReceiver: {
          cpf: '47301043821',
          agency: '8529',
          verificationAgencyDigit: '5',
          accountNumber: '644553',
          verificationAccountDigit: '6',
        },
        value: 50,
      }).then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
    setModal(false);
  }

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
      {modal && (
        <Modal
          title="Saque"
          setModal={setModal}
          handleConfirmModal={handleTranfer}
        />
      )}
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
          onClick={() => setModal(true)}
        />
      </div>
    </div>
  );
};
