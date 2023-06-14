import Image from 'next/image';
import React from 'react';
import SearchForm from '../search-form/SearchForm';
import arrowIcon from '../../public/svgs/arrow_down.svg';
import clockIcon from '../../public/svgs/Icon_History.svg';
import stateMessageIcon from '../../public/welcome_images/Empty_Searches.png';
import styles from './searchPage.module.scss';
import welcomeMessageIcon from '../../public/welcome_images/Empty_State_1.png';

interface SearchPageProps {
  table?: React.ReactElement;
}
const SearchPage = ({ table }: SearchPageProps) => {
  const {
    searchPageContainer,
    topContainer,
    leftSideContainer,
    arrowIconAndTextContainer,
    arrowIconStyle,
    logo,
    total,
    elipse2M,
    formTitle,
    searchFormContainer,
    centerContiner,
    welcomeMessage,
    resentSearches,
    elipseKM,
    welcomeText,
    topSection,
    bottomText,
  } = styles;

  return (
    <div className={searchPageContainer}>
      <div className={topContainer}>
        <div className={total}>Total</div>
        <div className={elipse2M}>2M</div>
        <div className={elipseKM}>KM</div>
      </div>
      <div className={leftSideContainer}>
        <div className={logo}>Logo</div>
        <div className={formTitle}>Filters</div>
        <div className={searchFormContainer}>
          <SearchForm />
        </div>
      </div>
      <div className={centerContiner}>
        { !table ? (
          <>
          <div className={welcomeMessage}>
            <Image src={welcomeMessageIcon} width={200} alt="chat messages" />
            <div className={welcomeText}>
              Start your people search by applying any filter in the left panel
            </div>
          </div><div className={resentSearches}>
              <div className={topSection}>
                <Image src={clockIcon} width={20} alt="clock" />
                <span>Resent searches</span>
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
        ) : table || null }
      </div>
    </div>
  );
};

export default SearchPage;
