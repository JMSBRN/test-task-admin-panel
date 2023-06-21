import React, { useState } from 'react';
import Image from 'next/image';
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
    contentWrapper,
    title,
    content,
    customerName
   } =
    styles;
    const [customerNameRendered, setCustomerNameRendered] =useState<boolean>(false);
    const handleRenderCustomerName = () => {
        setCustomerNameRendered(!customerNameRendered);
    };

  return (
    <div className={CustomerModalContiner}>
      <div className={closeBtn} onClick={handleCloseModal} />
      <div className={topContainer}>
        {
          customerNameRendered ? (<div 
          className={customerName}
          onClick={handleRenderCustomerName}
          >
             Will Gibbons
          </div>) : (
              <button onClick={handleRenderCustomerName}>
              <Image
                width={20}
                height={20}
                alt={'logo user with arrow'}
                src={userIcon}
                style={{ filter: 
                  // eslint-disable-next-line max-len
                  'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(334deg) brightness(105%) contrast(103%)'
                 }}
              />
              <div>
               Get access to name
              </div>
            </button>
          )
        }
      
      </div>
      <div className={mainContainer}>
        <div className={contentWrapper}>
          <div className={title}>job title</div>
          <div className={content}>Software Engineer</div>
        </div>
        <div className={contentWrapper}>
          <div className={title}>Industry</div>
          <div className={content}>Information Technology</div>
        </div>
        <div className={contentWrapper}>
          <div className={title}>Location</div>
          <div className={content}>Warsaw, Poland</div>
        </div>
        <div className={contentWrapper}>
          <div className={title}>Description</div>
          <p >Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Numquam in quo facilis possimus suscipit veritatis
              consequuntur nulla quisquam dolorum non!</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;
