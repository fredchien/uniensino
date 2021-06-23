import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import { extendMoment } from 'moment-range';
const Moment = require('moment-timezone');
const moment = extendMoment(Moment);

import Spinner from 'react-native-loading-spinner-overlay';

import Icon from 'react-native-vector-icons/FontAwesome';
import { moderateScale } from 'react-native-size-matters';

import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

import { Container, BoxUser, BoxMessage, ImageBackground } from './styles';

export default class Chat extends React.Component {

  state = {
    loading: true,
    userid: 1,
    sessionid: 1,
    secid: 2,
    button: false,
    chat: [],
    messages: [],
    actualUser: '',
    message: '',
  }

  componentDidMount() {
    AsyncStorage.getItem('user').then((user) => {
      this.setState({ actualUser: user })
    });
    this.getLoad();
  }

  getLoad = async () => {
    AsyncStorage.getItem('key').then((token) => {
      if (token !== null) {
        this.setState({ token: token })
        this.getChat(token)
      }
    });
  }

  getChat = async (token = this.state.token) => {
    this.setState({ loading: true });
    const response = await api.get(`/chat/${this.props.route.params.chatId}`,
      { headers: { Authorization: 'Bearer ' + token } },
    );

    this.setState({ chat: response.data.data.chat, messages: response.data.data.chat.messages, loading: false });

    // alert(response.data.data.course.name);
  }

  save = async event => {
    this.setState({ button: false })
    const message = this.state.message;
    await api.post(`/chat/${this.props.route.params.chatId}`, { content: message },
      { headers: { Authorization: 'Bearer ' + this.state.token } })
      .then(response => {
        this.setState({ message: '', loading: false });
        this.getLoad();
      })
      .catch(err => {
        console.log(err);
        this.setState({ message: '', modalVisible: true, loading: false })
      });
  }

  render() {
    const { userid, sessionid, secid, button, chat, loading, actualUser } = this.state;
    return (
      <>
        {/* <ScrollView style={{marginTop: -30}}> */}
        <BoxUser >
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'Montserrat', color: '#353535', marginLeft: 10 }}>{chat.name}</Text>
          </View>

        </BoxUser>
        <ScrollView style={{ flex: 1, marginBottom: '20%', backgroundColor: '#fff' }} >
          <Spinner
            visible={loading}
            textContent={'Carregando...'}
            textStyle={{ color: '#fff' }}
            overlayColor={'#002951'}
          />
          <Container>
            {this.state.messages.map((message, index) => (
              this.state.actualUser === JSON.stringify(message.user_id) ? (
                <View style={[styles.item, (this.state.actualUser === JSON.stringify(message.user_id) ? styles.itemOut : styles.itemIn)]} key={index}>
                  <View style={[styles.balloon, { backgroundColor: (this.state.actualUser === JSON.stringify(message.user_id) ? '#B20A00' : '#002951') }]}>
                    <Text style={{ paddingTop: 5, color: (this.state.actualUser === JSON.stringify(message.user_id) ? '#fff' : '#666') }}>{message.content}</Text>
                    <View
                      style={[
                        styles.arrowContainer,
                        (this.state.actualUser === JSON.stringify(message.user_id) ? styles.arrowRightContainer : styles.arrowLeftContainer)
                      ]}
                    >
                      {
                        this.state.actualUser === JSON.stringify(message.user_id) ? (
                          <Svg style={styles.arrowRight} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.485 17.5 15.515 17.5" enable-background="new 32.485 17.5 15.515 17.5">
                            <Path
                              d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
                              fill="#B20A00"
                              x="0"
                              y="0"
                            />
                          </Svg>
                        ) : (
                          <Svg style={styles.arrowLeft} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.484 17.5 15.515 17.5" enable-background="new 32.485 17.5 15.515 17.5">
                            <Path
                              d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                              fill="#002951"
                              x="0"
                              y="0"
                            />
                          </Svg>
                        )
                      }

                    </View>
                  </View>
                </View>
              ) : (
                <View style={[styles.item, (userid === sessionid ? styles.itemIn : '')]} key={index}>
                  <View style={[styles.balloon, { backgroundColor: (userid === sessionid ? '#002951' : '') }]}>
                    <Text style={{ paddingTop: 5, color: (userid === sessionid ? '#fff' : '') }}>{message.content}</Text>
                    <View
                      style={[
                        styles.arrowContainer,
                        (userid === sessionid ? styles.arrowLeftContainer : '')
                      ]}
                    >
                      {
                        userid === sessionid ? (
                          <Svg style={styles.arrowLeft} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.484 17.5 15.515 17.5" enable-background="new 32.485 17.5 15.515 17.5">
                            <Path
                              d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                              fill="#002951"
                              x="0"
                              y="0"
                            />
                          </Svg>
                        ) : (<></>)
                      }

                    </View>
                  </View>
                </View>

              )

            ))}

          </Container>
        </ScrollView>
        <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled keyboardVerticalOffset={100}>
          <TouchableOpacity disabled={((button === true && this.state.message.length > 0) ? false : true)} style={[styles.sendButton, { backgroundColor: (button === true && this.state.message.length > 0 ? '#B20A00' : '#ddd') }]} onPress={this.save}>
            <Icon name="send-o" color={'#fff'} size={35} style={{ marginLeft: -2, marginTop: 1 }} />
          </TouchableOpacity>
          <TextInput style={styles.input} value={this.state.message} onChangeText={message => { this.setState({ button: true, message: message }) }} multiline={true} placeholder={'Escreva aqui sua mensagem...'} placeholderTextColor={'#707070'} />
        </KeyboardAvoidingView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  message: {
    padding: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },


  messageText: {
    textAlign: 'left',
    fontSize: 12,
    fontFamily: 'Montserrat',
    fontWeight: Platform.OS === 'ios' ? '500' : 'normal'
  },
  keyboardView: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  sendButton: {
    backgroundColor: '#4A3F91',
    position: 'absolute',
    top: -20,
    zIndex: 1,
    right: 15,
    borderRadius: 50,
    width: 64,
    height: 64,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  sendButton2: {
    backgroundColor: '#4A3F91',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 36,
    height: 36,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: -30
  },
  input: {
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingBottom: 20,
    paddingTop: 15,
    paddingRight: 15,
    // borderTopWidth: 2,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#7070701A',
    fontFamily: 'Montserrat',
    fontSize: 14,
    color: '#000',
    fontWeight: Platform.OS === 'ios' ? '500' : 'normal'
  },
  item: {
    marginVertical: moderateScale(7, 2),
    flexDirection: 'row',
  },
  itemIn: {
    marginLeft: 40,
    width: '100%'
  },
  itemOut: {
    alignSelf: 'flex-end',
    marginRight: 20
  },
  balloon: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 20,
  },
  arrowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1
  },
  arrowLeftContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },

  arrowRightContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  arrowLeft: {
    left: moderateScale(-4, 0.5),
  },

  arrowRight: {
    right: moderateScale(-4, 0.5),
  }
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: '60%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalViewContent: {
    paddingTop: 20,
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16
  },
  buttonBase: {
    height: 40,
    backgroundColor: '#4A3F91',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    marginBottom: 20
  }
});
