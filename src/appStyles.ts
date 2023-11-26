import styled from 'styled-components';


export const StyledWrapper = styled.div`
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 0 auto;
  flex-direction: column;
  width: 960px;
  position: relative;

  @media (max-width: 1200px) {
    padding-top: 64px;
    padding-left: 16px;
    padding-right: 16px;
    width: 100%;
    height: 100%;
  }
`

export const StyledTitle = styled.p`
  color: #282828;
  font-family: Roboto, serif;
  font-size: 50px;
  font-style: normal;
  font-weight: 300;
  line-height: 120%;
  margin: 0;
`

export const StyledSubTitle = styled.p`
  color: #282828;
  font-family: Roboto, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 20px */
  margin: 0;
`

export const StyledTitles = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  align-items: start;
  margin-bottom: 60px;
`

export const StyledDropDowns = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  column-gap: 29px;
  position: relative;
  @media (max-width: 1200px) {
    flex-direction: column;
    row-gap: 16px;
    img {
      transform: rotate(90deg);
      margin-left: auto;
      display: block;
    }
  }
`
export const StyledLinearProgressWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
`
export const StyledParagraph = styled.div`
  padding-top: 32px;
  color: #282828;
  font-family: Roboto, serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px; /* 143.75% */
  margin: 0 0 8px;
`

export const StyledInput = styled.input`
  box-sizing: border-box;
  border: 1px solid #E3EBEF;
  padding-left: 16px;
  width: 723px;
  color: #282828;
  font-family: Roboto sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  height: 50px;
  line-height: 23px; /* 143.75% */
  border-radius: 5px;
  background: #F6F7F8;
  @media (max-width: 1200px) {
    width: 100%;
  }
`
export const StyledButton = styled.button`
  width: 205px;
  height: 50px;
  background-color: #11B3FE;
  padding: 15px 60px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  @media (max-width: 1200px) {
    width: 100%;
  }
`
export const StyledButtonAndInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1200px) {
    flex-direction: column;
    row-gap: 16px;
  }
`
export const StyledErrorText = styled.p`
  position: absolute;
  top: 40px;
  color: red;
`