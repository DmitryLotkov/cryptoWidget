import styled from 'styled-components'

export const StyledInputAndSelect = styled.div`
  display: flex;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #E3EBEF;
  &:focus {
    border-color: #C1D9E5;
  }
`;

export const StyledInput = styled.input`
  box-sizing: border-box;
  padding-left: 16px;
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
`;

export const StyledSelect = styled.select`
  cursor: pointer;
  padding-left: 34px;
  width: 150px;
  color: #282828;
  font-family: Roboto sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px; /* 143.75% */
  border: none;
  background: #F6F7F8;
  &:focus {
    outline: none;
    border-color: #F6F7F8;
  }
  @media (max-width: 1200px) {
    width: 100%;
  }
`;