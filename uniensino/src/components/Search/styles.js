import {Platform} from 'react-native';
import styled from 'styled-components/native';

import Input from '../../components/Input';

export const Container = styled.View`
  padding: 15px;

  background: #002951;
  border-top-color: #002951;
  border-top-width: 1px;
  width: 100%;


`;

export const BoxHeader = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 15px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
  width: 65%;
`;
