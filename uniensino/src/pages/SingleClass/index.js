import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView, Text, TouchableOpacity, Modal, StyleSheet, View, Linking } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import HTML from "react-native-render-html";
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

import { Container, BoxHeader, SubmitButton } from './styles';

import Spinner from 'react-native-loading-spinner-overlay';

export default class SingleClass extends React.Component {
  state = {
    loading: true,
    modalVisibleSuccess: false,
    modalVisibleLinks: false,
    modalVisibleTest: false,
    lesson: [],
    links: [],
    test: [],
    testCheck: [],
    next: [],
    exercises: [],
    exer: [],
  };

  getLoad = async () => {
    AsyncStorage.getItem('key').then((token) => {
      if (token !== null) {
        this.setState({ token: token });
        this.getCourse(token);
        this.getTestCheck(token);
        //this.getTest(token);
        this.getNext(token);
      }
    });
  }

  getCourse = async (token = this.state.token) => {
    this.setState({ loading: true });
    const response = await api.get(`/courses/${this.props.route.params.courseId}/classes/${this.props.route.params.classeId}/lessons/${this.props.route.params.lessonId}`,
      { headers: { Authorization: 'Bearer ' + token } },
    );

    this.setState({ lesson: response.data.data.lesson, links: response.data.data.lesson.links, loading: false });
    console.log(response.data.data.lesson);
    console.log('entrou');
  }

  getTestCheck = async (token = this.state.token) => {
    const response = await api.get(`/courses/${this.props.route.params.courseId}/classes/${this.props.route.params.classeId}/lessons/${this.props.route.params.lessonId}/test/check`,
      { headers: { Authorization: 'Bearer ' + token } },
    );

    this.setState({ testCheck: response.data.data.test });

  }

  getTest = async (token = this.state.token) => {
    const response = await api.get(`/courses/${this.props.route.params.courseId}/classes/${this.props.route.params.classeId}/lessons/${this.props.route.params.lessonId}/test`,
      { headers: { Authorization: 'Bearer ' + token } },
    );

    this.setState({ test: response.data.data.test, exer: response.data.data.test.exercises });
    console.log(response.data.data.test.exercises);

  }
  getNext = async (token = this.state.token) => {
    const response = await api.get(`/courses/${this.props.route.params.courseId}/classes/${this.props.route.params.classeId}/lessons/${this.props.route.params.lessonId}/next`,
      { headers: { Authorization: 'Bearer ' + token } },
    );

    this.setState({ next: response.data.data.lesson });
    console.log(response.data.data.lesson);

  }

  componentDidMount() {
    this.getLoad();
    this.setState({ loading: false });
  }

  save = async event => {
    this.setState({ loading: true });

    console.log(this.state.exercises);

    this.setState({ loading: false });
  }

  checkAns(exercise, question) {
    this.setState({
      exercises: [
        ...this.state.exercises,
        {
          id: exercise.id,
          answer: {
            answer_id: question.id, answer_text: null
          }
        }]
    });
    console.log(this.state.exercises);
  }

  render() {
    const { loading, modalVisibleSuccess, lesson, links, modalVisibleLinks, modalVisibleTest, test, exer, next, testCheck } = this.state;
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
            <WebView
              source={{ uri: lesson.video }}
              style={{ marginTop: 20, width: 300, height: 300 }}
            />

            <HTML source={{ html: lesson.description }} />

            <BoxHeader>
              <Text style={{ color: '#333333', fontSize: 18, marginBottom: 10, fontFamily: 'Montserrat', fontWeight: 'bold' }}>Materiais de Apoio</Text>
            </BoxHeader>

            {lesson.laboratory !== null ? (
              <SubmitButton style={{ backgroundColor: '#002951' }} onPress={() => Linking.openURL(lesson.laboratory)}>
                <Text style={{ fontFamily: 'Montserrat' }}><Icon name="flask" size={20} color="#fff" style={{ marginLeft: 30 }} /> Laboratório</Text>
              </SubmitButton>
            ) : (
              <SubmitButton style={{ backgroundColor: '#8e959c' }}>
                <Text style={{ fontFamily: 'Montserrat' }}><Icon name="flask" size={20} color="#fff" style={{ marginLeft: 30 }} /> Laboratório</Text>
              </SubmitButton>
            )}

            {links.length !== 0 ? (
              <SubmitButton style={{ backgroundColor: '#002951' }} onPress={() => this.setState({ modalVisibleLinks: true })}>
                <Text style={{ fontFamily: 'Montserrat' }}><Icon name="paperclip" size={20} color="#fff" style={{ marginLeft: 30 }} /> Materiais de Apoio</Text>
              </SubmitButton>
            ) : (
              <SubmitButton style={{ backgroundColor: '#8e959c' }} onPress={() => this.setState({ modalVisibleLinks: true })}>
                <Text style={{ fontFamily: 'Montserrat' }}><Icon name="paperclip" size={20} color="#fff" style={{ marginLeft: 30 }} /> Materiais de Apoio</Text>
              </SubmitButton>
            )}

            <BoxHeader>
              <Text style={{ color: '#333333', fontSize: 18, marginBottom: 10, fontFamily: 'Montserrat', fontWeight: 'bold' }}>Avaliação</Text>
            </BoxHeader>

            {lesson.has_test ? (
              testCheck.is_answered === false ? (
                <SubmitButton style={{ backgroundColor: '#002951' }} onPress={() => this.props.navigation.navigate('SingleTest', { curso: 'Avaliação: ' + lesson.name, courseId: this.props.route.params.courseId, classeId: this.props.route.params.classeId, lessonId: this.props.route.params.lessonId, testId: test.id })}>
                  <Text style={{ fontFamily: 'Montserrat' }}><Icon name="sticky-note" size={20} color="#fff" style={{ marginLeft: 30 }} /> Realizar avaliação</Text>
                </SubmitButton>
              ) : (
                <SubmitButton style={{ backgroundColor: '#8e959c' }}>
                  <Text style={{ fontFamily: 'Montserrat' }}><Icon name="sticky-note" size={20} color="#fff" style={{ marginLeft: 30 }} /> A avaliação já foi respondida!</Text>
                </SubmitButton>
              )
            ) : (
              <SubmitButton style={{ backgroundColor: '#8e959c' }}>
                <Text style={{ fontFamily: 'Montserrat' }}><Icon name="sticky-note" size={20} color="#fff" style={{ marginLeft: 30 }} /> Nenhuma avaliação</Text>
              </SubmitButton>
            )}

            <SubmitButton onPress={() => this.props.navigation.replace('SingleClass', { curso: next.subject, courseId: next.module_id, classeId: this.props.route.params.classeId, lessonId: next.id })}>
              <Text style={{ fontFamily: 'Montserrat' }}>Próxima aula</Text>
            </SubmitButton>

          </Container>

          <View  >

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisibleLinks}>
              <LinearGradient colors={['#B20A00', '#002951']} style={styles.centeredView}>
                <TouchableOpacity
                  style={styles.openButton}
                  onPress={() => {
                    this.setState({ modalVisibleLinks: false });
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

                  <View>
                    {
                      links.map((link, i) => (
                        <>
                          <Text onPress={() => Linking.openURL(link.url)}>{link.name}</Text>
                        </>
                      ))
                    }
                    {
                      links.length === 0 ?
                        (
                          <Text>Este conteúdo não está disponível nesta aula.</Text>
                        ) :
                        (<></>)
                    }
                  </View>
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
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
