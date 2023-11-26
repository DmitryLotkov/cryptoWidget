import React, { useCallback, useEffect, useRef, useState } from 'react'
import './App.scss'
import { CustomInputDropdown } from './components/CustomInputDropdown/CustomInputDropdown'
import swapImg from './assets/icons/swap.svg'
import { useAppDispatch, useAppSelector } from './store/store'
import { CurrencyItem, MinExchangeAmountStateType } from './services/api'
import {
  getEstimatedExchangeAmountTC,
  getListOfAvailableCurrenciesTC,
  getMinimalExchangeAmountTC,
} from './store/currencyData/currencyReducer'
import { NullableType } from './store/app/app-reducer'
import { LinearProgress } from '@mui/material'
import {
  StyledButton,
  StyledButtonAndInput,
  StyledDropDowns,
  StyledErrorText,
  StyledInput,
  StyledLinearProgressWrapper,
  StyledParagraph,
  StyledSubTitle,
  StyledTitle,
  StyledTitles,
  StyledWrapper,
} from './appStyles'

function App() {
  const dispatch = useAppDispatch()
  const currencyList = useAppSelector<CurrencyItem[]>(state => state.currenciesData.currencyList)
  const minAmount = useAppSelector<number>(state => state.currenciesData.minAmount)
  const estimatedAmount = useAppSelector<number | string>(state => state.currenciesData.estimatedAmount)
  const appError = useAppSelector<NullableType<string>>(state => state.app.error)
  const isLoading = useAppSelector<boolean>(state => state.app.isLoading)

  const [firstTicker, setFirstTicker] = useState('')
  const [secondTicker, setSecondTicker] = useState('')

  const prevFirstTicker = useRef<string | null>(null)
  const prevSecondTicker = useRef<string | null>(null)

  useEffect(() => {
    if (!currencyList) {
      dispatch(getListOfAvailableCurrenciesTC())
    }

    if (
      firstTicker &&
      secondTicker &&
      (firstTicker !== prevFirstTicker.current || secondTicker !== prevSecondTicker.current)
    ) {
      dispatch(getMinimalExchangeAmountTC({
        firstTicker,
        secondTicker,
      })).unwrap().then((data: MinExchangeAmountStateType | { error: string }) => {
        const resp = data as MinExchangeAmountStateType
        dispatch(getEstimatedExchangeAmountTC({ minAmount: resp.minAmount, firstTicker, secondTicker }))
      })

      prevFirstTicker.current = firstTicker
      prevSecondTicker.current = secondTicker

    }
  }, [dispatch, minAmount, firstTicker, secondTicker, currencyList])


  const getLeftTicker = useCallback((value: string) => {
    setFirstTicker(value)
  }, [])

  const getRightTicker = useCallback((value: string) => {
    setSecondTicker(value)
  }, [])

  return (
    <>
      {isLoading &&
        <StyledLinearProgressWrapper>
          <LinearProgress sx={{ background: '#11B3FE' }} />
        </StyledLinearProgressWrapper>
      }
      <StyledWrapper>
        <StyledTitles>
          <StyledTitle>Crypto Exchange</StyledTitle>
          <StyledSubTitle>Exchange fast and easy</StyledSubTitle>
        </StyledTitles>

        <StyledDropDowns>
          <CustomInputDropdown currencyList={currencyList} minAmount={minAmount} inputType={'left'}
                               getCurrent={getLeftTicker} />
          <img src={swapImg} alt='swapImg' width={24} />
          <CustomInputDropdown currencyList={currencyList} estimatedAmount={estimatedAmount} inputType={'right'}
                               getCurrent={getRightTicker} />
          <StyledErrorText>{appError}</StyledErrorText>
        </StyledDropDowns>

        <StyledParagraph>Your Ethereum address</StyledParagraph>
        <StyledButtonAndInput>
          <StyledInput />
          <StyledButton>EXCHANGE</StyledButton>
        </StyledButtonAndInput>
      </StyledWrapper></>
  )
}

export default App
