import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

import Icon from 'react-native-vector-icons/FontAwesome';

import { TextInputMask } from 'react-native-masked-text';

import { Container, BoxInput, LabelInput, Form, FormInput, SubmitButton, BoxUser } from './styles';

import Spinner from 'react-native-loading-spinner-overlay';

export default class Student extends React.Component {
  state = {
    data: [],
    loading: true,
    success: false,
    button: true,
    token: '',
    user: []
  };
  componentDidMount() {
    this.getLoad();
  }

  getLoad = async () => {
    AsyncStorage.getItem('key').then((token) => {
      if (token !== null) {
        this.setState({ token: token })
        this.getUser(token)
      }
    });
  }

  getUser = async (token = this.state.token) => {
    this.setState({ loading: true });
    const response = await api.get(`/users`,
      { headers: { Authorization: 'Bearer ' + token } },
    );

    this.setState({ user: response.data.data.user, loading: false });


  }

  myChangeHandler = event => {
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
    this.setState({ button: false });
    console.log('entrou');
    let data = this.state.data;
    console.log(data);
    await api.post('/users', {
      "name": "Rogério do Ingá",
      "phone": "(41) 98888-7777",
      "home_phone": "(41) 3555-7777",
      "password": "1234",
      "password_confirm": "1234"
    },
      { headers: { Authorization: 'Bearer ' + this.state.token } })
      .then(response => {
        console.log(response.data);
        this.setState({ button: true });
      })
      .catch(err => {
        console.log(err.data);
        this.setState({ button: false, error: true, msgError: "O e-mail ou senha informados não são válidos!" })
      });
  }


  render() {
    const { loading, user } = this.state;
    return (

      <Container>
        <Spinner
          visible={loading}
          textContent={'Carregando...'}
          textStyle={{ color: '#fff' }}
          overlayColor={'#002951'}
        />
        <BoxUser>
          <View style={{ backgroundColor: '#EEEEEE', width: 76, height: 76, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
            <Icon
              name="user"
              color={'#002951'}
              size={40}
            />
          </View>
          <Text style={{ marginTop: 15, fontSize: 18 }}>{user.name}</Text>
        </BoxUser>
        <Form>
          <BoxInput>
            <View style={{ flexDirection: 'row' }}>
              <LabelInput>Telefone</LabelInput>
            </View>
            <FormInput
              style={styles.input}
              onChange={this.myChangeHandler}
              autoCapitalize="none"
              name={'phone'}
              placeholder={user.phone} />
          </BoxInput>
          <BoxInput>
            <View style={{ flexDirection: 'row' }}>
              <LabelInput>Nova Senha</LabelInput>
            </View>
            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              onChange={this.myChangeHandler}
              name={'password'}
            />
          </BoxInput>
          <BoxInput>
            <View style={{ flexDirection: 'row' }}>
              <LabelInput>Confirme sua Senha</LabelInput>
            </View>
            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              onChange={this.myChangeHandler}
              name={'password_confirm'}
            />
          </BoxInput>
          <SubmitButton onPress={this.handleSubmit}>
            {this.state.button === false && <ActivityIndicator size="small" color="#fff" />}
            {this.state.button && <Text style={{ fontFamily: 'Montserrat' }}>Salvar</Text>}
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
