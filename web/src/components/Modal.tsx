import { X } from 'phosphor-react';
import { MouseEvent, useEffect, useRef } from 'react';
import { Button } from './Button';

interface PropTypes {
  title: string;
  handleConfirmModal: () => void;
  setModal: (modal: boolean) => void;
}

/**
 * Archive: src/components/Modal.tsx
 *
 * Description: Modal component
 *
 * Date: 2022/07/22
 *
 * Author: Rey
 */

export const Modal = ({ title, handleConfirmModal, setModal }: PropTypes) => {
  const modalRef = useRef<HTMLDivElement>(null);

  function closeModal(event: MouseEvent<HTMLDivElement>) {
    if (event.target === modalRef.current) {
      setModal(false);
    }
  }

  useEffect(() => {
    window.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'Escape') {
          setModal(false);
        }
      },
      false,
    );
  }, []);

  return (
    <div
      className="z-50 h-screen fixed top-0 left-0 right-0 bottom-0 flex justify-center items-end bg-black bg-opacity-50"
      ref={modalRef}
      onClick={closeModal}
    >
      <div className="w-screen py-2 px-5 flex flex-col item-center rounded-t-2xl bg-white">
        <div className="flex justify-between items-center">
          <h3 className="text-lg text-header-dark">{title}</h3>
          <X
            weight="bold"
            className="w-6 h-6 text-icon-dark-200"
            onClick={() => setModal(false)}
          />
        </div>
        <p className="my-5 px-5 text-sm text-center text-paragraph-dark font-medium">
          Esta ação efetuará a transação. deseja continuar?
        </p>
        <div className="mb-5 flex justify-center gap-5">
          <Button
            type="button"
            category="cancel"
            label="Cancelar"
            onClick={() => setModal(false)}
          />
          <Button
            type="button"
            category="primary"
            label="Confirmar"
            onClick={() => handleConfirmModal()}
          />
        </div>
      </div>
    </div>
  );
};
