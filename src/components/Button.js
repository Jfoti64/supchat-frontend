import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: ${(props) => (props.$primary ? '#007bff' : '#6c757d')};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.$primary ? '#0056b3' : '#5a6268')};
  }
`;

export default Button;
