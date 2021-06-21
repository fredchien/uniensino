import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity } from 'react-native';

import { Container, BoxHeader, TextContent, BoxContent } from './styles';

import Spinner from 'react-native-loading-spinner-overlay';

export default class About extends React.Component {
  state = {
    loading: true
  };
  componentDidMount() {
    this.setState({ loading: false});
  }

  render(){
    const {loading} = this.state;
    return(
    <>

    <ScrollView style={{backgroundColor: '#fff'}}>
    <Spinner
        visible={loading}
        textContent={'Carregando...'}
        textStyle={{color: '#fff'}}
        overlayColor={'#002951'}
      />
      <Container>

      <BoxHeader>
        <Text style={{color: '#333333', fontSize: 18, marginBottom: 10, fontFamily: 'Montserrat', fontWeight: 'bold'}}>App Eco Escola</Text>
      </BoxHeader>

      <Text style={{color: '#666', fontSize: 14, fontFamily: 'Montserrat', lineHeight: 25}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</Text>

      <BoxContent>
        <TextContent>suporte@ecoescola.com.br</TextContent>
        <TextContent>Versão atual 1.0.0</TextContent>
        <TouchableOpacity
            onPress={() => navigation.navigate('ListFavorites')}>
            <Text style={{textAlign: 'center', fontSize: 16, color: '#002951', fontWeight: 'bold'}}>Sair</Text>
          </TouchableOpacity>
      </BoxContent>

      </Container>
      </ScrollView>
      </>
  );
  }
}
