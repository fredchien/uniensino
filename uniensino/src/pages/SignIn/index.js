import React, { useRef } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import { Image, Text, ActivityIndicator } from 'react-native';

import icon from '../../assets/logo.png';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
  BoxText,
  BaseGreen,
  ImageBackground,
  TitleContent,
  LabelInput,
  MsgError
} from './styles';

export default class SignIn extends React.Component {
  state = {
    user: [],
    loading: true,
    error: false,
    button: true,
    msgError: ''
  };

  componentDidMount() {

    this.getLoad();
  }

  getLoad = async () => {
    await AsyncStorage.removeItem('key');
    AsyncStorage.getItem('key').then((token) => {
      if (token !== null) {
        this.props.navigation.replace('About')
      }

    });
    this.setState({ loading: false })
  }

  myChangeHandler = event => {
    let nam = event._dispatchInstances.memoizedProps.name;
    let val = event.nativeEvent.text;
    this.setState({
      user: {
        ...this.state.user,
        [nam]: val
      }
    });
  };

  login = async event => {
    this.setState({ button: false, error: false });
    let user = this.state.user;

    await api.post('/users/login', user, { headers: { 'Content-Type': 'application/json' } })
      .then(async response => {
        this.setState({ button: true });
        try {
          // alert(response.data.success);
          if (response.data.success) {
            await AsyncStorage.setItem('key', response.data.data.token);
            await AsyncStorage.setItem('user', JSON.stringify(response.data.data.user.id));
            this.props.navigation.replace('About');
          } else {
            await AsyncStorage.removeItem('key');
            this.setState({ button: true, error: true, msgError: response.data.message })
          }

        } catch (e) {
          console.log(e);
        }

      })
      .catch(err => {
        // alert(err.response);
        this.setState({ button: true, error: true, msgError: "O e-mail ou senha informados não são válidos!" })
      });
  }

  render() {
    return (
      <>
        <BaseGreen />

        <Container>
          <ImageBackground>
            <Image source={icon} />
          </ImageBackground>
          <BoxText>
            <TitleContent>Bem Vindo!</TitleContent>
          </BoxText>
          <Form>
            <LabelInput>E-mail</LabelInput>
            <FormInput
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Seu e-mail"
              returnKeyType="next"
              name="email"
              onChange={this.myChangeHandler}
            />
            <LabelInput>Senha</LabelInput>
            <FormInput
              secureTextEntry
              placeholder="Sua senha"
              name="password"
              returnKeyType="send"
              onChange={this.myChangeHandler}
            />
            {this.state.error && <MsgError>{this.state.msgError}</MsgError>}
            <SubmitButton onPress={this.login}>
              {this.state.button === false && <ActivityIndicator size="small" color="#fff" />}
              {this.state.button && <Text style={{ fontFamily: 'Montserrat' }}>Entrar</Text>}
            </SubmitButton>

            <SignLink onPress={() => this.props.navigation.replace('ForgotPass')}>
              <SignLinkText>Esqueci minha senha</SignLinkText>
            </SignLink>

          </Form>
        </Container>
      </>
    );
  }


}
