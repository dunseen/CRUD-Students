import styled from 'styled-components';

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
        width: 70px;
        height: 40px;
        border: 1px solid #fff;
        border-radius: 8px;
        background: #e02041;

        color: #fff;
        font-weight: 600;
        text-decoration: none;
        font-size: 16px;
        
        transition: filter 0.2s;
        cursor: pointer;

        &:hover {
            filter: brightness(90%);
        }
    }
`;