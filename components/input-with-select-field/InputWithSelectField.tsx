import React, { useEffect, useState } from 'react';
import { ContactForInpuSelect } from '../interfaces';
import Image from 'next/image';
import { SearchFormDataForInputSelect } from '../interfaces';
import polygonIconDown from '../../public/svgs/Polygon 2.svg';
import polygonIconUp from '../../public/svgs/Polygon 1.svg';
import setFormDataToLocal from '../../utils/localUtils';
import styles from './inputWithSelectField.module.scss';

interface InputWithSelectFieldProps {
  labelText: string;
  labelIcon: string;
  fieldName: string;
  textPlaceHolder:string;
  data: ContactForInpuSelect[];
  formData: SearchFormDataForInputSelect;
  setFormData: React.Dispatch<React.SetStateAction<SearchFormDataForInputSelect>>;
}

const InputWithSelectField = ({
  labelText,
  labelIcon,
  fieldName,
  textPlaceHolder,
  data,
  formData,
  setFormData,
}: InputWithSelectFieldProps) => {
  const { InputStyle, inputListContainer, inputList, listItem } = styles;
  const [selectListRendered, setSelectListRendered] = useState<boolean>(false);
  const [inputValueForFilter, setInputValueForFilter] = useState<string>('');
  const [sortChanged, setSortChanged] = useState<boolean>(false);

  useEffect(() => {
    setFormDataToLocal(formData);
  }, [formData]);
  
  const handleChangeSelectValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    
    setFormData({ ...formData, [fieldName]: value });
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
    const id = e.currentTarget.id;

    setFormData({ ...formData, [fieldName]: id });
  };

  const handleSetSelectList = () => {
   setSelectListRendered(!selectListRendered);
   setSortChanged(!sortChanged);
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
      value={formData[fieldName]}
      type="text"
      onChange={handleChangeSelectValue}
      placeholder={textPlaceHolder}
       />
      {selectListRendered && (
        <div className={inputListContainer}>
          <div className={inputList}>
            {data
              ?.filter((item) => {
                if (
                  item[fieldName].toLowerCase().includes(inputValueForFilter)
                ) {
                  return item;
                }
              })
              .map((el) => (
                <div
                  className={listItem}
                  key={el.id}
                  id={el[fieldName]}
                  onClick={(e) => handleGetFilteredValue(e, fieldName)}
                >
                  {el[fieldName]}
                </div>
              ))}
          </div>
        </div>
      )}
    </label>
  );
};

export default InputWithSelectField;
