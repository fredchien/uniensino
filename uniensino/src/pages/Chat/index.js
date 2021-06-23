import React, { Component } from 'react';
import { ScrollView, Text, Image, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

import { Container, BoxChat, Msg } from './styles';

import Spinner from 'react-native-loading-spinner-overlay';

import bg from '../../assets/Bg.png';

export default class Chat extends React.Component {

  state = {
    loading: true,
    hasMsg: false,
    chats: [],
    token: ''
  };
  componentDidMount() {
    this.getLoad();
  }

  getLoad = async () => {
    AsyncStorage.getItem('key').then((token) => {
      if (token !== null) {
        this.setState({ token: token })
        this.getChats(token)
      }
    });
  }

  getChats = async (token = this.state.token) => {
    this.setState({ loading: true });
    const response = await api.get(`/chat`,
      { headers: { Authorization: 'Bearer ' + token } },
    );

    this.setState({ chats: response.data.data.chat, loading: false });
  }

  render() {
    const { loading, hasMsg, chats } = this.state;
    return (
      <>
        <ScrollView style={{ backgroundColor: '#fff', paddingTop: 20 }}>
          <Spinner
            visible={loading}
            textContent={'Carregando...'}
            textStyle={{ color: '#fff' }}
            overlayColor={'#002951'}
          />
          <Container>
            {this.state.chats ? (
              <>
                {this.state.chats.map((chat, index) => (
                  <TouchableOpacity style={{ width: '100%' }} onPress={() => this.props.navigation.navigate('SingleChat', { chatId: chat.id })} key={index}>
                    <BoxChat>
                      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Image source={{ uri: chat.image }} style={{ width: 90, height: 90, borderRadius: 5 }}></Image>
                        <Text style={{ width: 180, marginLeft: 15 }}>{chat.name}</Text>
                      </View>
                      <Msg hasMsg={chat.new_messages}>{chat.new_messages_count}</Msg>
                    </BoxChat>
                  </TouchableOpacity>
                ))}
              </>
            ) : (<></>)}
          </Container>
        </ScrollView>
      </>
    );
  }
}
