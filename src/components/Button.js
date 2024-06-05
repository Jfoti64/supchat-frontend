import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) => (props.$primary ? '#007bff' : '#6c757d')};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${(props) => (props.$primary ? '#0056b3' : '#5a6268')};
  }
`;

export default Button;
