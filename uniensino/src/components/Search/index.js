import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import logo from '../../assets/logo-white.png';

import {Container, BoxHeader, FormInput} from './styles';


export default class Search extends React.Component {

render(){
  return (
    <Container>
      <BoxHeader>
        <View style={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Image source={logo} />
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Buscar por um curso…"
            // onChange={this.myChangeHandler}
            name={'name'}
          />
        </View>
      </BoxHeader>
    </Container>
  )
  };
}

const styles = StyleSheet.create({
  textInputStype: {
    padding: 15,
    height: 43,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderColor: '#B1B1B1',
    borderWidth: 1,
  }
});
