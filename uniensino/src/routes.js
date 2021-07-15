import * as React from 'react';
import { View, Text, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import SignIn from './pages/SignIn';
import ForgotPass from './pages/ForgotPass';
import About from './pages/About';
import Student from './pages/Student';
import Chat from './pages/Chat';
import SingleChat from './pages/SingleChat';
import Courses from './pages/Courses';
import SingleCourse from './pages/SingleCourse';
import SingleClass from './pages/SingleClass';
import SingleTest from './pages/SingleTest';

function LoginSchema({ navigation }) {
  return (

    <Stack.Navigator>

      <Stack.Screen name={"SignIn"} component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name={"ForgotPass"} component={ForgotPass}
        options={{
          title: 'Recuperação de senha',
          headerLeft: () => (
            <Icon name="chevron-left" size={20} color="#fff" onPress={() => navigation.goBack()} style={{ marginLeft: 30 }} />
          ),
          headerStyle: {
            backgroundColor: '#002951',
          },
          headerTintColor: '#fff',

          headerTitleAlign: 'center'
        }} />
      <Stack.Screen name={"About"} component={tabSchema} options={{ headerShown: false, gestureEnabled: false }} />
    </Stack.Navigator>

  );
}

function aboutSchema({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="About" screenOptions={optionsStack}>
      <Stack.Screen
        name="About"
        component={About}
        options={{
          title: 'Sobre o APP',
          headerLeft: () => (<></>),
          headerStyle: {
            backgroundColor: '#002951',
          },
          headerTintColor: '#fff',

          headerTitleAlign: 'center'
        }}
      />

    </Stack.Navigator>
  )
}

function studentSchema({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Student" screenOptions={optionsStack}>
      <Stack.Screen
        name="Student"
        component={Student}
        options={{
          title: 'Perfil do Aluno',
          headerLeft: () => (<></>),
          headerStyle: {
            backgroundColor: '#002951',
          },
          headerTintColor: '#fff',

          headerTitleAlign: 'center'
        }}
      />

    </Stack.Navigator>
  )
}

function chatSchema({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Chat" screenOptions={optionsStack}>
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          title: 'Caixa de Entrada',
          headerLeft: () => (<></>),
          headerStyle: {
            backgroundColor: '#002951',
          },
          headerTintColor: '#fff',

          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="SingleChat"
        component={SingleChat}
        options={{
          title: 'Mensagens',
          headerLeft: () => (
            <Icon name="chevron-left" size={20} color="#fff" onPress={() => navigation.replace('Chat')} style={{ marginLeft: 30 }} />
          ),
          headerStyle: {
            backgroundColor: '#002951',
          },
          headerTintColor: '#fff',

          headerTitleAlign: 'center'
        }}
      />

    </Stack.Navigator>
  )
}

function courseSchema({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Courses" screenOptions={optionsStack}>
      <Stack.Screen
        name="Courses"
        component={Courses}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#002951',
          },
          headerTintColor: '#fff',

          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="SingleCourse"
        component={SingleCourse}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="SingleClass"
        component={SingleClass}
        options={({ route }) => (
          {
            title:
              (route.params.curso),
            headerLeft: () => (
              <Icon name="chevron-left" size={20} color="#fff" onPress={() => navigation.goBack()} style={{ marginLeft: 30 }} />
            ),
            headerStyle: {
              backgroundColor: '#002951',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center'
          })}
      />
      <Stack.Screen
        name="SingleTest"
        component={SingleTest}
        options={({ route }) => (
          {
            title:
              (route.params.curso),
            headerLeft: () => (
              <Icon name="chevron-left" size={20} color="#fff" onPress={() => navigation.goBack()} style={{ marginLeft: 30 }} />
            ),
            headerStyle: {
              backgroundColor: '#002951',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center'
          })}
      />
    </Stack.Navigator>
  )
}

function tabSchema({ navigation }) {
  return (
    <Tab.Navigator initialRouteName="Courses" tabBarOptions={{ activeTintColor: '#002951', inactiveTintColor: '#C4C4C4', style: { backgroundColor: '#ffffff', borderWidth: 0, borderTopColor: "transparent" } }}>
      <Tab.Screen name={"Courses"} component={courseSchema} options={({ route }) =>
      ({
        title: '',
        tabBarVisible: this.getTabBarVisibility(route),
        tabBarIcon: ({ color }) => (
          <View style={styles.tabView}>
            <Icon name="list-ul" color={color} size={20} style={{ marginRight: 1 }} />
            <Text style={styles.tabText}>Cursos</Text>
          </View>
        )
      })} />
      <Tab.Screen name={"About"} component={aboutSchema} options={({ route }) =>
      ({
        title: '',
        tabBarIcon: ({ color }) => (
          <View style={styles.tabView}>
            <Icon name="ellipsis-h" color={color} size={20} style={{ marginRight: 1 }} />
            <Text style={styles.tabText}>Sobre</Text>
          </View>
        )
      })} />
      <Tab.Screen name={"Student"} component={studentSchema} options={({ route }) =>
      ({
        title: '',
        tabBarIcon: ({ color }) => (
          <View style={styles.tabView}>
            <Icon name="user" color={color} size={20} style={{ marginRight: 1 }} />
            <Text style={styles.tabText}>Aluno</Text>
          </View>
        )
      })} />
      <Tab.Screen name={"Chat"} component={chatSchema} options={({ route }) =>
      ({
        title: '',
        tabBarVisible: this.getTabBarVisibility(route),
        tabBarIcon: ({ color }) => (
          <View style={styles.tabView}>
            <Icon name="comment-o" color={color} size={20} style={{ marginRight: 1 }} />
            <Text style={styles.tabText}>Mensagens</Text>
          </View>
        )
      })} />
    </Tab.Navigator>
  )
}

getTabBarVisibility = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';
  if (routeName === 'SingleChat') {
    return false;
  }
  return true;
}


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="SignIn">
        <Tab.Screen name={"Login"} component={LoginSchema} options={{ tabBarVisible: false }} />
        <Tab.Screen name={"Chat"} component={chatSchema} options={{ tabBarVisible: false }} />
        <Tab.Screen name={"SingleChat"} component={chatSchema} options={{ tabBarVisible: false }} />
        <Tab.Screen name={"Courses"} component={courseSchema} options={{ tabBarVisible: false }} />
        <Tab.Screen name={"SingleCourse"} component={courseSchema} options={{ tabBarVisible: false }} />
        <Tab.Screen name={"SingleClass"} component={courseSchema} options={{ tabBarVisible: false }} />
        <Tab.Screen name={"SingleTest"} component={courseSchema} options={{ tabBarVisible: false }} />
        {/* <Tab.Screen name={"Partners"} component={partnerSchema} options={{tabBarVisible: false}}/>
        <Tab.Screen name={"PartnersSingle"} component={partnerSchema} options={{tabBarVisible: false}}/>
        <Tab.Screen name={"Professionals"} component={professionalsSchema} options={{tabBarVisible: false}}/>
        <Tab.Screen name={"SingleProfessionals"} component={professionalsSchema} options={{tabBarVisible: false}}/>
        <Tab.Screen name={"Dashboard"} component={HomeSchema} options={{headerShown: false}}/>
        <Tab.Screen name={"Chat"} component={chatSchema} options={{headerShown: true}}/>
        <Tab.Screen name={"More"} component={moreSchema} options={{headerShown: true}}/> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const optionsStack = {
  headerStyle: { backgroundColor: '#fff', },
  headerStyle: {
    backgroundColor: '#fff', borderWidth: 0, height: (Platform.OS === 'ios' ? 100 : 70),
    elevation: 0,
    shadowColor: "#444",
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    }
  },
  headerTitleAlign: 'center',
  headerTitleStyle: { fontWeight: '300', fontSize: 20 }
}

const styles = {
  tabView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  tabText: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    color: '#333333',
    fontWeight: '100'
  }
}
