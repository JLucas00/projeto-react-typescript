/**
 * Archive: src/pages/Extract.tsx
 *
 * Description: Extract page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */
import { Bank } from 'phosphor-react';
import React, { useContext } from 'react';
import { Card } from '../../components/Card';
import { ExtractCard } from '../../components/ExtractCard';
import { HeaderBase } from '../../components/HeaderBase';
import { HeaderContent } from '../../components/HeaderContent';
import { ModeContext } from '../../providers/ModeProvider';
import { ExtractContext } from '../../providers/ExtractProvider';

const mockData = {
  username: 'Dhensen',
  agency_number: '1510',
  agency_verification_code: '5',
  account_number: '95785',
  account_verification_code: '3',
  balance: '132.759,30',
};

export const Extract = () => {
  const useExtract = useContext(ExtractContext);
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
        <HeaderContent
          content_data={mockData}
          handleData={useExtract.handleExtract}
        />
      </HeaderBase>
      <div className="h-2/3 w-full mt-7 flex items-center justify-center">
        <Card title="Extrato de transações" icon={<Bank />} notify={true}>
          <ExtractCard />
        </Card>
      </div>
    </div>
  );
};
