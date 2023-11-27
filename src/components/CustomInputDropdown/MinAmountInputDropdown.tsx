import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { CurrencyItem } from '../../services/api'
import { StyledInput, StyledInputAndSelect, StyledSelect } from './styles'

interface CustomInputDropdownProps {
  currencyList: CurrencyItem[];
  minAmount: string;
  getCurrent: (current: string) => void;
}


export const MinAmountInputDropdown: FC<CustomInputDropdownProps> = React.memo(
  ({ currencyList, minAmount, getCurrent }: CustomInputDropdownProps) => {
    const [rightInputValue, setRightInputValue] = useState<string>(minAmount);
    const [inputFromUser, setInputFromUser] = useState<boolean>(false);

    useEffect(() => {
      if (!inputFromUser) {
        setRightInputValue(minAmount);
      }
    }, [minAmount, inputFromUser]);

    const handleDropDown = (event: ChangeEvent<HTMLSelectElement>) => {
      setInputFromUser(false);
      getCurrent(event.target.value);
    };

    const handleRightInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRightInputValue(e.target.value);
      setInputFromUser(true);
    };

    return (
      <StyledInputAndSelect>
        <StyledInput type='number' value={rightInputValue} onChange={handleRightInput} />
        <StyledSelect onChange={handleDropDown}>
          {currencyList?.map((item, index) => (
            <option value={item.ticker} key={index}>
              {item.ticker.toUpperCase()}
            </option>
          ))}
        </StyledSelect>
      </StyledInputAndSelect>
    );
  }
);
