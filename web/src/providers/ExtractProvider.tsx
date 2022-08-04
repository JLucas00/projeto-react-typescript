import React, { ReactNode, createContext, useState, useContext } from 'react';
import { getExtract } from '../libs/api';
interface ContextTypes {
  extract: ExtractTypes;
  loading: boolean;
  handleExtract: any;
}

interface ExtractTypes {
  agencyNumber: string;
  agencyVerificationCode: string;
  accountNumber: string;
  accountVerificationCode: string;
  owner: string;
  document: string;
  birthdate: string;
  balance: number;
  transations: Array<object>;
}

export const ExtractContext = createContext<Partial<ContextTypes>>({});

interface ExtractProviderTypes {
  children: ReactNode;
}

export const ExtractProvider = ({ children }: ExtractProviderTypes) => {
  function handleExtract() {
    if (!loading) {
      try {
        setLoading(true);
        getExtract({
          cpf: '12345678912',
          agency: '5507',
          verificationAgencyDigit: '3',
          accountNumber: '607245',
          verificationAccountDigit: '6',
        }).then((response) => {
          console.log(response.data.data.transations);
          setExtract(response.data.data.transations);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      console.log('está carregando');
    }
  }

  const [extract, setExtract] = useState<ExtractTypes>({
    agencyNumber: '',
    agencyVerificationCode: '',
    accountNumber: '',
    accountVerificationCode: '',
    owner: '',
    document: '',
    birthdate: '',
    balance: 0,
    transations: [],
  });
  const [loading, setLoading] = useState(false);

  return (
    <ExtractContext.Provider
      value={{
        extract,
        loading,
        handleExtract,
      }}
    >
      {children}
    </ExtractContext.Provider>
  );
};

export const useExtract = () => useContext(ExtractContext);
