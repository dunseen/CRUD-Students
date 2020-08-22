import styled from 'styled-components';
import { shade } from 'polished'

export const Header = styled.header`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    justify-content: space-between;
    
    width: 100%;
    
    h1 {
        flex: 1;
        margin-top: 20px 0;
        text-align: center;
    }

    button {
        background: #343a40;
        border:0;
        height: 40px;
        align-self: center;

        &:hover {
            background: ${shade(0.2, "#343a40")};
        }

        &:focus {
            outline: 0;
        }
    }
`;