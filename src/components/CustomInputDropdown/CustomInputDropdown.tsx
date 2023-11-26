import React, {ChangeEvent, FC, useState} from 'react';
import {useAppSelector} from '../../store/store';
import {CurrencyItem} from '../../services/api';
import styled from 'styled-components'
import DropdownList  from 'react-widgets/DropdownList'

interface CustomInputDropdownProps {
    currencyList: CurrencyItem[];
    inputType: "left" | "right"
    minAmount?: number;
    estimatedAmount?: number;
    getCurrent: (current: string) => void;
}

const InputAndSelect = styled.div`
  width: 440px;
  display: flex;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #E3EBEF;
  &:focus {
    border-color: #C1D9E5;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

const StyledInput = styled.input`
  width: 290px;
  color: #282828;
  font-family: Roboto sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px; /* 143.75% */
  border-radius: 5px;
  border: none;
  border-right: solid 1px #E3EBEF;
  background: #F6F7F8;
  &:focus {
    outline: none;
    border-color: #F6F7F8;
  }
`
const StyledSelect = styled.select`
  width: 150px;
  color: #282828;
  font-family: Roboto sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px; /* 143.75% */
  border: none;
  background: #F6F7F8;
`


export const CustomInputDropdown: FC<CustomInputDropdownProps> = React.memo((props: CustomInputDropdownProps) => {

    const handleLeftDropDown = (event: ChangeEvent<HTMLSelectElement>) => {
      props.getCurrent(event.target.value)
    }

  const handleRightDropDown = (event: ChangeEvent<HTMLSelectElement>) => {
    props.getCurrent(event.target.value)
  }

    //const handleInput = (event: ChangeEvent<HTMLInputElement>) => setCurrAmount(Number(event.target.value));

    return (
        <InputAndSelect>
          { props.inputType === "left" &&
            <>
              <StyledInput type='number' value={props.minAmount || 0} /*onChange={handleInput}*/ />
              <StyledSelect onChange={handleLeftDropDown}>
                {props.currencyList &&
                  props.currencyList.map((item, index) => (
                    <option key={index} value={item.ticker}>
                      {item.ticker.toUpperCase()}
                    </option>
                  ))}
              </StyledSelect>
            </>
          }

          {props.inputType === "right" &&
            <>
              <StyledInput type='number' value={props.estimatedAmount || 0} /*onChange={handleInput}*/ />
              <StyledSelect onChange={handleRightDropDown}>
                {props.currencyList &&
                  props.currencyList.map((item, index) => (
                    <option key={index} value={item.ticker}>
                      {item.ticker.toUpperCase()}
                    </option>
                  ))}
              </StyledSelect>
            </>
          }
        </InputAndSelect>
    );
});

CustomInputDropdown.displayName = 'CustomInputDropdown';