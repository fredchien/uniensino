import { Platform } from 'react-native';
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

export const Form = styled.View`
  align-self: stretch;

`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  font-family: 'Montserrat';
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const SignLinkText = styled.Text`
 color: #666666;

 font-size: 15px;
 text-align: center;
 text-decoration: underline;
 font-family: 'Montserrat';
`;

export const BaseGreen = styled.View`
  background: #EEEEEE;
  height: 150px;
  width: 100%;
  align-items: center;
  position: relative;
`;

export const ImageBackground = styled.View`

  position: absolute;
  top: -120px;
  z-index: 1;
  align-items: center;
  align-self: center;
  align-content: center;
  padding-top: 30px;

`

export const BoxText = styled.View`
  position: relative;
  bottom: 100px;
`;
export const TitleContent = styled.Text`
  color: #B20A00;
  font-size: 23px;
  text-align: center;

  font-family: 'Montserrat';
`;

export const LabelInput = styled.Text`
  color: rgba(22, 22, 21, 1);
  font-size: 16px;
  margin-bottom: 10px;
  font-family: 'Montserrat';
`;

export const MsgError = styled.Text`
  color: #B20A00;
  font-size: 15px;
  text-align: center;

  font-family: 'Montserrat';
`;
