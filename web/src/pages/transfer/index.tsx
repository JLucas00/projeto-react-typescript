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
import React, { useContext } from 'react';
import { Card } from '../../components/Card';
import { HeaderBase } from '../../components/HeaderBase';
import { HeaderContent } from '../../components/HeaderContent';
import { TransferCard } from '../../components/TransferCard';
import { ModeContext } from '../../providers/ModeProvider';

const mockData = {
  username: 'Dhensen',
  agency_number: '1510',
  agency_verification_code: '5',
  account_number: '95785',
  account_verification_code: '3',
  balance: '132.759,30',
};

export const Transfer = () => {
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
        <Card title="Transferência" icon={<ArrowsLeftRight />}>
          <TransferCard />
        </Card>
      </div>
    </div>
  );
};
