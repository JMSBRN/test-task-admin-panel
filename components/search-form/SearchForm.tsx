import Image from 'next/image';
import InputWithSelectField from '../input-with-select-field/InputWithSelectField';
import React from 'react';
import { SearchFormData } from '../interfaces';
import industryIcon from '../../public/svgs/Icon_Industry.svg';
import jobTitleIcon from '../../public/svgs/Icon_JobTitle.svg';
import locationIcon from '../../public/svgs/Icon_Location.svg';
import searchIcon from '../../public/svgs/Icon_Search.svg';
import { setClearedFilters } from '../../features/filters/filterSlice';
import setFormDataToLocal from '../../utils/localUtils';
import styles from './searchForm.module.scss';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useRefresh } from 'react-admin';

interface SearchFormProps {
  formData: SearchFormData;
  setFormData: React.Dispatch<React.SetStateAction<SearchFormData>>;
}
const SearchForm = ({ formData, setFormData }: SearchFormProps) => {
  const {
    searchForm,
    jobTitleStyle,
    lineFirst,
    lineSecond,
    titleIconStyle,
    searchIconStyle,
    inputPlaceHolder
  } = styles;
  const refresh = useRefresh();
  const dispatch = useAppDispatch();
  
   const handleChange = (e: React.ChangeEvent< HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        const newFormData = { ...formData, [e.target.name]: e.target.value };
        
        dispatch(setClearedFilters(!!e.target.value));
        setFormData(newFormData);
        setFormDataToLocal(newFormData);
        refresh();
      };
        
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setFormDataToLocal(formData);
          refresh();
      };
   
  return (  
    <form className={searchForm} onSubmit={handleSubmit} >
      <label className={jobTitleStyle}>
        <Image className={titleIconStyle} width={16} src={jobTitleIcon} alt="bag" />
        {
          !formData.job_title &&
          <><Image
            className={searchIconStyle}
            width={16}
            height={16}
            src={searchIcon}
            alt="search icon in input" />
            <span className={inputPlaceHolder}>
            Search by job title
              </span>
              </>
        }
        <span>job title</span>
        <input 
        name='job_title'
        value={formData.job_title || '' }
        type="text"
        onChange={handleChange}
        />
      </label>
        <span className={lineFirst}></span>
      <InputWithSelectField
        labelIcon={locationIcon}
        fieldName='country'
        labelText='Location'
        textPlaceHolder="Choose location"
        formData={formData}
        setFormData={setFormData}
      />
        <span className={lineSecond}></span>
      <InputWithSelectField
        labelIcon={industryIcon}
        fieldName='industry'
        labelText='Industry'
        textPlaceHolder="Choose industry"
        formData={formData}
        setFormData={setFormData}
      />
    </form>
  );
};

export default SearchForm;