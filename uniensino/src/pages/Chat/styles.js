import {Platform} from 'react-native';
import styled from 'styled-components/native';


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

export const BoxChat = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  background: #FFFFFF;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;

  shadow-color: #00000029;
  shadow-offset: {width: 0, height: 3};
  shadow-opacity: 0.8;
  shadow-radius: 4;
  elevation: 4;
`;

export const Msg = styled.Text`
  color: #fff;
  background: #C4C4C4;
  background: ${(props) => (props.hasMsg ? '#B20A00' : '#C4C4C4')};
  border-radius: 50px;
  padding-top: 8px;
  height:35px;
  width: 35px;
  text-align: center;
  font-weight: bold;
  position: absolute;
  right: 0;
  top: -10px;
`;
