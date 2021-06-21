import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  height: 43px;
  background: rgba(255, 255, 255, 1);
  border-radius: 15px;
  border: solid 1px #B7B7B7;

  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(196, 196, 196, 1)',
})`
  flex: 1;
  font-size: 15px;

  color: #161615;
`;
