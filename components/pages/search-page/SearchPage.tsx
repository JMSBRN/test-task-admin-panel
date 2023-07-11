import React, { useEffect, useState } from 'react';
import {
  selectFilter,
  setClearedFilters,
} from '../../../features/filters/filterSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import AdminList from '../../../admin/amin-list/AdminList';
import KmButton from '../../km-button/KmButton';
import Link from 'next/link';
import SearchForm from '../../search-form/SearchForm';
import { SearchFormData } from '../../interfaces';
import setFormDataToLocal from '../../../utils/localUtils';
import styles from './searchPage.module.scss';
import { useRefresh } from 'react-admin';

interface SearchPageProps {
  table?: React.ReactElement;
  total?: number;
}
const SearchPage = ({ table, total }: SearchPageProps) => {
  const {
    searchPageContainer,
    topContainer,
    leftSideContainer,
    logo,
    totalStyle,
    elipse2M,
    formTitle,
    searchFormContainer,
    centerContiner,
    kmButtonContainer,
    resetFilters,
    countFilters,
    countFiltersHidden,
    resetFiltersHidden,
  } = styles;
  const refresh = useRefresh();
  const { clearedFilters, filters } = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();
  const [activeFilters, setActiveFilters] = useState<number>(0);

  const initFormDataFromLocal: SearchFormData = JSON.parse(
    window.localStorage.getItem('formData') || '{}'
  );
  const [formData, setFormData] = useState<SearchFormData>(
    initFormDataFromLocal
  );

  interface ForCheckSaerchFormData extends SearchFormData {
     [key: string]: any;
  }
   const checActiveFilters = (obj: ForCheckSaerchFormData) => {
    let result = 0;
// create an array of properties to check
const properties = ['job_title', 'country', 'industry'];

// loop through the object's own properties
for (const property in obj) {
if (obj.hasOwnProperty(property)) {
// check if the property is in the array
if (properties.includes(property)) {
// increment the result by one if the value is truthy
result += obj[property] ? 1 : 0;
}
}
}
return result;
   };

  useEffect(() => {
    setFormData(filters);
  }, [filters]);
  useEffect(() => {
    const result = checActiveFilters(formData);

     console.log(result);

    setActiveFilters(result);
    //dispatch(setClearedFilters(true));
  },[activeFilters, dispatch, formData]);

  const setCountFiltersHiddenClass = (condition: boolean) => {
    if (condition) {
      return countFiltersHidden;
    } else {
      return countFilters;
    }
  };
  const setResetFiltersHiddenClass = (condition: boolean) => {
    if (condition) {
      return resetFiltersHidden;
    } else {
      return resetFilters;
    }
  };

  const handleClearFilters = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const currentClearedFilters = {
      job_title: '',
      country: { id: '', name: '' },
      industry: { id: '', name: '' },
    } as SearchFormData;

    setFormData(currentClearedFilters);
    setFormDataToLocal(currentClearedFilters);
    dispatch(setClearedFilters(false));
    refresh();
  };

  return (
    <div className={searchPageContainer}>
      <div className={topContainer}>
        <div className={totalStyle}>Total</div>
        <div className={elipse2M}>{total}</div>
        <div className={kmButtonContainer}>
          <KmButton />
        </div>
      </div>
      <div className={leftSideContainer}>
        <div className={logo}>Logo</div>
        <div className={formTitle}>
          Filters
          <div
            className={setCountFiltersHiddenClass(
              clearedFilters
            )}
          >
            {activeFilters}
          </div>
        </div>
        <div
          className={setResetFiltersHiddenClass(
            clearedFilters
          )}
        >
          <Link href="#" onClick={handleClearFilters}>
            Clear filter
          </Link>
        </div>
        <div className={searchFormContainer}>
          <SearchForm formData={formData} setFormData={setFormData} />
        </div>
      </div>
      <div className={centerContiner}>{ clearedFilters ? table : <AdminList /> }</div>
    </div>
  );
};

export default SearchPage;
