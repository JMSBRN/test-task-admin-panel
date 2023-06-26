import Image from 'next/image';
import React from 'react';
import noResultsImage from '../../public/images/No Results@3x.png';
import styles from './noResultsPage.module.scss';

const NoResultsPage = () => {
  const { mainContainer, messageContainer, mainTitle, secondeTitle } = styles;

  return (
    <div className={mainContainer}>
      <div className={messageContainer}>
        <Image
          width={158}
          src={noResultsImage}
          alt="task paper with magnifying glass"
        />
        <div className={mainTitle}>No results found</div>
        <div className={secondeTitle}>
          We couldn’t find what you searched for. Please try again.
        </div>
        <button>Clear filters</button>
      </div>
    </div>
  );
};

export default NoResultsPage;
