import Image from 'next/image';
import React from 'react';
import arrowIcon from '../../../public/svgs/arrow_down.svg';
import clockIcon from '../../../public/svgs/Icon_History.svg';
import stateMessageIcon from '../../../public/welcome_images/Empty_Searches.png';
import styles from './welcomePage.module.scss';
import welcomeMessageIcon from '../../../public/welcome_images/Empty_State_1.png';

const WelcomePage = () => {
    const {
        arrowIconAndTextContainer,
        arrowIconStyle,
        welcomeText,
        topSection,
        bottomText,
        welcomeMessage,
        resentSearches
    } = styles;

  return (
    <>
    <div className={welcomeMessage}>
      <Image src={welcomeMessageIcon} width={200} alt="chat messages" />
      <div className={welcomeText}>
        Start your people search by applying any filter in the left panel
      </div>
    </div><div className={resentSearches}>
        <div className={topSection}>
          <Image src={clockIcon} width={16} alt="clock" />
          <span>Recent searches</span>
        </div>
        <Image
          src={stateMessageIcon}
          width={80}
          alt="chat messages with cursor pointer" />
        <div className={bottomText}>
          Your last four searches will be here for quick access
        </div>
      </div><div className={arrowIconAndTextContainer}>
        <Image
          className={arrowIconStyle}
          width={40}
          height={20}
          src={arrowIcon}
          alt="arrow to left like a rainbow" />
        <div className="text">Add filters to begin your search</div>
      </div>
    </>
  );
};

export default WelcomePage;