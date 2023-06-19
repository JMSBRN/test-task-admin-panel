import Image from 'next/image';
import React from 'react';
import styles from './adminList.module.scss';
import { useGetList } from 'react-admin';
import userIcon from '../../public/svgs/Icon_User.svg';
import verifyIcon from '../../public/svgs/Verify.svg';

const AdminList = () => {
  const {
    tableContainer,
    tableStyle,
    tableHeader,
    rowStyle,
    tableButton,
    getNameBtnText,
    imagesContainer,
    veriFyImage
  } = styles;
  const { data } = useGetList('contacts');

 return (
    <div className={tableContainer}>
      <div className={tableHeader}>
      </div>
  <div className={tableStyle}>
        {
          data?.map((el) => (

            <div className={rowStyle} key={el.id}>
              <div className={tableButton}>
                <button>
                  <div className={imagesContainer}>
                  <Image 
                    className={veriFyImage}
                    width={12}
                    src={verifyIcon}
                    alt=" verify arrow in green bg"
                    />
                  <Image width={20} height={20} alt={'logo user with arrow'}
                  src={userIcon}
                  />
                  </div>
                   <div className={getNameBtnText}>
                    Get the name
                    </div>
                  </button>
              </div>
              <div>{el.job_title}</div>
              <div>{el.industry}</div>
              <div>{el.country}</div>
            </div>
          ))
        }
  </div>
    </div>
  );
};

export default AdminList;