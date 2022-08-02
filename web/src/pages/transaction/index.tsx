import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HeaderBase } from '../../components/HeaderBase';
import { HeaderContent } from '../../components/HeaderContent';
import { ModeContext } from '../../providers/ModeProvider';
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
    </div>
  );
};
