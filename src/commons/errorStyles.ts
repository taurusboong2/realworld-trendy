import styled from 'styled-components';

export const REQUIRED_Msg = '*필수 항목입니다.';

export const ERROR_BORDER = {
  borderColor: '#F15E5E',
};

export const ERROR_BUTTON = {
  backgroundColor: '#F15E5E',
  borderColor: '#F15E5E',
};

export const ErrorMessage = styled.small.attrs({
  role: 'alert',
})`
  color: #f15e5e;
  font-weight: bold;
`;
