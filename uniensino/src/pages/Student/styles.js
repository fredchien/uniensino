import {Platform} from 'react-native';
import styled from 'styled-components/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  background-color: #fff;
`;

export const BoxInput = styled.View`
  width: 100%;
  margin-bottom: 15;

`;

export const LabelInput = styled.Text`
  color: rgba(22, 22, 21, 1);
  font-size: 16px;
  margin-bottom: 10px;
  font-family: 'Montserrat';
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 10px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
export const BoxUser = styled.View`
  padding-bottom: 20px;
  padding-top: 20px;
  background-color: #fff;
  width: 100%;
  display: flex;
  align-items: center;
`;
