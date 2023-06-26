import Image from 'next/image';
import React from 'react';
import polygonDownImage from '../../public/svgs/Polygon 2.svg';
import polygonUpImage from '../../public/svgs/Polygon 1.svg';
import styles from './sotrButton.module.scss';

const SortButton = () => {
    const { sortBtnStyle, btnsContainer } = styles;

  return (
    <div className={sortBtnStyle}>
        <div className={btnsContainer}>
        <button>
          <Image  width={5} alt="Polygon" src={polygonUpImage} />
        </button>
        <button>
          <Image  width={5} alt="Polygon" src={polygonDownImage} />
        </button>
          </div>
    </div>
  );
};

export default SortButton;