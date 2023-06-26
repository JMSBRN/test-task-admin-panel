import React, { useState } from 'react';
import SearchForm from '../search-form/SearchForm';
import { SearchFormData } from '../search-form/interfaces';
import WelcomePage from '../welcom-page/WelcomePage';
import styles from './searchPage.module.scss';

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
    resetFiltersHidden
  } = styles;

  const initFfomLocalFormData: SearchFormData =
  JSON.parse(window.localStorage.getItem('formData') || '{}');
  const [formData, setFormData] = useState<SearchFormData>(initFfomLocalFormData);
  const setCountFiltersHiddenClass = (condition: boolean) => {
    if(condition) {
      return countFiltersHidden;
    } else {
      return countFilters;
    }
  };
  const setResetFiltersHiddenClass = (condition: boolean) => {
    if(condition) {
      return resetFiltersHidden;
    } else {
      return resetFilters;
    }
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
          <div className={setCountFiltersHiddenClass(!formData.job_title)}>1</div>
          </div>
        <div className={setResetFiltersHiddenClass(!formData.job_title)}>Clear filter</div>
        <div className={searchFormContainer}>
          <SearchForm formData={formData} setFormData={setFormData} />
        </div>
      </div>
      <div className={centerContiner}>
        { !table ? (
         <WelcomePage />
        ) : table }
      </div>
    </div>
  );
};

export default SearchPage;
