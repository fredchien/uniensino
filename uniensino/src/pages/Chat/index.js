import React, {Component} from 'react';
import {ScrollView, Text, Image, TouchableOpacity, View } from 'react-native';

import { Container, BoxChat, Msg } from './styles';

import Spinner from 'react-native-loading-spinner-overlay';

import bg from '../../assets/Bg.png';

export default class Chat extends React.Component {

  state = {
    loading: true,
    hasMsg: false
  };
  componentDidMount() {
    this.setState({ loading: false});
  }

  render(){
    const {loading, hasMsg} = this.state;
    return(
      <>
      <ScrollView style={{backgroundColor: '#fff', paddingTop: 20}}>
        <Spinner
          visible={loading}
          textContent={'Carregando...'}
          textStyle={{color: '#fff'}}
          overlayColor={'#002951'}
        />
        <Container>
        <TouchableOpacity style={{width: '100%'}} onPress={() => this.props.navigation.navigate('SingleChat')}>
            <BoxChat>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <Image source={bg} style={{width: 90, borderRadius: 5}}></Image>
                <Text style={{width: 180, marginLeft: 15}}>Eco Escola “Capacitação Em Educação Ambiental”</Text>
              </View>
              <Msg hasMsg={this.state.hasMsg}>0</Msg>
            </BoxChat>
        </TouchableOpacity>
          <TouchableOpacity style={{width: '100%'}} onPress={() => this.props.navigation.navigate('SingleChat')}>
            <BoxChat>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <Image source={bg} style={{width: 90, borderRadius: 5}}></Image>
                <Text style={{width: 180, marginLeft: 15}}>Eco Escola “Capacitação Em Educação Ambiental”</Text>
              </View>
              <Msg hasMsg={true}>2</Msg>
            </BoxChat>
          </TouchableOpacity>
        </Container>
      </ScrollView>
      </>
    );
  }
}
