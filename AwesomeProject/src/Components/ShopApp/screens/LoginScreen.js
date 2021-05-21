import React from 'react';
import {
  View,
  Text,
  Switch,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';

import * as Yup from 'yup';
import {object} from 'yup/lib/locale';

import {useNavigation} from '@react-navigation/native';

// Navigators
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import TabNavigator from '../navigator/TabNavigator';

const Schema = Yup.object().shape({
  email: Yup.string()
    .email('Incorrect email,try again')
    .required('Please,press email'),
  password: Yup.string()
    .min(4, 'Password must be 4 characters')
    .required('Please,press password'),
});
const styles = StyleSheet.create({
  Inputcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#898B9A',
  },
});

function Title() {
  return (
    <View
      style={{
        flex: 1.8,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 15,
            backgroundColor: '#FF6C44',
          }}></View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 20,
          }}>
          <Text style={{fontSize: 40, color: '#FF6C44', fontWeight: 'bold'}}>
            Eatme
          </Text>
        </View>
      </View>

      <View style={{justifyContent: 'space-evenly'}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 28, fontWeight: 'bold', color: 'black'}}>
            Let's Sign You In
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 18, color: '#757D85'}}>
            Welcome back,you've been missed!
          </Text>
        </View>
      </View>
    </View>
  );
}
function Body() {
  const [state, setState] = React.useState({secureTextEntry: true});
  const navigation = useNavigation(); // <-- add this line
  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={Schema}
      onSubmit={(values) => {
        console.log(values);
        axios
          .post('https://training.softech.cloud/api/users/login', values)
          .then((response) => {
            if (response.data.length > 0) {
              navigation.navigate('TabNavigator');
            } else {
              Alert.alert('Đăng nhập thất bại');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }}>
      {({handleChange, handleSubmit, errors, touched}) => {
        return (
          <React.Fragment>
            <View
              style={{
                flex: 3,
                backgroundColor: 'white',
                alignItems: 'center',
              }}>
              <View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.text]}>Email</Text>

                  {errors.email && (
                    <Text style={{fontSize: 16, color: 'red'}}>
                      {errors.email}
                    </Text>
                  )}
                </View>

                <View
                  style={{
                    width: 357,
                    height: 56,
                    backgroundColor: '#E4E4E4',
                    borderRadius: 5,
                    marginTop: 8,
                    alignItems: 'center',
                    flexDirection: 'row',

                    borderWidth: errors.email ? 2 : 0,
                    borderColor: errors.email ? 'red' : '#E4E4E4',
                  }}>
                  <TextInput
                    autoCapitalize="none"
                    style={{
                      width: 310,
                      marginLeft: 20,
                      fontSize: 16,
                    }}
                    onChangeText={handleChange('email')}
                  />

                  {!errors.email && (
                    <Icon
                      name="checkmark-circle-outline"
                      size={19}
                      color="green"
                    />
                  )}
                </View>
              </View>
              <View style={{marginTop: 15}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.text]}>Password</Text>

                  {errors.password && (
                    <Text style={{fontSize: 16, color: 'red'}}>
                      {errors.password}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    width: 357,
                    height: 56,
                    backgroundColor: '#E4E4E4',
                    borderRadius: 5,
                    marginTop: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <TextInput
                    secureTextEntry={state.secureTextEntry}
                    style={{
                      width: 310,
                      marginLeft: 20,
                      fontSize: 16,
                    }}
                    onChangeText={handleChange('password')}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      let s = !state.secureTextEntry;
                      setState({secureTextEntry: s});
                    }}>
                    <Icon
                      name={
                        state.secureTextEntry
                          ? 'eye-off-outline'
                          : 'eye-outline'
                      }
                      size={19}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: 360,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Switch></Switch>
                  <Text style={{color: '#898B9A'}}>Save me</Text>
                </View>
                <TouchableOpacity>
                  <Text style={{fontSize: 15, color: '#525C67'}}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginVertical: 10}}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    width: 360,
                    height: 56,
                    backgroundColor: '#FF6C44',
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Text style={{fontSize: 20, color: 'white'}}>Sign in</Text>
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',

                    marginTop: 10,
                  }}>
                  <View>
                    <Text style={{fontSize: 18, color: '#525C67'}}>
                      Don't have an account?
                    </Text>
                  </View>
                  <TouchableOpacity style={{marginLeft: 5}}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#FF6C44',
                        fontWeight: 'bold',
                      }}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </React.Fragment>
        );
      }}
    </Formik>
  );
}
function Footer() {
  return <View style={{flex: 1, backgroundColor: 'white'}}></View>;
}
export default function LoginShop() {
  return (
    <View style={{flex: 1}}>
      <Title />
      <Body />
      <Footer />
    </View>
  );
}
