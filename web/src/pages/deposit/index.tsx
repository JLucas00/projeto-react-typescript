import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { HeaderBase } from '../../components/HeaderBase';
import { HeaderContent } from '../../components/HeaderContent';
import { Modal } from '../../components/Modal';
import { getExtract } from '../../libs/api';

/**
 * Archive: src/pages/Deposit.tsx
 *
 * Description: Deposit page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */

export const Deposit = () => {
  const [modal, setModal] = useState(false);

  function handleDeposit() {
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

  const mockData = {
    username: 'Dhensen',
    agency_number: '1510',
    agency_verification_code: '5',
    account_number: '95785',
    account_verification_code: '3',
    balance: '132.759,30',
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <HeaderBase>
        <HeaderContent content_data={mockData} />
      </HeaderBase>
    </div>
  );
};
