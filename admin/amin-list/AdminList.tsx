import { Contact, ContactInfo, ContactPersonalData, Country } from '../../components/interfaces';
import { NextApiRequest, NextApiResponse } from 'next';
import { Pagination, useGetList } from 'react-admin';
import React, { useEffect, useState } from 'react';
import { 
  getContactInfo,
  getContactName,
  getFetchDataForSelectList,
  setCamelCaseStringToObject
 } from '../../utils/apiUtils';
import ContactModal from '../../components/contact-modal/ContactModal';
import Loader from '../../components/loader/Loader';
import NoResultsPage from '../../components/pages/no-results-page/NoResultsPage';
import PopUpUpgrade from '../../components/popUp-upgrade/PopUpUpgrade';
import SortButton from '../../components/sort-button/SortButton';
import TableRow from '../../components/table-row/TableRow';
import { getDecryptedDataFromCookie } from '../../utils/secureCookiesUtils';
import styles from './adminList.module.scss';
import sxPaginationStyle from './sxStyleProps';

const AdminList = () => {
  const {
    tableContainer,
    tableStyle,
    tableHeader,
    sortBtn,
    loaderStyle
  } = styles;
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(100);
  const [scrollLimited, setScrollLimited] = useState<boolean>(false);
  const [contactNameRendered, setContactNameRendered] =
    useState<boolean>(false);
  const [contactModalRendered, setContactModalRendered] =
    useState<boolean>(false);
  const [idForGetNameBtn, setIdForGetNameBtn] = useState<string>('');

  const { data, total, isFetchedAfterMount } = useGetList('contacts', {
    pagination: { page, perPage },
  });

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({} as ContactInfo);
  const [personalData, setPersonalData] = useState<ContactPersonalData>({ name: '', surname: '' });
  const req = {} as NextApiRequest;
  const res = {} as NextApiResponse;

  useEffect(() => {
    if (page > 1) {
      setScrollLimited(true);
    }
  }, [page]);

  useEffect(() => {
    setIsLoading(true);
    const fetchFn =async () => {
      const token = getDecryptedDataFromCookie('token');
      const countries: Country[] = await getFetchDataForSelectList('country', token!);

       if(countries && data) {
        let newArr: any[] = [];
        
        setIsLoading(false);

        data?.forEach(el  => {
          if(el.country) {
            const  { iso3 } = countries.filter(c => c.name === el.country)[0] || '';

              newArr = [...data, el.country = { country: el.country, iso3 }];
          }
        });
        setContacts(newArr);
      }
    };

     fetchFn();
  },[data]);

  const handleGetContactName = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const id = e.currentTarget.id;
    
    setPersonalData({ name: '', surname: '' });
    setContactModalRendered(false);

    data?.forEach((el) => {  
      (el.id === id) &&  setIdForGetNameBtn(el.id);
    });
    setContactNameRendered(!contactNameRendered);
    const apiContactName = await getContactName(id);
    
    if(apiContactName)  {
      const contactPersonalData = setCamelCaseStringToObject(apiContactName);

      contactPersonalData &&  setPersonalData(contactPersonalData);
    }
  };

  const handleClickGetContact = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setPersonalData({ name: '', surname: '' });
    setContactNameRendered(false);
    const id = e.currentTarget.id;
    const contactInfo = await getContactInfo(id, req, res);

    contactInfo && setContactInfo(contactInfo);
    const apiContactName = await getContactName(id);
    
    if(apiContactName)  {
      const contactPersonalData = setCamelCaseStringToObject(apiContactName);

      contactPersonalData &&  setPersonalData(contactPersonalData);
    }
  };

  const handleCloseModal = () => {
    setContactModalRendered(false);
  };

  const handleScrollTable = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollTopValue = e.currentTarget.scrollTop;

     if (scrollTopValue > 3280) {
      setScrollLimited(true);
     }
  };

  return (
    <>
    { (!total && isFetchedAfterMount) ? 
      <NoResultsPage />
      : (
      <>
      {contactModalRendered && (
        <ContactModal 
        contact={contactInfo}
        contactPersonalData={personalData}
        handleCloseModal={handleCloseModal} />
      )}
      <div className={tableContainer}>
        {scrollLimited && (
         <PopUpUpgrade setScrollLimited={setScrollLimited} />
        )}
        <div className={tableHeader}>
          <div className={sortBtn}>
            <div>Full name</div>
            <SortButton />
          </div>
          <div className={sortBtn}>
            <div>job title</div>
            <SortButton />
          </div>
          <div className={sortBtn}>
            <div>industry</div>
            <SortButton />
          </div>
          <div className={sortBtn}>
            <div>Location</div>
            <SortButton />
          </div>
          { isLoading &&  
          <div className={loaderStyle}>
              <Loader size='small'/>
          </div>
          }
        </div>
        <div className={tableStyle} onScroll={handleScrollTable}>
          { contacts?.slice(0, contacts.length - 1).map((el) => (
         <TableRow
           key={el.id+el.country.toString()}
           el={el}
           id={idForGetNameBtn}
           personalData={personalData}
           contactNameRendered={contactNameRendered}
           handleClickGetContact={handleClickGetContact}
           handleGetContactName={handleGetContactName}
           setContactModalRendered={setContactModalRendered}
         />
          ))}
        </div>
        <Pagination
          rowsPerPageOptions={[perPage]}
          page={page}
          setPage={scrollLimited ? () => page : setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          total={total}
          sx={sxPaginationStyle}
        />
      </div>
    </>
     ) }
    </>

  );
};

export default AdminList;
