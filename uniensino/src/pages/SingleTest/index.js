import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView, Text, TouchableOpacity, View, Image, Modal, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import HTML from "react-native-render-html";
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

import { Container, BoxHeader, SubmitButton, Btn } from './styles';

import Spinner from 'react-native-loading-spinner-overlay';

export default class SingleTest extends React.Component {
  state = {
    loading: true,
    modalVisibleSuccess: false,
    test: [],
    exercises: [],
    exer: [],
    status: [],
    next: [],
    message: '',
    token: ''
  };

  componentDidMount() {
    this.getLoad();
    this.setState({ loading: false });
  }
  getLoad = async () => {
    AsyncStorage.getItem('key').then((token) => {
      if (token !== null) {
        this.setState({ token: token });
        this.getTest(token);
        this.getNext(token);
      }
    });
  }
  getTest = async (token = this.state.token) => {
    const response = await api.get(`/courses/${this.props.route.params.courseId}/classes/${this.props.route.params.classeId}/lessons/${this.props.route.params.lessonId}/test`,
      { headers: { Authorization: 'Bearer ' + token } },
    );

    this.setState({ test: response.data.data.test, exer: response.data.data.test.exercises });
    //console.log(response.data.data.test.exercises);

  }

  getNext = async (token = this.state.token) => {
    const response = await api.get(`/courses/${this.props.route.params.courseId}/classes/${this.props.route.params.classeId}/lessons/${this.props.route.params.lessonId}/next`,
      { headers: { Authorization: 'Bearer ' + token } },
    );

    this.setState({ next: response.data.data.lesson });
    console.log(response.data.data.lesson);

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

    this.setState({
      status: [
        ...this.state.status,
        question.id
      ]
    });

  }

  save = async event => {
    this.setState({ loading: true });

    await api.post(`/courses/${this.props.route.params.courseId}/classes/${this.props.route.params.classeId}/lessons/${this.props.route.params.lessonId}/test/${this.props.route.params.testId}`, { exercises: this.state.exercises },
      { headers: { Authorization: 'Bearer ' + this.state.token } })
      .then(response => {
        console.log(response.data);
        this.setState({ message: response.data.message, modalVisibleSuccess: true, loading: false });
        this.getLoad();
      })
      .catch(err => {
        console.log(err);
        this.setState({ message: err, loading: false })
      });

    this.setState({ loading: false });
  }

  render() {
    const { loading, test, exer, status, modalVisibleSuccess, message, next } = this.state;
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

            <BoxHeader>
              <Text style={{ color: '#333333', fontSize: 18, marginBottom: 10, fontFamily: 'Montserrat', fontWeight: 'bold' }}></Text>
            </BoxHeader>

            {
              exer.map((exercise, i) => (
                <>
                  <HTML source={{ html: exercise.question }} />
                  <Image source={{ uri: exercise.image }} style={{ width: '100%', height: 100 }} />
                  {
                    exercise.exercise_answers.map((answer, j) => (
                      <View key={j} style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <RadioButton
                          value={answer.id}
                          status={this.state.status.includes(answer.id) ? 'checked' : 'unchecked'}
                          onPress={() => this.checkAns(exercise, answer)}
                        />
                        <HTML source={{ html: answer.answer }} />
                      </View>
                    ))
                  }

                </>
              ))
            }
            <SubmitButton onPress={this.save}>
              <Text style={{ fontFamily: 'Montserrat' }}>Enviar avaliação</Text>
            </SubmitButton>
          </Container>
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
                  Teste Finalizado
                </Text>
                <Text
                  style={{
                    color: '#161615',
                    textAlign: 'center',
                    fontSize: 14,
                    fontFamily: 'Montserrat',
                    marginBottom: 10
                  }}>
                  {message}
                </Text>
                <Btn onPress={() => this.props.navigation.replace('SingleClass', { curso: next.name, courseId: next.module_id, classeId: this.props.route.params.classeId, lessonId: next.id })}>Próximo módulo</Btn>
              </View>
            </LinearGradient>
          </Modal>
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
