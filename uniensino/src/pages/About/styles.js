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

export const BoxHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
  margin-top: 20px;
`;

export const BoxContent = styled.View`
  margin-top: 50px;
  width: 100%;
`;
export const TextContent = styled.Text`
  color: #002951;
  font-size: 16px;
  border-bottom-color: #E0E0E0;
  border-bottom-width: 1px;
  padding-bottom: 15px;
  margin-bottom: 25px;
  text-align: center;
`;
