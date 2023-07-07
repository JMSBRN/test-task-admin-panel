import React, { useCallback, useEffect, useState } from 'react';
import { Country } from '../interfaces';
import Image from 'next/image';
import { SearchFormDataForInputSelect } from '../interfaces';
import { getDecryptedDataFromCookie } from '../../utils/secureCookiesUtils';
import { getFetchDataForSelectList } from '../../utils/apiUtils';
import polygonIconDown from '../../public/svgs/Polygon 2.svg';
import polygonIconUp from '../../public/svgs/Polygon 1.svg';
import setFormDataToLocal from '../../utils/localUtils';
import styles from './inputWithSelectField.module.scss';
import { useRefresh } from 'react-admin';

interface InputWithSelectFieldProps {
  labelText: string;
  labelIcon: string;
  fieldName: string;
  textPlaceHolder:string;
  formData: SearchFormDataForInputSelect;
  setFormData: React.Dispatch<React.SetStateAction<SearchFormDataForInputSelect>>;
}

const InputWithSelectField = ({
  labelText,
  labelIcon,
  fieldName,
  textPlaceHolder,
  formData,
  setFormData,
}: InputWithSelectFieldProps) => {
  const { InputStyle, inputListContainer, inputList, listItem } = styles;
  const [dataForSelectList, setDataForSelectList] = useState<Country[]>([]);
  const [selectListRendered, setSelectListRendered] = useState<boolean>(false);
  const [inputValueForFilter, setInputValueForFilter] = useState<string>('');
  const [sortChanged, setSortChanged] = useState<boolean>(false);
  const token = getDecryptedDataFromCookie('token');
  const refresh = useRefresh();

  const fetchSelectList = useCallback( async () => {
    if(token) {
      const result = await getFetchDataForSelectList(fieldName, token!);
   
      result &&  setDataForSelectList(result);
    }
  }, [fieldName, token]);

  useEffect(() => {
    setFormDataToLocal(formData);
  }, [formData]);

  useEffect(() => {
  fetchSelectList();
  }, [fetchSelectList]);
  
  const handleChangeSelectValue = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;

    if (value && value.match('^[a-zA-Z]+$')) {
      setSelectListRendered(true);
    } else {
      setSelectListRendered(false);
    }
    setInputValueForFilter(value.toLowerCase());
    setFormData({ ...formData, [fieldName]: { name: value } });
    refresh();
  };

  const handleGetFilteredValue = (
    e: React.MouseEvent<HTMLDivElement>,
    fieldName: string
  ) => {
    const { id, name, iso3 } = JSON.parse(e.currentTarget.id);
    
    setFormData({ ...formData, [fieldName]: { id, name, iso3 } });
  };

  const handleSetSelectList = async () => {
   setSelectListRendered(!selectListRendered);
   setSortChanged(!sortChanged);
   await fetchSelectList();
  };
  
  const setItemFieldForFilter = (item: Country, inputValue: string) => {
    const lowerInput = inputValue.toLowerCase();

    if (item.iso3 && item.iso3.toLowerCase().includes(lowerInput)) {
    return item;
    }

    if (item.name.toLowerCase().includes(lowerInput)) {
    return item;
    }
    };

  return (
    <label className={InputStyle}>
      <Image width={16} src={labelIcon} alt="drop" />
      <span>{labelText}</span>
      <button onClick={handleSetSelectList}>
        {sortChanged ? (
          <Image width={6} alt="lolygon" src={polygonIconUp} />
        ) : (
          <Image width={6} alt="lolygon" src={polygonIconDown} />
        )}
      </button>
      <input 
      name={fieldName}
      value={ formData[fieldName].iso3 || formData[fieldName].name }
      type="text"
      onChange={handleChangeSelectValue}
      placeholder={textPlaceHolder}
       />
      {selectListRendered && (
        <div className={inputListContainer}>
          <div className={inputList}>
            {dataForSelectList
              ?.filter((item) => {
                return setItemFieldForFilter(item, inputValueForFilter);
              })
              .map((el) => (
                <div
                  className={listItem}
                  key={el.id}
                  id={JSON.stringify({ id: el.id, name: el.name, iso3: el.iso3 || '' })}
                  onClick={(e) => handleGetFilteredValue(e, fieldName)}
                >
                  { el.iso3 ||  el.name }
                </div>
              ))}
          </div>
        </div>
      )}
    </label>
  );
};

export default InputWithSelectField;
