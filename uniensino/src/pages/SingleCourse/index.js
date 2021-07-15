import React, { Component } from 'react';
import { ScrollView, Text, Image, TouchableOpacity, View, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import HTML from "react-native-render-html";
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';

import { Container, BoxChat, Msg, SubmitButton } from './styles';


import Spinner from 'react-native-loading-spinner-overlay';

import bg from '../../assets/Bg.png';
import image from '../../assets/singlebg.png';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class SingleCourse extends React.Component {
  state = {
    loading: true,
    index: 0,
    course: [],
    modules: [],
    current: [],
    routes: [
      { key: 'first', title: 'Aulas' },
      { key: 'second', title: 'Sobre' },
      // { key: 'third', title: 'Material Complementar' },
    ],
  };

  getLoad = async () => {
    AsyncStorage.getItem('key').then((token) => {
      if (token !== null) {
        this.setState({ token: token });
        this.getCourse(token);
        this.getCurrentLesson(token);
      }
    });
  }

  getCourse = async (token = this.state.token) => {
    this.setState({ loading: true });
    // alert(this.props.route.params.courseId);
    // alert(this.props.route.params.classeId);
    const response = await api.get(`/courses/${this.props.route.params.courseId}/classes/${this.props.route.params.classeId}`,
      { headers: { Authorization: 'Bearer ' + token } },
    );

    this.setState({ course: response.data.data.course, modules: response.data.data.course.modules, loading: false });

    // alert(response.data.data.course.name);
  }

  getCurrentLesson = async (token = this.state.token) => {
    this.setState({ loading: true });
    // alert(this.props.route.params.courseId);
    // alert(this.props.route.params.classeId);
    const response = await api.get(`/courses/${this.props.route.params.courseId}/classes/${this.props.route.params.classeId}/lessons/current`,
      { headers: { Authorization: 'Bearer ' + token } },
    );

    this.setState({ current: response.data.data.lesson, loading: false });

    // alert(response.data.data.course.name);
  }

  FirstRoute = () => (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      {this.state.modules.map((module, index) => (


        <View key={module.id}>
          <View style={styles.boxSem}>
            <Text style={styles.titleSem}>{module.name}</Text>
          </View>
          {
            module.subjects.map((subject, j) => (
              <>
                <View style={styles.box} key={subject.id}>
                  <Text style={styles.titleBox}>{subject.name}</Text>
                </View>

                <View>
                  {
                    subject.lessons.map((lesson, i) => (
                      <>
                        <TouchableOpacity
                          style={styles.item}
                          onPress={() => this.props.navigation.navigate('SingleClass', { curso: lesson.name, courseId: this.state.course.id, classeId: this.state.course.classe_id, lessonId: lesson.id })}
                        >
                          <Icon
                            name={lesson.has_video ? "video-camera" : "file-text-o"}
                            color={'#CCCCCC'}
                            size={20}
                            style={{ position: 'relative', left: 0 }}
                          />
                          <Text style={styles.title}>{lesson.name}</Text>
                          <Icon
                            name="angle-right"
                            color={'#BABABA'}
                            size={20}
                            style={{ position: 'absolute', right: 0 }}
                          />
                        </TouchableOpacity>
                      </>
                    ))
                  }
                </View>
              </>
            ))
          }


        </View>
      ))}
    </ScrollView>
  );
  SecondRoute = () => (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30 }}>
        <Text style={{ color: '#333333', fontWeight: 'bold', marginBottom: 20 }}><Icon name="clock-o" size={20} color="#B20A00" />  {this.state.course.workload} - Instrutor(a) {this.state.course.supervisor}</Text>
        <HTML source={{ html: this.state.course.description }} />
      </View>
    </ScrollView>
  );

  // ThirdRoute = () => (
  //   <ScrollView style={{ backgroundColor: '#fff' }}>
  //     <Container>
  //       <TouchableOpacity style={{ width: '100%', marginTop: 15 }} onPress={() => this.props.navigation.navigate('SingleChat')}>
  //         <Text style={{ fontSize: 16, color: '#353535' }}><Icon name="download" size={20} color="#666666" />   Download da Apostila</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={{ width: '100%', marginTop: 15 }} onPress={() => this.props.navigation.navigate('SingleChat')}>
  //         <Text style={{ fontSize: 16, color: '#353535' }}><Icon name="download" size={20} color="#666666" />   Download dos Slides</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={{ width: '100%', marginTop: 15 }} onPress={() => this.props.navigation.navigate('SingleChat')}>
  //         <Text style={{ fontSize: 16, color: '#353535' }}><Icon name="pencil" size={20} color="#666666" />   Responder Quiz</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={{ width: '100%', marginTop: 15 }} onPress={() => this.props.navigation.navigate('SingleChat')}>
  //         <Text style={{ fontSize: 16, color: '#353535' }}><Icon name="comment-o" size={20} color="#666666" />  Fale com o Professor</Text>
  //       </TouchableOpacity>
  //     </Container>
  //   </ScrollView>
  // );

  _handleIndexChange = (index) => this.setState({ index });

  _renderScene = SceneMap({
    first: this.FirstRoute,
    second: this.SecondRoute,
    third: this.ThirdRoute,
  });

  _renderHeader(props) {
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: 'pink', fontSize: 10 }}
      />
    )
  }


  componentDidMount() {
    this.setState({ loading: false });
    this.getLoad();
  }

  render() {
    const { loading, course, current } = this.state;
    return (
      <>
        <Spinner
          visible={loading}
          textContent={'Carregando...'}
          textStyle={{ color: '#fff' }}
          overlayColor={'#002951'}
        />
        <ImageBackground source={{ uri: course.image }} style={styles.image}>
          <View style={styles.overlay}>
            <Icon name="chevron-down" color={'white'} size={20} style={{ marginRight: 1, position: 'absolute', top: 20, left: 20 }} onPress={() => this.props.navigation.navigate('SingleCourse')} />
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, marginBottom: 10 }}>{current.name}</Text>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, marginBottom: 10, fontWeight: 'bold' }}>{current.subject}</Text>
            <SubmitButton onPress={() => this.props.navigation.navigate('SingleClass', { curso: current.name, courseId: course.id, classeId: course.classe_id, lessonId: current.id })}>
              <Text style={{ fontFamily: 'Montserrat' }}>Começar agora</Text>
            </SubmitButton>
          </View>
        </ImageBackground>
        <Container>
          <Text style={{ fontSize: 20, paddingTop: 10, paddingBottom: 10, color: '#353535', fontWeight: 'normal' }}>{course.name}</Text>
        </Container>
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',

  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  opacity: {
    color: 'white'
  },
  image: {
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: 'center',
    height: 250,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    width: '100%',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tablabel: {
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: 10,
    margin: 4,

  },
  box: {
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: '#ECF0F1',

  },
  boxSem: {
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: '#B20A00',
  },
  titleBox: {
    fontSize: 15,
    paddingLeft: 20,
    color: '#000',
    fontFamily: 'Montserrat',
  },
  titleSem: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
  },
  title: {
    color: '#353535',
    fontSize: 15,
    marginLeft: 10
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 0,
    height: 50,
  },
});
