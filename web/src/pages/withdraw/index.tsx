/**
 * Archive: src/pages/Withdraw.tsx
 *
 * Description: Withdraw page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */
import { DownloadSimple } from 'phosphor-react';
import React, { useContext } from 'react';
import { Card } from '../../components/Card';
import { DepositWithdrawCard } from '../../components/DepositWithdrawCard';
import { HeaderBase } from '../../components/HeaderBase';
import { HeaderContent } from '../../components/HeaderContent';
import { ModeContext } from '../../providers/ModeProvider';

const mockData = {
  username: 'Dhensen',
  agency_number: '1510',
  agency_verification_code: '5',
  account_number: '95785',
  account_verification_code: '3',
  balance: '132.759,30',
};

export const Withdraw = () => {
  const useMode = useContext(ModeContext);

  const theme = useMode.theme;
  const objTheme = {
    light: {
      body: 'h-screen w-full flex flex-col bg-body-light-bg',
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
        <Card title="Saque" icon={<DownloadSimple />}>
          <DepositWithdrawCard title="saque" buttonLabel="Sacar" />
        </Card>
      </div>
    </div>
  );
};
