import React from 'react';
import { createPortal } from 'react-dom';

import styles from './BaseModal.module.scss';

interface BaseModalProps {
  show: boolean;
  setShow: () => void;
  children: JSX.Element;
}

const BaseModal: React.FC<BaseModalProps> = ({ show, setShow, children }) => {
  return (
    <dialog className={styles.baseModal} open={show}>
      <div className={styles.modalContainer}>
        <button onClick={() => setShow()} type="button">
          close
        </button>
        {children}
      </div>
    </dialog>
  );
};

export default BaseModal;
