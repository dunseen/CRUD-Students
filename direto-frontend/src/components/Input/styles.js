import styled, { css } from "styled-components";
import Tooltip from "../Tooltip";

export const Container = styled.div`
  background: #0000A6 ;
  border-radius: 10px;
  border: 2px solid #0000A6;
  padding: 12px;
  width: 100%;
  color: #f4ede8;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #f4ede8;
      border-color: #f4ede8;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #f4ede8;
    `}



  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #EBEDF0;
    }
  }
  svg {
    margin-right: 16px;
    color: #f4ede8;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #f4ede8;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
