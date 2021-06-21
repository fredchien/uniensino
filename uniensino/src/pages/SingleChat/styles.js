import {Platform} from 'react-native';
import styled from 'styled-components/native';


export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  /* padding: 0 30px; */

  padding-top: 30px;
`;

export const BoxUser = styled.View`

  padding: 20px 30px;
  background-color: #ECF0F1;
  width: 100%;
`;

export const BoxMessage = styled.View`
  padding: 15px;
  border-radius: 8px;

`;


export const ImageBackground = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 100px;
  background-color: #fff;

  z-index: 1;
  align-items: center;
  align-self: center;
  align-content: center;
  padding-top: 15px;
  shadow-color: #00000029;
  shadow-offset: {width: 0, height: 3};
  shadow-opacity: 0.8;
  shadow-radius: 4;
  elevation: 4;
`
