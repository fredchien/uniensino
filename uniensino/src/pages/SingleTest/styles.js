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
  margin-bottom: 15px;
  font-family: 'Montserrat';
  width: 100%;
`;

export const Btn = styled.Text`
  margin-top: 5px;
  margin-bottom: 15px;
  font-family: 'Montserrat';
  width: 100%;
  height: 48px;
  background: #B20A00;
  border-radius: 15px;

  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  padding-top: 15px;
  font-weight: bold;
`;
