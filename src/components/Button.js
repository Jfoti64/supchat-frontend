// src/components/Button.js
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) => (props.$primary ? 'blue' : 'gray')};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$primary ? 'darkblue' : 'darkgray')};
  }
`;

export default Button;
