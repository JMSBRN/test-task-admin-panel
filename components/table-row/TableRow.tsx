import { Contact, ContactPersonalData } from '../interfaces';
import Image from 'next/image';
import React from 'react';
import styles from './TableRow.module.scss';
import userIcon from '../../public/svgs/Icon_User.svg';
import verifyIcon from '../../public/svgs/Verify.svg';

interface TableRowProps {
  el: Contact;
  id: string;
  personalData: ContactPersonalData;
  contactNameRendered: boolean;
  handleClickGetContact: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => Promise<void>;
  handleGetContactName: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => Promise<void>;
  setContactModalRendered: (value: React.SetStateAction<boolean>) => void;
}
const TableRow = ({
  el,
  id,
  personalData,
  handleClickGetContact,
  handleGetContactName,
  contactNameRendered,
  setContactModalRendered,

}: TableRowProps) => {
  const {
    rowStyle,
    tableButton,
    getNameBtnText,
    imagesContainer,
    veriFyImage,
    tableContent,
    rowLayout,
    contactName,
  } = styles;
   const { country, iso3 } = el.country;
   const { name, surname } = personalData;

   const handleClickContent = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleClickGetContact(e);
    setContactModalRendered(true);
   };

  return (
    <div
    id={el.id}
    key={el.id}
    className={rowLayout}
  >
    <div className={rowStyle}>
      <div
        id={el.id}
        className={tableButton}
        onClick={handleGetContactName}
      >
        {el.id === id && contactNameRendered ? (
          <div className={contactName}>
          { !personalData.name &&  <span>loading...</span>  }
            { personalData && `${name} ${surname}` || 'Will Gibbons' }
          </div>
        ) : (
          <button>
            <div className={imagesContainer}>
              <Image
                className={veriFyImage}
                width={12}
                src={verifyIcon}
                alt="verify arrow in green bg"
              />
              <Image
                width={20}
                height={20}
                alt={'logo user with arrow'}
                src={userIcon}
              />
            </div>
            <div className={getNameBtnText}>Get the name</div>
          </button>
        )}
      </div>
      <div
        id={el.id}
        onClick={handleClickContent}
        className={tableContent}
      >
        {el.job_title}
      </div>
      <div
       id={el.id}
        onClick={handleClickContent}
        className={tableContent}
      >
        {el.industry}
      </div>
      <div
       id={el.id}
        onClick={handleClickContent}
        className={tableContent}
      >
        { (country && iso3) &&`${ country }, ${ iso3 }`}
      </div>
    </div>
  </div>
  );
};

export default TableRow;