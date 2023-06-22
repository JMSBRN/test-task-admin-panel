import React, { useState } from 'react';
import { Contact } from '../interfaces';
import Image from 'next/image';
import styles from './customerModal.module.scss';
import userIcon from '../../public/svgs/Icon_User.svg';

interface CustomerModalProps {
  handleCloseModal: () => void;
  contact: Contact;
}
const ContactModal = ({ handleCloseModal, contact }: CustomerModalProps) => {
  const { 
    CustomerModalContiner,
    closeBtn,
    topContainer,
    mainContainer,
    contentWrapper,
    title,
    content,
    customerName,
    descriptionStyle
   } =
    styles;
    const [customerNameRendered, setCustomerNameRendered] =useState<boolean>(false);
    const { job_title , country , industry, description } = contact;

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
            { contact.name || 'Will Gibbon' }
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
          <div className={content}>{job_title}</div>
        </div>
        <div className={contentWrapper}>
          <div className={title}>Industry</div>
          <div className={content}>{industry}</div>
        </div>
        <div className={contentWrapper}>
          <div className={title}>Location</div>
          <div className={content}>{country}</div>
        </div>
        <div className={contentWrapper}>
          <div className={title}>Description</div>
          <div className={descriptionStyle}>
          {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
