import React from 'react';
import styles from './adminList.module.scss';
import { useGetList } from 'react-admin';

const AdminList = () => {
  const {
    tableContainer,
    tableStyle,
    tableHeader,
    rowStyle,
    tableButton
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
                <button>Get the name</button>
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