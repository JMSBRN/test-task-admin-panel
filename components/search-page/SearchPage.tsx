import Image from 'next/image';
import React from 'react';
import SearchForm from '../search-form/SearchForm';
import arrowIcon from '../../public/svgs/arrow_down.svg';
import styles from './searchPage.module.scss';

const SearchPage = () => {
  const { 
      searchPageContainer,
      topContainer,
      leftSideContainer,
      arrowIconAndTextContainer,
      arrowIconStyle,
      logo,
      total
     } = styles;

  return (
    <div className={searchPageContainer}>
      <div className={topContainer}>
        <div className={total}>Total</div>
      </div>
      <div className={leftSideContainer}>
        <div className={logo}>Logo</div>
        <div className="formTitle">Filters</div>
        <SearchForm />
      </div>
      <div className={arrowIconAndTextContainer}>
        <Image 
        className={arrowIconStyle}
        width={40} height={20}
        src={arrowIcon}
        alt="arrow to left like a rainbow"
         />
        <div className="text">Add filters to begin your search</div>
      </div>
    </div>
  );
};

export default SearchPage;
