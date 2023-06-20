import { List, Pagination, useGetList } from 'react-admin';
import React, { useState } from 'react';
import Image from 'next/image';
import polygonDown from '../../public/svgs/Polygon 2.svg';
import polygonUP from '../../public/svgs/Polygon 1.svg';
import styles from './adminList.module.scss';
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
    veriFyImage,
    tableContent,
    sortBtn,
    btnsContainer,
  } = styles;
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(12);
  const [limitScrolled, setLimitScrolled] = useState<boolean>(false);
  const { data } = useGetList('contacts', { pagination: { page, perPage } });

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (e.currentTarget.scrollTop > 3288) {
      setLimitScrolled(true);
    }
  };

  return (
    <>
    { limitScrolled && 
      <div className="">LImit....</div>
    }
      <List
        resource="contacts"
        pagination={
          <Pagination
            rowsPerPageOptions={[12, 25, 50, 100]}
            page={page}
            setPage={setPage}
            perPage={perPage}
            setPerPage={setPerPage}
          />
        }
        className={tableContainer}
      >
        <div className={tableHeader}>
          <div className={sortBtn}>
            <div>Full name</div>
            <div className={btnsContainer}>
              <button>
                <Image width={7} alt="Polygon" src={polygonUP} />
              </button>
              <button>
                <Image width={7} alt="Polygon" src={polygonDown} />
              </button>
            </div>
          </div>
          <div className={sortBtn}>
            <div style={{ marginLeft: '10px', letterSpacing: '0.5px' }}>
              job title
            </div>
            <div className={btnsContainer}>
              <button>
                <Image width={7} alt="Polygon" src={polygonUP} />
              </button>
              <button>
                <Image width={7} alt="Polygon" src={polygonDown} />
              </button>
            </div>
          </div>
          <div className={sortBtn}>
            <div>industry</div>
            <div className={btnsContainer}>
              <button>
                <Image width={7} alt="Polygon" src={polygonUP} />
              </button>
              <button>
                <Image width={7} alt="Polygon" src={polygonDown} />
              </button>
            </div>
          </div>
          <div className={sortBtn}>
            <div>Location</div>
            <div className={btnsContainer}>
              <button>
                <Image width={7} alt="Polygon" src={polygonUP} />
              </button>
              <button>
                <Image width={7} alt="Polygon" src={polygonDown} />
              </button>
            </div>
          </div>
        </div>
        <div className={tableStyle} onScroll={handleScroll}>
          {data?.map((el) => (
            <div className={rowStyle} key={el.id}>
              <div className={tableButton}>
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
              </div>
              <div className={tableContent}>{el.job_title}</div>
              <div className={tableContent}>{el.industry}</div>
              <div className={tableContent}>{el.country}</div>
            </div>
          ))}
        </div>
      </List>
    </>
  );
};

export default AdminList;
