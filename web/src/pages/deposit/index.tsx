import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { api } from '../../libs/api';

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

  async function handleDeposit() {
    try {
      const result = await api.post('deposit', {
        agency: '',
        account: '',
        value: '',
      });
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
