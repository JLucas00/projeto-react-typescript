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
import React from 'react';
import { Card } from '../../components/Card';
import { DepositWithdrawCard } from '../../components/DepositWithdrawCard';
import { HeaderBase } from '../../components/HeaderBase';
import { HeaderContent } from '../../components/HeaderContent';

const mockData = {
  username: 'Dhensen',
  agency_number: '1510',
  agency_verification_code: '5',
  account_number: '95785',
  account_verification_code: '3',
  balance: '132.759,30',
};

export const Withdraw = () => {
  return (
    <div className="h-screen w-full flex flex-col">
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
