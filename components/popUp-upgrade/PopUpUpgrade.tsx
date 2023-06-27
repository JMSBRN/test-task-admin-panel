import Image from 'next/image';
import React from 'react';
import popUpIcon from '../../public/svgs/popUp_Icon.svg';
import styles from './popUpUpgrade.module.scss';
import { useRouter } from 'next/router';

const PopUpUpgrade = ({ setScrollLimited }: { 
    setScrollLimited:  React.Dispatch<React.SetStateAction<boolean>>
 }) => {
    const {
        closeBtn,
        popUpUpgrade,
        popUpTitle,
        popUpText,
        popUpBotomText,
    } = styles;

   const { push } = useRouter();

  return (
         <div className={popUpUpgrade}>
            <div className={closeBtn} onClick={() => setScrollLimited(false)} />
            <Image width={55} alt="popUp icon" src={popUpIcon} />
            <div className={popUpTitle}>Upgarde now</div>
            <div className={popUpText}>
              You are on limited version which allows viewing up to 100
              contacts. Upgrade your plan to view all pages.
            </div>
            <button onClick={() => push('/profile')}>Upgrade</button>
            <div
              className={popUpBotomText}
              onClick={() => setScrollLimited(false)}
            >
              Maybe later
            </div>
          </div>
  );
};

export default PopUpUpgrade;