import Image from 'next/image';
import React from 'react';
import { SearchFormData } from '../../search-form/interfaces';
import noResultsImage from '../../../public/images/No Results@3x.png';
import setFormDataToLocal from '../../../utils/localUtils';
import styles from './noResultsPage.module.scss';
import { useRefresh } from 'react-admin';
import { useRouter } from 'next/router';

const NoResultsPage = () => {
  const { mainContainer, messageContainer, mainTitle, secondeTitle } = styles;
  const refresh = useRefresh();
  const { push } = useRouter();

  const handleClearFilters = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const clearedFilters = { job_title: '', country: '', industry: '' } as SearchFormData;
    
    push('/admin');
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
        <button onClick={handleClearFilters} >Clear filters</button>
      </div>
    </div>
  );
};

export default NoResultsPage;
