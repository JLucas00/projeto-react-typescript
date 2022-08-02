import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HeaderBase } from '../../components/HeaderBase';
import { HeaderContent } from '../../components/HeaderContent';
/**
 * Archive: src/pages/Extract.tsx
 *
 * Description: Extract page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */

const mockData = {
  username: 'Dhensen',
  agency_number: '1510',
  agency_verification_code: '5',
  account_number: '95785',
  account_verification_code: '3',
  balance: '132.759,30',
};

export const Transaction = () => {
  // const { transactionId } = useParams<Record<string, string | undefined>>();
  // console.log(transactionId);

  return (
    <div className="h-screen w-full flex flex-col">
      <HeaderBase>
        <HeaderContent content_data={mockData} />
      </HeaderBase>
    </div>
  );
};
