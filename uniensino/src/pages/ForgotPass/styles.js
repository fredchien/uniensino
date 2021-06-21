import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding: 0 30px;
  background-color: #fff;
`;

export const Form = styled.View`
  align-self: stretch;

`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;


export const BoxText = styled.View`
  position: relative;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const TextContent = styled.Text`
  color: #161615;
  font-size: 16px;
  text-align: left;
  font-family: 'Montserrat';
`;

export const LabelInput = styled.Text`
  color: rgba(22, 22, 21, 1);
  font-size: 16px;
  margin-bottom: 10px;
  font-family: 'Montserrat';
`;
export const MsgError = styled.Text`
  color: ${(props) => (props.hasStatus ? 'green' : '#B20A00')};

  font-size: 15px;
  text-align: center;

  font-family: 'Montserrat';
`;
