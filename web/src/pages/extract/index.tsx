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
import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { ExtractCard } from '../../components/ExtractCard';
import { HeaderBase } from '../../components/HeaderBase';
import { HeaderContent } from '../../components/HeaderContent';
import { getExtract } from '../../libs/api';

const mockData = {
  username: 'Dhensen',
  agency_number: '1510',
  agency_verification_code: '5',
  account_number: '95785',
  account_verification_code: '3',
  balance: '132.759,30',
};

export const Extract = () => {
  function handleExtract() {
    try {
      getExtract({
        cpf: '12345678912',
        agency: '5507',
        verificationAgencyDigit: '3',
        accountNumber: '607245',
        verificationAccountDigit: '6',
      }).then((response) => console.log(response.data.data.transations));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <HeaderBase>
        <HeaderContent content_data={mockData} handleData={handleExtract} />
      </HeaderBase>
      <div className="h-2/3 w-full mt-7 flex items-center justify-center">
        <Card title="Extrato de transações" icon={<Bank />} notify={true}>
          <ExtractCard />
        </Card>
      </div>
    </div>
  );
};
