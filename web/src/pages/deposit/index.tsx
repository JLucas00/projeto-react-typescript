import React, { useState } from 'react';
import { Button } from '../../components/Button';
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

  return (
    <>
      {modal && (
        <Modal
          title="Depósito"
          setModal={setModal}
          handleConfirmModal={handleDeposit}
        />
      )}
      <div className="flex flex-col gap-5">
        <Button
          category="primary"
          label="Abrir modal"
          onClick={() => setModal(true)}
        />
        <Button
          category="secondary"
          label="Abrir modal"
          onClick={() => setModal(true)}
        />
        <Button
          category="cancel"
          label="Abrir modal"
          onClick={() => setModal(true)}
        />
      </div>
    </>
  );
};
