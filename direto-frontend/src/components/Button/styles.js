import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.button`
  background: #c53030;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #f4ede8;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, "#c53030")};
  }

  .loading {
    margin-left: 44%;
    margin-top: 8px;
  }
`;
