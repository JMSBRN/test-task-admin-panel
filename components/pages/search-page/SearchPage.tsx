import React, { useState } from 'react';
import Link from 'next/link';
import SearchForm from '../../search-form/SearchForm';
import { SearchFormData } from '../../search-form/interfaces';
import WelcomePage from '../welcom-page/WelcomePage';
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
    elipseKM,
    resetFilters,
    countFilters,
    countFiltersHidden,
    resetFiltersHidden,
  } = styles;
  const refresh = useRefresh();

  const initFfomLocalFormData: SearchFormData = JSON.parse(
    window.localStorage.getItem('formData') || '{}');
  const [formData, setFormData] = useState<SearchFormData>(
    initFfomLocalFormData
  );
  const activeFiltersCounter: number = Object.values(formData)
  .filter((e) => !!e === true)
    .length;
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
  
  const handleClearFilters = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const clearedFilters = { job_title: '', country: '', industry: '' } as SearchFormData;

    setFormData(clearedFilters);
    setFormDataToLocal(clearedFilters);
    refresh();
  };
  
  return (
    <div className={searchPageContainer}>
      <div className={topContainer}>
        <div className={totalStyle}>Total</div>
        <div className={elipse2M}>{total}</div>
        <div className={elipseKM}>KM</div>
      </div>
      <div className={leftSideContainer}>
        <div className={logo}>Logo</div>
        <div className={formTitle}>
          Filters
          <div className={setCountFiltersHiddenClass(!activeFiltersCounter)}>{
            activeFiltersCounter
          }</div>
        </div>
        <div className={setResetFiltersHiddenClass(!activeFiltersCounter)}>
          <Link href="#" onClick={handleClearFilters} >Clear filters</Link>
        </div>
        <div className={searchFormContainer}>
          <SearchForm formData={formData} setFormData={setFormData} />
        </div>
      </div>
      <div className={centerContiner}>{!table ? <WelcomePage /> : table}</div>
    </div>
  );
};

export default SearchPage;
