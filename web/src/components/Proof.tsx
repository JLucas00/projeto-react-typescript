import React, { useContext, useState } from 'react';
import { ModeContext } from '../providers/ModeProvider';

type proofProps = {
  transferID: string;
};

export const Proof = ({ transferID }: proofProps) => {
  const useMode = useContext(ModeContext);

  const theme = useMode.theme;
  const objTheme = {
    light: {
      proof:
        'w-full p-1 flex flex-col justify-start gap-y-1 rounded bg-body-light-100 ',
      textTitle: 'text-title text-paragraph-light-200 ',
      textProof: 'text-proof text-paragraph-light-200 ',
      textProofTitleAccount: 'text-proof text-paragraph-light-200 mt-3.5',
      textProofData: 'text-proof text-paragraph-light-100  mt-3.5',
      textProofAccount: 'text-proof text-paragraph-light-100 pl-2.5',
    },
    dark: {
      proof: 'w-full p-1 flex flex-col justify-start gap-y-1 ',
      textTitle: 'text-title text-paragraph-light-100 ',
      textProof: 'text-proof text-paragraph-light-100 ',
      textProofTitleAccount: 'text-proof text-paragraph-light-100  mt-3.5',
      textProofData: 'text-proof text-paragraph-light-200 mt-3.5',
      textProofAccount: 'text-proof text-paragraph-light-200 pl-2.5',
    },
  };

  const teste: boolean = true;

  return (
    <div className={objTheme[theme].proof}>
      <p className={objTheme[theme].textProof}>
        Tipo: Transferência - Recebida
      </p>
      <p className={objTheme[theme].textProofData}>Data: 09/06/2001</p>

      {teste ? (
        <div>
          <p className={objTheme[theme].textProofTitleAccount}>
            Dados de destino:
          </p>
          <p className={objTheme[theme].textProofAccount}>
            Nome: Yeté Abunã Marques Labarca
          </p>
          <p className={objTheme[theme].textProofAccount}>Agência: 123456789</p>
          <p className={objTheme[theme].textProofAccount}>
            Conta: 123456789123
          </p>
        </div>
      ) : (
        false
      )}

      <div className="w-full flex justify-between align-middle mt-3.5">
        <p className={objTheme[theme].textTitle}>Valor</p>
        <p className={'text-proof text-value-red '}>- R$ 300,00</p>
      </div>
    </div>
  );
};
