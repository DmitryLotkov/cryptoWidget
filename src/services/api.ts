import axios from 'axios'

export const instance = axios.create({
    baseURL: `https://api.changenow.io/v1`,
})
const api_key = "c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd"
//types
export type CurrencyItem = {
    ticker: string;
    name: string;
    image: string;
    hasExternalId: boolean;
    isFiat: boolean;
    featured: boolean;
    isStable: boolean;
    supportsFixedRate: boolean;
};

export type EstimatedExchangeAmount = {
    estimatedAmount: number;
    transactionSpeedForecast: string,
    warningMessage: null | string
}

export type MinExchangeAmount = {
    minAmount: number
}

//api
export const cryptoMainApi = {
    getListOfAvailableCurrencies(){
        return instance.get<CurrencyItem[]>(`/currencies?active=true&fixedRate=true`);
    },
    getMinimalExchangeAmount(){
        return instance.get<MinExchangeAmount>(`/currencies-to/min-amount/:from_to?api_key=${api_key}`);
    },
    getEstimatedExchangeAmount(){
        return instance.get<EstimatedExchangeAmount>(`/exchange-amount/:send_amount/:from_to/?api_key=${api_key}`);
    }
}