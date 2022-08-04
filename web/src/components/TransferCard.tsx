import React, { useContext, useState, useEffect } from 'react';
import { ModeContext } from '../providers/ModeProvider';
import { Button } from './Button';
import { Input } from './Input';
import { postTransfer } from '../libs/api';
import { Modal } from '../components/Modal';
export const TransferCard = () => {
  const [formData, setformData] = useState({
    valor: '',
    senha: '',
    account: '',
    agency: '',
  });
  const [originData, setOriginData] = useState({
    account: {
      cpf: '12345678912',
      agency: '5507',
      verificationAgencyDigit: '3',
      accountNumber: '607245',
      verificationAccountDigit: '6',
    },
    value: 0,
  });
  const [destinationData, setDestinationData] = useState({
    account: {
      cpf: '12345678912',
      agency: '5507',
      verificationAgencyDigit: '3',
      accountNumber: '607245',
      verificationAccountDigit: '6',
    },
    value: 0,
  });
  const useMode = useContext(ModeContext);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setOriginData({ ...originData, value: Number(formData.valor) });
    setDestinationData({ ...destinationData, value: Number(formData.valor) });
    console.log(originData);
    console.log(destinationData);
  }, [formData]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setformData({ ...formData, [name]: value });
  }
  async function handleTranfer() {
    try {
      postTransfer({
        accountOrigin: {
          cpf: '12345678912',
          agency: formData.agency.substring(0, 4),
          verificationAgencyDigit: formData.agency.substring(5, 6),
          accountNumber: formData.account.substring(0, 6),
          verificationAccountDigit: formData.account.substring(7, 8),
          password: formData.senha,
        },
        accountReceiver: {
          cpf: '47301043821',
          agency: '8529',
          verificationAgencyDigit: '5',
          accountNumber: '644553',
          verificationAccountDigit: '6',
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
          <Input
            placeholder="Agência"
            inputType="short"
            disabled={true}
            value={
              originData.account.agency +
              '-' +
              originData.account.verificationAgencyDigit
            }
          />
          <p className="text-label text-input-inactive">Agência</p>
        </div>
        <div>
          <Input
            placeholder="Conta"
            inputType="short"
            disabled={true}
            value={
              originData.account.accountNumber +
              '-' +
              originData.account.verificationAccountDigit
            }
          />
          <p className="text-label text-input-inactive">Conta</p>
        </div>
      </div>

      <h1 className={objTheme[theme].textTitle}>Destino</h1>
      <div className="flex justify-between my-1.5">
        <div className="w-full">
          <Input
            placeholder="Agência"
            inputType="short"
            disabled={false}
            name="agency"
            value={formData.agency}
            onChange={handleChange}
          />
          <p className="text-label text-input-inactive">Agência</p>
        </div>
        <div>
          <Input
            placeholder="Conta"
            inputType="short"
            disabled={false}
            name="account"
            value={formData.account}
            onChange={handleChange}
          />
          <p className="text-label text-input-inactive">Conta</p>
        </div>
      </div>

      <div className="mt-2.5">
        <Input
          placeholder="Valor"
          inputType="long"
          name="valor"
          disabled={false}
          value={formData.valor}
          onChange={handleChange}
        />
      </div>
      <div className="mt-5">
        <Input
          placeholder="Senha"
          inputType="long"
          name="senha"
          disabled={false}
          value={formData.senha}
          onChange={handleChange}
          type="password"
        />
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
