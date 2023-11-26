import React, { useCallback, useEffect, useState } from 'react'
import './App.scss'
import { CustomInputDropdown } from './components/CustomInputDropdown/CustomInputDropdown'
import swapImg from './assets/icons/swap.svg'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from './store/store'
import { CurrencyItem } from './services/api'
import {
  getEstimatedExchangeAmountTC,
  getListOfAvailableCurrenciesTC,
  getMinimalExchangeAmountTC,
} from './store/currencyData/currencyReducer'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 960px;
`

const Title = styled.p`
  color: #282828;
  font-family: Roboto, serif;
  font-size: 50px;
  font-style: normal;
  font-weight: 300;
  line-height: 120%;
  margin: 0;
`

const SubTitle = styled.p`
  color: #282828;
  font-family: Roboto, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 20px */
  margin: 0;
`

const Titles = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  align-items: start;
`

const DropDowns = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 29px;
`

function App() {
  const dispatch = useAppDispatch()
  const currencyList = useAppSelector<CurrencyItem[]>(state => state.currenciesData.currencyList);
  const minAmount = useAppSelector<number>(state => state.currenciesData.minAmount);
  const estimatedAmount = useAppSelector<number>(state => state.currenciesData.estimatedAmount);
  const [firstTicker, setFirstTicker] = useState("");
  const [secondTicker, setSecondTicker] = useState("");

  useEffect(() => {
    dispatch(getListOfAvailableCurrenciesTC());
    if(firstTicker && secondTicker ){
      dispatch(getMinimalExchangeAmountTC({ firstTicker, secondTicker }));

      if(minAmount){
        dispatch(getEstimatedExchangeAmountTC({minAmount, firstTicker, secondTicker}))
      }
    }

  }, [dispatch, firstTicker, minAmount, secondTicker])


  const  getLeftTicker = useCallback((value: string) => {
    setFirstTicker(value);
  }, []);

  const  getRightTicker = useCallback((value: string) => {
    setSecondTicker(value)
  }, []);

  return (
    <Wrapper>
      <Titles>
        <Title>Crypto Exchange</Title>
        <SubTitle>Exchange fast and easy</SubTitle>
      </Titles>

      <DropDowns>
        <CustomInputDropdown currencyList={currencyList} minAmount={minAmount} inputType={'left'} getCurrent={getLeftTicker} />
        <img src={swapImg} alt='swapImg' />
        <CustomInputDropdown currencyList={currencyList} estimatedAmount={estimatedAmount} inputType={'right'} getCurrent={getRightTicker} />
      </DropDowns>

      <p>Your Ethereum address</p>
      <input />
      <button>Exchange</button>
    </Wrapper>
  )
}

export default App
