import styled, { css } from "styled-components";

export const IntroButtonStyles = styled.button`
  background: var(--accent-color) !important;
  color: #ffffff !important;
  font-weight: bold;
  padding: 10px 24px;
  width: 377px;
  height: 56px;
  text-transform: capitalize;
  font-size: 16px;
  margin: 40px 0;
  border: none;
  outline: none;
  cursor: pointer;

  img {
    display: inline;
    vertical-align: text-bottom;
    margin-left: 5px;
  }

  @media screen and (max-width: 500px) {
    width: 167px;
    height: 53px;
    left: 87.5px;
    background: #00bb7c;
    border-radius: 3px;
    margin-bottom: 197.54px !important;
    margin-top: 0px;

    img {
      display: block;
      margin-left: 16px;
    }
  }
`;
