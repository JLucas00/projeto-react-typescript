import { UploadSimple } from 'phosphor-react';
import React, { useContext, useState } from 'react';
import { Card } from '../../components/Card';
import { DepositWithdrawCard } from '../../components/DepositWithdrawCard';
import { HeaderBase } from '../../components/HeaderBase';
import { HeaderContent } from '../../components/HeaderContent';
import { getExtract } from '../../libs/api';
import { ModeContext } from '../../providers/ModeProvider';

/**
 * Archive: src/pages/Deposit.tsx
 *
 * Description: Deposit page
 *
 * Date: 2022/08/05
 *
 * Author: Augusto, João e Yeté

 */

export const Deposit = () => {
  const [modal, setModal] = useState(false);

  const mockData = {
    username: 'Dhensen',
    agency_number: '1510',
    agency_verification_code: '5',
    account_number: '95785',
    account_verification_code: '3',
    balance: '132.759,30',
  };
  const useMode = useContext(ModeContext);

  const theme = useMode.theme;
  const objTheme = {
    light: {
      body: 'h-screen w-full flex flex-col bg-body-light-200',
    },
    dark: {
      body: 'h-screen w-full flex flex-col bg-body-dark',
    },
  };

  return (
    <div className={objTheme[theme].body}>
      <HeaderBase>
        <HeaderContent content_data={mockData} />
      </HeaderBase>
      <div className="h-2/3 w-full mt-7 flex items-center justify-center">
        <Card title="Depósito" icon={<UploadSimple />}>
          <DepositWithdrawCard title="depósito" buttonLabel="Depositar" />
        </Card>
      </div>
    </div>
  );
};
