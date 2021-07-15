import React, { Component } from 'react';
import { ScrollView, Text, Image, TouchableOpacity, View, StyleSheet, Animated, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';


import { Container, BoxChat, Msg } from './styles';

import Search from '../../components/Search';

import Spinner from 'react-native-loading-spinner-overlay';

import bg from '../../assets/Bg.png';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class Courses extends React.Component {
  state = {
    loading: true,
    index: 0,
    routes: [
      { key: 'first', title: 'Em andamento', navigation: this.props.navigation },
      { key: 'second', title: 'Não Iniciados', navigation: this.props.navigation },
      { key: 'third', title: 'Concluídos', navigation: this.props.navigation },
    ],
    courses: [],
    token: ''
  };



  getLoad = async () => {
    AsyncStorage.getItem('key').then((token) => {
      if (token !== null) {
        this.setState({ token: token })
        this.getCourses(token)
      }
    });
  }

  getCourses = async (token = this.state.token) => {
    this.setState({ loading: true });
    const response = await api.get(`/courses/student`,
      { headers: { Authorization: 'Bearer ' + token } },
    );

    this.setState({ courses: response.data.data.courses, loading: false });
  }


  FirstRoute = () => (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <Container>
        {this.state.courses ? (
          <>
            {this.state.courses
              .filter((item) => item.concluded == false)
              .map((course, index) => (
                <TouchableOpacity style={{ width: '100%' }} onPress={() => this.props.navigation.navigate('SingleCourse', { courseId: course.id, classeId: course.classe_id })} key={index}>
                  <BoxChat>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                      <Image source={{ uri: course.image }} style={{ width: 90, height: 90, borderRadius: 5 }}></Image>
                      <Text style={{ width: 150, marginLeft: 15 }}>{course.name}</Text>
                      <Msg><Icon name="chevron-right" size={20} color="#BABABA" /></Msg>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }}>
                      <Progress.Bar progress={"0." + course.progress.split('.').shift()} width={250} color={'#96C8F8'} unfilledColor={'#EBECED'} borderColor={'white'} height={7} />
                      <Text style={{ color: '#666666', fontSize: 11 }}>{course.progress.split('.').shift()}%</Text>
                    </View>
                  </BoxChat>
                </TouchableOpacity>
              ))}
          </>
        ) : (<></>)}

      </Container>
    </ScrollView>
  );

  SecondRoute = () => (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <Container>
        {this.state.courses ? (
          <>
            {this.state.courses
              .filter((item) => item.started == false)
              .map((course, index) => (
                <TouchableOpacity style={{ width: '100%' }} onPress={() => this.props.navigation.navigate('SingleCourse', { courseId: course.id, classeId: course.classe_id })} key={index}>
                  <BoxChat>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                      <Image source={{ uri: course.image }} style={{ width: 90, height: 90, borderRadius: 5 }}></Image>
                      <Text style={{ width: 150, marginLeft: 15 }}>{course.name}</Text>
                      <Msg><Icon name="chevron-right" size={20} color="#BABABA" /></Msg>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }}>
                      <Progress.Bar progress={"0." + course.progress.split('.').shift()} width={250} color={'#96C8F8'} unfilledColor={'#EBECED'} borderColor={'white'} height={7} />
                      <Text style={{ color: '#666666', fontSize: 11 }}>{course.progress.split('.').shift()}%</Text>
                    </View>
                  </BoxChat>
                </TouchableOpacity>
              ))}
          </>
        ) : (<>

        </>)}
      </Container>
    </ScrollView>
  );

  ThirdRoute = () => (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <Container>
        {this.state.courses ? (
          <>
            {this.state.courses
              .filter((item) => item.concluded == true)
              .map((course, index) => (
                <TouchableOpacity style={{ width: '100%' }} onPress={() => this.props.navigation.navigate('SingleCourse', { courseId: course.id, classeId: course.classe_id })} key={index}>
                  <BoxChat>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                      <Image source={{ uri: course.image }} style={{ width: 90, height: 90, borderRadius: 5 }}></Image>
                      <Text style={{ width: 150, marginLeft: 15 }}>{course.name}</Text>
                      <Msg><Icon name="chevron-right" size={20} color="#BABABA" /></Msg>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }}>
                      <Progress.Bar progress={"0." + course.progress.split('.').shift()} width={250} color={'#96C8F8'} unfilledColor={'#EBECED'} borderColor={'white'} height={7} />
                      <Text style={{ color: '#666666', fontSize: 11 }}>{course.progress.split('.').shift()}%</Text>
                    </View>
                  </BoxChat>
                </TouchableOpacity>
              ))}
          </>
        ) : (<></>)}
      </Container>
    </ScrollView>
  );

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
    this.getLoad();
  }

  render() {
    const { loading } = this.state;

    return (
      <>
        <Spinner
          visible={loading}
          textContent={'Carregando...'}
          textStyle={{ color: '#fff' }}
          overlayColor={'#002951'}
        />
        <Search />
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
  tabStyle: {

  },
  labelStyle: {

  },
  tablabel: {
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: 10,
    margin: 4,

  }
});
