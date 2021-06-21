import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '../../components/Button';


export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  padding: 0 30px;
  background: #fff;
`;

export const BoxHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
  margin-top: 20px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  font-family: 'Montserrat';
  width: 100%;
`;
