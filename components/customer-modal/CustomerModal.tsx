import Image from 'next/image';
import React from 'react';
import styles from './customerModal.module.scss';
import userIcon from '../../public/svgs/Icon_User.svg';

interface CustomerModalProps {
  handleCloseModal: () => void;
}
const CustomerModal = ({ handleCloseModal }: CustomerModalProps) => {
  const { 
    CustomerModalContiner,
    closeBtn,
    topContainer,
    mainContainer,
    title,
    content,
    contentWrapper
   } =
    styles;

  return (
    <div className={CustomerModalContiner}>
      <div className={closeBtn} onClick={handleCloseModal} />
      <div className={topContainer}>
        <button>
          <Image
            width={20}
            height={20}
            alt={'logo user with arrow'}
            src={userIcon}
          />
          <div>
           Get access to name
          </div>
        </button>
      </div>
      <div className={mainContainer}>
        <div className={contentWrapper}>
          <div className={title}>jpb title</div>
          <div className={content}>Content</div>
        </div>
        <div className={contentWrapper}>
          <div className={title}>jpb title</div>
          <div className={content}>Content</div>
        </div>
        <div className={contentWrapper}>
          <div className={title}>jpb title</div>
          <div className={content}>Content</div>
        </div>
        <div className={contentWrapper}>
          <div className={title}>jpb title</div>
          <div className={content}>Content</div>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;
