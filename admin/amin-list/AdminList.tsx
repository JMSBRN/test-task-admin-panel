import { Pagination, useGetList } from 'react-admin';
import React, { useEffect, useState } from 'react';
import CustomerModal from '../../components/customer-modal/CustomerModal';
import Image from 'next/image';
import polygonDown from '../../public/svgs/Polygon 2.svg';
import polygonUP from '../../public/svgs/Polygon 1.svg';
import popUpIcon from '../../public/svgs/popUp_Icon.svg';
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
    closeBtn,
    popUpUpgrade,
    popUpTitle,
    popUpText,
    popUpBotomText,
  } = styles;
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(12);
  const [scrollLimited, setScrollLimited] = useState<boolean>(false);
  const [customerModalRendered, setCustomerModalRendered] = useState<boolean>(false);
  const { data, total } = useGetList('contacts', { pagination: { page, perPage } });

  useEffect(() => {
    if(page > 5){
      setScrollLimited(true);
    }
  }, [page]);

  const handleGetCustomerName = () => {
    setCustomerModalRendered(true);
  };
  const handleCloseModal = () => {
    setCustomerModalRendered(false);
  };
  
  return (
    <>
    {
      customerModalRendered && <CustomerModal handleCloseModal={handleCloseModal} />
    }
      <div
        className={tableContainer}
      >
         { scrollLimited  && 
           <div className={popUpUpgrade}>
             <div className={closeBtn} onClick={() => setScrollLimited(false)} />
                 <Image 
                   width={55} 
                   alt=" popUp icon" 
                   src={popUpIcon}
                  />
                 <div className={popUpTitle}>
                  Upgarde now
                  </div>
                 <div className={popUpText}>
                  You are on limited 
                  version which allows viewing
                  up to 100 contacts.
                  Upgrade your plan to view all pages.
                  </div>
                  <button>Upgrade</button>
                  <div 
                  className={popUpBotomText}
                  onClick={() => setScrollLimited(false)}
                  >
                  Maybe later
                  </div>
           </div>
       }
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
        <div className={tableStyle} >
          {data?.map((el) => (
            <div className={rowStyle} key={el.id}>
              <div className={tableButton}>
                <button onClick={handleGetCustomerName}>
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
        <Pagination
            rowsPerPageOptions={[12]}
            page={page}
            setPage={scrollLimited ? ()=> page : setPage}
            perPage={perPage}
            setPerPage={setPerPage}
            total={total}
            sx={{
              '.MuiToolbar-root': {
                position: 'absolute',
                left: '5px',
                bottom: '20px',
               },
               '.MuiPagination-ul': {
                 marginLeft: '21px',
                 width: '300px',
                 '& li': {
                   margin: '-3px'
                 },
                 '& .MuiPaginationItem-previousNext': {
                  width: '33px',
                  height: '30px',
                  border: '1px solid lightgrey',
                  borderRadius: '5px',
                 }
               },
               '.Mui-selected': {
                width: '36px',
                height: '34px',
                border: '1px solid darkBlue',
                borderRadius: '5px',
                marginLeft: '21px'
               }
            }}
          />
      </div>
    </>
  );
};

export default AdminList;
