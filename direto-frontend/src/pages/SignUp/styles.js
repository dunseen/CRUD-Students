import styled from 'styled-components'
import { shade } from "polished";

export const Container = styled.div`
  margin: 80px auto 0;
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 25%;
  }
`

export const Content = styled.div`
  width: 100%;
  background: #00008B;
  margin-top: 30px;
  border-radius: 8px;
  padding: 30px;

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    font-size: 16px;
    color: #f4ede8;
    font-weight: bold;
    margin-bottom: 12px;
    margin-top: 8px;
  }

  a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, "#f4ede8")};
    }

    svg {
      margin-right: 16px;
    }
  }

`
