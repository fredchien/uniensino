import React, { useRef } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import api from '../../services/api';

import { Container, Form, FormInput, SubmitButton, BoxText, TextContent, LabelInput, MsgError } from './styles';

export default class ForgotPass extends React.Component {
  state = {
    user: [],
    loading: true,
    error: false,
    button: true,
    msgError: '',
    hasStatus: false,
  };

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

  handleSubmit = async event => {
    this.setState({ button: false, error: false });
    let user = this.state.user;

    await api.post('/users/recover-password', user, { headers: { 'Content-Type': 'application/json' } })
      .then(async response => {
        this.setState({ button: true });
        try {
          if (response.data.success) {
            this.setState({ button: true, error: true, msgError: response.data.message, hasStatus: response.data.success })
          } else {

            this.setState({ button: true, error: true, msgError: response.data.message, hasStatus: response.data.success })
          }

        } catch (e) {
          console.log(e);
        }

      })
      .catch(err => {
        alert(err.response);
        this.setState({ button: true, error: true, msgError: "Usuário inexistente ou inativo!" })
      });
  }

  render() {

    return (
      <>

        <Container>

          <BoxText>
            <TextContent>Digite o e-mail atrelado à conta da qual deseja recuperar a senha.</TextContent>
          </BoxText>
          <Form>
            <LabelInput>E-mail</LabelInput>
            <FormInput
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Seu e-mail"
              returnKeyType="send"
              name="email"
              onChange={this.myChangeHandler}
              onSubmitEditing={this.handleSubmit}
            />
            {this.state.error && <MsgError hasStatus={this.state.hasStatus}>{this.state.msgError}</MsgError>}
            <SubmitButton onPress={this.handleSubmit}>
              {this.state.button === false && <ActivityIndicator size="small" color="#fff" />}
              {this.state.button && <Text style={{ fontFamily: 'Montserrat' }}>Recuperar Senha</Text>}
            </SubmitButton>

          </Form>

        </Container>
      </>
    );
  }


}
