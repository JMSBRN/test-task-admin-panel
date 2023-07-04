import { setClearedFilters, setFilters } from '../../../features/filters/filterSlice';
import Image from 'next/image';
import React from 'react';
import { SearchFormData } from '../../interfaces';
import noResultsImage from '../../../public/images/No Results@3x.png';
import setFormDataToLocal from '../../../utils/localUtils';
import styles from './noResultsPage.module.scss';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { useRefresh } from 'react-admin';

const NoResultsPage = () => {
  const { mainContainer, messageContainer, mainTitle, secondeTitle } = styles;
  const refresh = useRefresh();
  const dispatch = useAppDispatch();

  const handleClearFilters = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const clearedFilters = {
      job_title: '',
      country: { id: '', name: '' },
      industry: { id: '', name: '' },
    } as SearchFormData;

    dispatch(setClearedFilters(false));
    dispatch(setFilters(clearedFilters));
    setFormDataToLocal(clearedFilters);
    refresh();
  };

  return (
    <div className={mainContainer}>
      <div className={messageContainer}>
        <Image
          width={158}
          src={noResultsImage}
          alt="task paper with magnifying glass"
        />
        <div className={mainTitle}>No results found</div>
        <div className={secondeTitle}>
          We couldn’t find what you searched for. Please try again.
        </div>
        <button onClick={handleClearFilters}>Clear filters</button>
      </div>
    </div>
  );
};

export default NoResultsPage;
