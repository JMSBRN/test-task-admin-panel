import React, { useCallback, useEffect, useState } from 'react';
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
  const { filters } = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();
  const [activeFilters, setActiveFilters] = useState<number>(0);

  const initFormDataFromLocal: SearchFormData = JSON.parse(
    window.localStorage.getItem('formData') || '{}'
  );
  const [formData, setFormData] = useState<SearchFormData>(
    initFormDataFromLocal
  );

   const checActiveFilters = useCallback((formData: SearchFormData) => {
    let count = 0;

    if (formData.job_title.trim() !== '') {
      count++;
    }
  
    if (formData.country.name.trim() !== '') {
      count++;
    }

    if (formData.industry.name.trim() !== '') {
      count++;
    }
  
    return count;
   },[]);

  useEffect(() => {
    setFormData(filters);
  }, [filters]);
  useEffect(() => {
    const result = checActiveFilters(formData);

    setActiveFilters(result);

  },[activeFilters, checActiveFilters, formData]);

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
              !activeFilters
            )}
          >
            {activeFilters}
          </div>
        </div>
        <div
          className={setResetFiltersHiddenClass(
            !activeFilters
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
      <div className={centerContiner}>{ !activeFilters ? table : <AdminList /> }</div>
    </div>
  );
};

export default SearchPage;
