import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { TextInputMask } from 'react-native-masked-text';

import { Container, BoxInput, LabelInput, Form, FormInput, SubmitButton, BoxUser } from './styles';

import Spinner from 'react-native-loading-spinner-overlay';

export default class Student extends React.Component {
  state = {
    data: [],
    loading: true,
    success: false
  };
  componentDidMount() {
    this.setState({ loading: false});
  }

  myChangeHandler = (event) => {
    let nam = event._dispatchInstances.memoizedProps.name;
    let val = event.nativeEvent.text;
    this.setState({
      data: {
        ...this.state.data,
        [nam]: val,
      },
    });
  };

  handleSubmit = async (event) => {
    console.log(this.state.data);
  }


  render(){
    const {loading} = this.state;
    return(

      <Container>
        <Spinner
          visible={loading}
          textContent={'Carregando...'}
          textStyle={{color: '#fff'}}
          overlayColor={'#002951'}
        />
        <BoxUser>
          <View style={{backgroundColor: '#EEEEEE', width: 76, height: 76, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 100}}>
            <Icon
              name="user"
              color={'#002951'}
              size={40}
            />
          </View>
          <Text style={{marginTop: 15, fontSize: 18}}>Cléber Alexandre</Text>
        </BoxUser>
        <Form>
          <BoxInput>
            <View style={{flexDirection: 'row'}}>
              <LabelInput>E-mail</LabelInput>
            </View>
            <FormInput
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChange={this.myChangeHandler}
              name={'email'}
            />
          </BoxInput>
          <BoxInput>
            <View style={{flexDirection: 'row'}}>
              <LabelInput>Telefone</LabelInput>
            </View>
            <TextInputMask
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(41) '
              }}
              style={styles.textInputStype}
              value={this.state.data.telefone}
              onChangeText={text => {
                this.setState({
                  data:{
                    ...this.state.data,
                    telefone: text
                  }
                })
              }}
            />
          </BoxInput>
          <BoxInput>
            <View style={{flexDirection: 'row'}}>
              <LabelInput>Nova Senha</LabelInput>
            </View>
            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              onChange={this.myChangeHandler}
              name={'name'}
            />
          </BoxInput>
          <BoxInput>
            <View style={{flexDirection: 'row'}}>
              <LabelInput>Confirme sua Senha</LabelInput>
            </View>
            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              onChange={this.myChangeHandler}
              name={'name'}
            />
          </BoxInput>
          <SubmitButton onPress={this.handleSubmit}>
            <Text style={{fontFamily: 'Montserrat'}}>Salvar</Text>
          </SubmitButton>
        </Form>
      </Container>

  );
  }
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
