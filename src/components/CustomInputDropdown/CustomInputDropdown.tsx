import React, { ChangeEvent, FC } from 'react'
import { CurrencyItem } from '../../services/api'
import { StyledInput, StyledInputAndSelect, StyledSelect } from './styles'

interface CustomInputDropdownProps {
    currencyList: CurrencyItem[];
    inputType: "left" | "right"
    minAmount?: number;
    estimatedAmount?: number | string ;
    getCurrent: (current: string) => void;
}


export const CustomInputDropdown: FC<CustomInputDropdownProps> = React.memo((props: CustomInputDropdownProps) => {

    const handleLeftDropDown = (event: ChangeEvent<HTMLSelectElement>) => {
      props.getCurrent(event.target.value);
    }

  const handleRightDropDown = (event: ChangeEvent<HTMLSelectElement>) => {
    props.getCurrent(event.target.value);
  }

    return (
        <StyledInputAndSelect>
          { props.inputType === "left" &&
            <>
              <StyledInput type='text' readOnly={true} value={props.minAmount || 0} />
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
              <StyledInput type='text' readOnly={true} value={props.estimatedAmount || 0} />
              <StyledSelect onChange={handleRightDropDown}>
                {props.currencyList &&
                  props.currencyList.map((item, index) => (
                    <option
                      style={{ backgroundImage: `url(${item.image})` }}
                      key={index}
                    >
                      {item.ticker.toUpperCase()}
                    </option>
                  ))}
              </StyledSelect>
            </>
          }
        </StyledInputAndSelect>
    );
});

CustomInputDropdown.displayName = 'CustomInputDropdown';