import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView, Text, TouchableOpacity, Modal, StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import HTML from "react-native-render-html";
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

import { Container, BoxHeader, SubmitButton } from './styles';

import Spinner from 'react-native-loading-spinner-overlay';

export default class SingleClass extends React.Component {
  state = {
    loading: true,
    modalVisibleSuccess: false,
    lesson: [],
  };

  getLoad = async () => {
    AsyncStorage.getItem('key').then((token) => {
      if (token !== null) {
        this.setState({ token: token });
        this.getCourse(token);
      }
    });
  }

  getCourse = async (token = this.state.token) => {
    this.setState({ loading: true });
    const response = await api.get(`/courses/${this.props.route.params.courseId}/classes/${this.props.route.params.classeId}/lessons/${this.props.route.params.lessonId}`,
      { headers: { Authorization: 'Bearer ' + token } },
    );

    this.setState({ lesson: response.data.data.lesson, loading: false });

  }

  componentDidMount() {
    this.getLoad();
    this.setState({ loading: false });
  }

  render() {
    const { loading, modalVisibleSuccess, lesson } = this.state;
    return (
      <>

        <ScrollView style={{ backgroundColor: '#fff' }}>
          <Spinner
            visible={loading}
            textContent={'Carregando...'}
            textStyle={{ color: '#fff' }}
            overlayColor={'#002951'}
          />
          <Container>
            <Video source={{ uri: "https://player.vimeo.com/video/361563749" }}   // Can be a URL or a local file.
              ref={(ref) => {
                this.player = ref
              }}                                      // Store reference
              onBuffer={this.onBuffer}                // Callback when remote video is buffering
              onError={this.videoError}               // Callback when video cannot be loaded
              style={styles.backgroundVideo} />
            <HTML source={{ html: '<iframe _ngcontent-serverapp-c59="" frameborder="0" allow="accelerometer; autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" class="embed-responsive-item" src="//player.vimeo.com/video/361563749"></iframe>' }} />
            <BoxHeader>
              <Text style={{ color: '#333333', fontSize: 18, marginBottom: 10, fontFamily: 'Montserrat', fontWeight: 'bold' }}>{lesson.video}</Text>
            </BoxHeader>

            <Text style={{ color: '#666', fontSize: 14, fontFamily: 'Montserrat', lineHeight: 25 }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</Text>

            <BoxHeader>
              <Text style={{ color: '#333333', fontSize: 18, marginBottom: 10, fontFamily: 'Montserrat', fontWeight: 'bold' }}>Ecologia</Text>
            </BoxHeader>

            <Text style={{ color: '#666', fontSize: 14, fontFamily: 'Montserrat', lineHeight: 25 }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</Text>

            <SubmitButton onPress={() => this.setState({ modalVisibleSuccess: true })}>
              <Text style={{ fontFamily: 'Montserrat' }}>Próxima aula</Text>
            </SubmitButton>

          </Container>

          <View  >

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisibleSuccess}>
              <LinearGradient colors={['#B20A00', '#002951']} style={styles.centeredView}>
                <TouchableOpacity
                  style={styles.openButton}
                  onPress={() => {
                    this.setState({ modalVisibleSuccess: false });
                    this.props.navigation.replace('Dashboard');
                  }}>
                  <Text style={[styles.textStyle]}>X</Text>
                </TouchableOpacity>
                <View
                  style={[
                    styles.modalView,
                    {
                      width: '70%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}>


                  <Text
                    style={{
                      color: '#002951',
                      marginTop: 15,
                      marginBottom: 20,
                      textAlign: 'center',
                      fontSize: 24,
                      fontWeight: 'bold',
                      fontFamily: 'Montserrat',
                    }}>
                    Parabéns!{"\n"}
                    Módulo Finalizado
                  </Text>
                  <Text
                    style={{
                      color: '#161615',
                      textAlign: 'center',
                      fontSize: 14,
                      fontFamily: 'Montserrat',
                      marginBottom: 10
                    }}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.
                  </Text>
                  <SubmitButton onPress={() => this.setState({ modalVisibleSuccess: true })}>
                    <Text style={{ fontFamily: 'Montserrat' }}>Próximo módulo</Text>
                  </SubmitButton>
                </View>

              </LinearGradient>
            </Modal>

          </View>

        </ScrollView>
      </>
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
  },
  textStyle: {
    color: '#fff',
    fontSize: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    // backgroundColor: '#8BB54C',
  },
  openButton: {
    backgroundColor: 'transparent',
    padding: 10,
    elevation: 10,

  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backgroundVideo: {
    position: 'relative',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: 300
  },
});
