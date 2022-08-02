/**
 * Archive: src/pages/Transfer.tsx
 *
 * Description: Transfer page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */
import { ArrowsLeftRight } from 'phosphor-react';
import React from 'react';
import { Card } from '../../components/Card';
import { HeaderBase } from '../../components/HeaderBase';
import { HeaderContent } from '../../components/HeaderContent';
import { TransferCard } from '../../components/TransferCard';

const mockData = {
  username: 'Dhensen',
  agency_number: '1510',
  agency_verification_code: '5',
  account_number: '95785',
  account_verification_code: '3',
  balance: '132.759,30',
};

export const Transfer = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      <HeaderBase>
        <HeaderContent content_data={mockData} />
      </HeaderBase>
      <div className="h-2/3 w-full mt-7 flex items-center justify-center">
        <Card title="Transferência" icon={<ArrowsLeftRight />}>
          <TransferCard />
        </Card>
      </div>
    </div>
  );
};
