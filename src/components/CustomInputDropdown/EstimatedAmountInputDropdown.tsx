import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { CurrencyItem } from '../../services/api';
import { StyledInput, StyledInputAndSelect, StyledSelect } from './styles';

interface CustomInputDropdownProps {
  currencyList: CurrencyItem[];
  estimatedAmount: string;
  getCurrent: (current: string) => void;
}

export const EstimatedAmountInputDropdown: FC<CustomInputDropdownProps> = React.memo(
  ({ currencyList, estimatedAmount, getCurrent }: CustomInputDropdownProps) => {
    const [rightInputValue, setRightInputValue] = useState<string>(estimatedAmount);
    const [inputFromUser, setInputFromUser] = useState<boolean>(false);

    useEffect(() => {
      if (!inputFromUser) {
        setRightInputValue(estimatedAmount);
      }
    }, [estimatedAmount, inputFromUser]);

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