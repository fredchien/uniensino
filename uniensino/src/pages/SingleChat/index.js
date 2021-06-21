import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import {extendMoment} from 'moment-range';
const Moment = require('moment-timezone');
const moment = extendMoment(Moment);

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

import { Container, BoxUser, BoxMessage, ImageBackground} from './styles';

export default class Chat extends React.Component {

  state = {
    userid: 1,
    sessionid: 1,
    secid: 2,
    button: false,
  }

  render(){
    const {userid, sessionid, secid, button} = this.state;
    return(
      <>
    {/* <ScrollView style={{marginTop: -30}}> */}
      <BoxUser >
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontFamily: 'Montserrat', color: '#353535', marginLeft: 10}}>Eco Escola “Capacitação em Educação Ambiental”</Text>
      </View>

      </BoxUser>
      <ScrollView style={{flex: 1, marginBottom: '20%', backgroundColor: '#fff'}} >
        <Container>

      <View style={[styles.item, (userid === sessionid ? styles.itemOut : styles.itemIn)]}>
        <View style={[styles.balloon, {backgroundColor: (userid === sessionid ? '#B20A00' : '#002951')}]}>
          <Text style={{paddingTop: 5, color: (userid === sessionid ? '#fff' : '#666')}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</Text>
          <View
          style={[
            styles.arrowContainer,
            (userid === sessionid ? styles.arrowRightContainer : styles.arrowLeftContainer)
          ]}
        >
          {
            userid === sessionid ? (
              <Svg style={styles.arrowRight} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.485 17.5 15.515 17.5"  enable-background="new 32.485 17.5 15.515 17.5">
              <Path
                  d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
                  fill="#B20A00"
                  x="0"
                  y="0"
              />
          </Svg>
            ) : (
              <Svg style={styles.arrowLeft} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.484 17.5 15.515 17.5"  enable-background="new 32.485 17.5 15.515 17.5">
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



      <View style={[styles.item, (userid === sessionid ? styles.itemIn : '')]}>
        <View style={[styles.balloon, {backgroundColor: (userid === sessionid ? '#002951' : '')}]}>
          <Text style={{paddingTop: 5, color: (userid === sessionid ? '#fff' : '')}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</Text>
          <View
          style={[
            styles.arrowContainer,
            (userid === sessionid ? styles.arrowLeftContainer : '')
          ]}
        >
          {
            userid === sessionid ? (
              <Svg style={styles.arrowLeft} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.484 17.5 15.515 17.5"  enable-background="new 32.485 17.5 15.515 17.5">
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

      <View style={[styles.item, (userid === sessionid ? styles.itemIn : '')]}>
        <View style={[styles.balloon, {backgroundColor: (userid === sessionid ? '#002951' : '')}]}>
          <Text style={{paddingTop: 5, color: (userid === sessionid ? '#fff' : '')}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</Text>
          <View
          style={[
            styles.arrowContainer,
            (userid === sessionid ? styles.arrowLeftContainer : '')
          ]}
        >
          {
            userid === sessionid ? (
              <Svg style={styles.arrowLeft} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.484 17.5 15.515 17.5"  enable-background="new 32.485 17.5 15.515 17.5">
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

      <View style={[styles.item, (userid === sessionid ? styles.itemIn : '')]}>
        <View style={[styles.balloon, {backgroundColor: (userid === sessionid ? '#002951' : '')}]}>
          <Text style={{paddingTop: 5, color: (userid === sessionid ? '#fff' : '')}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</Text>
          <View
          style={[
            styles.arrowContainer,
            (userid === sessionid ? styles.arrowLeftContainer : '')
          ]}
        >
          {
            userid === sessionid ? (
              <Svg style={styles.arrowLeft} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.484 17.5 15.515 17.5"  enable-background="new 32.485 17.5 15.515 17.5">
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


        </Container>
      </ScrollView>
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled keyboardVerticalOffset={100}>
        <TouchableOpacity disabled={((button === true && this.state.message.length > 0) ? false : true)} style={[styles.sendButton, {backgroundColor: (button === true && this.state.message.length > 0 ? '#B20A00' : '#ddd')}]} onPress={this.save}>
          <Icon name="send-o" color={'#fff'} size={35} style={{marginLeft: -2, marginTop: 1}} />
        </TouchableOpacity>
        <TextInput style={styles.input} value={this.state.message} onChangeText={message => {this.setState({button: true, message: message})}} multiline={true} placeholder={'Escreva aqui sua mensagem...'} placeholderTextColor={'#707070'}/>
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
     right:moderateScale(-4, 0.5),
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
