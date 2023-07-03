import React, { useEffect, useState } from 'react';
import { Country } from '../interfaces';
import Image from 'next/image';
import { SearchFormDataForInputSelect } from '../interfaces';
import { getDecryptedDataFromCookie } from '../../utils/secureCookiesUtils';
import { getFetchDataForSelectList } from '../../utils/apiUtils';
import polygonIconDown from '../../public/svgs/Polygon 2.svg';
import polygonIconUp from '../../public/svgs/Polygon 1.svg';
import setFormDataToLocal from '../../utils/localUtils';
import styles from './inputWithSelectField.module.scss';

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
  const [inputValue, setInputValue] = useState<string>('');
  const [selectListRendered, setSelectListRendered] = useState<boolean>(false);
  const [inputValueForFilter, setInputValueForFilter] = useState<string>('');
  const [sortChanged, setSortChanged] = useState<boolean>(false);
  const token = getDecryptedDataFromCookie('token');

  useEffect(() => {
    setFormDataToLocal(formData);
  }, [formData]);
  
  const handleChangeSelectValue = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
     
    if (value && value.match('^[a-zA-Z]+$')) {
      setSelectListRendered(true);
    } else {
      setSelectListRendered(false);
    }
    setInputValueForFilter(value.toLowerCase());
  };

  const handleGetFilteredValue = (
    e: React.MouseEvent<HTMLDivElement>,
    fieldName: string
  ) => {
    const { id, name } = JSON.parse(e.currentTarget.id);

    setInputValue(name);
    setFormData({ ...formData, [fieldName]: { id, name } });
  };

  const handleSetSelectList = async () => {
   setSelectListRendered(!selectListRendered);
   setSortChanged(!sortChanged);
   if(token) {
     const result = await getFetchDataForSelectList(fieldName, token!);
  
     result &&  setDataForSelectList(result);
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
      value={inputValue}
      type="text"
      onChange={handleChangeSelectValue}
      placeholder={textPlaceHolder}
       />
      {selectListRendered && (
        <div className={inputListContainer}>
          <div className={inputList}>
            {dataForSelectList
              ?.filter((item) => {
                if (
                  item.name.toLowerCase().includes(inputValueForFilter)
                ) {
                  return item;
                }
              })
              .map((el) => (
                <div
                  className={listItem}
                  key={el.id}
                  id={JSON.stringify({ id: el.id, name: el.name })}
                  onClick={(e) => handleGetFilteredValue(e, fieldName)}
                >
                  {el.name}
                </div>
              ))}
          </div>
        </div>
      )}
    </label>
  );
};

export default InputWithSelectField;
