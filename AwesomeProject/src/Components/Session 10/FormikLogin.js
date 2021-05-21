/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import * as Yup from 'yup';
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import {Formik} from 'formik';
import {object} from 'yup/lib/locale';

const Schema = Yup.object().shape({
  email: Yup.string().email('Định Dạng Email Sai').required('Nhập Email'),
  password: Yup.string().min(2, 'Too Short!').required('Nhập Mật Khẩu'),
});

export default class FormikLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
      Email: '',
      Password: '',
      Loading: false,
    };
  }

  render() {
    return (
      <View style={{height: 700}}>
        <View style={{flex: 1, backgroundColor: '#3366FF'}}>
          <View
            style={{
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontWeight: '700', fontSize: 50, color: 'white'}}>
              SHOP KATSU
            </Text>
            <Text style={{marginTop: 10, color: 'white', fontSize: 20}}>
              Sign in to Your Account
            </Text>
          </View>

          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={(values) => console.log(values)}
            validationSchema={Schema}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => {
              // console.log(errors);
              let disabled = Object.keys(errors).length > 0;
              return (
                <View
                  style={{
                    flex: 2,
                    backgroundColor: 'white',
                    alignItems: 'center',
                  }}>
                  <View>
                    <TextInput
                      style={{
                        borderWidth: 1,
                        width: 380,
                        marginTop: 20,
                        borderRadius: 7,
                        paddingLeft: 10,
                        position: 'relative',
                      }}
                      onChangeText={handleChange('email')}
                      placeholder="Email"
                      value={values.email}
                    />
                    <Icon
                      name="user"
                      style={{
                        position: 'absolute',
                        right: 4,
                        fontSize: 25,
                        top: 30,
                        backgroundColor: 'white',
                        marginLeft: 2,
                      }}
                    />
                    {errors.email && (
                      <Text style={{color: 'red'}}>{errors.email}</Text>
                    )}
                  </View>
                  <View>
                    <TextInput
                      secureTextEntry={this.state.secureTextEntry}
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{
                        borderWidth: 1,
                        width: 380,
                        marginTop: 20,
                        borderRadius: 7,
                        paddingLeft: 10,
                        position: 'relative',
                      }}
                      onChangeText={handleChange('password')}
                      value={values.password}
                      placeholder="Password"
                    />
                    <Icons
                      name={
                        this.state.secureTextEntry ? 'eye-with-line' : 'eye'
                      }
                      style={{
                        position: 'absolute',
                        right: 5,
                        fontSize: 25,
                        top: 31,
                        backgroundColor: 'white',
                        marginLeft: 2,
                        color: this.state.secureTextEntry ? 'gray' : 'black',
                      }}
                      onPress={() => {
                        let s = !this.state.secureTextEntry;
                        this.setState({secureTextEntry: s});
                      }}
                    />
                    {errors.password && (
                      <Text style={{color: 'red'}}>{errors.password}</Text>
                    )}
                  </View>
                  <Text style={{marginLeft: 220, textAlign: 'right', top: 10}}>
                    Forgot Your Password ?
                  </Text>
                  <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={{flex: 1}}>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        backgroundColor: 'white',
                        marginTop: 50,
                      }}>
                      <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={disabled}>
                        <Text
                          style={{
                            textAlign: 'center',
                            paddingTop: 10,
                            paddingBottom: 10,
                            fontSize: 20,
                            backgroundColor: disabled ? 'gray' : 'blue',
                            width: 380,
                          }}>
                          SING IN
                        </Text>
                      </TouchableOpacity>

                      <Text style={{marginTop: 15}}>
                        Dont have account ? Create
                      </Text>
                    </View>
                  </KeyboardAvoidingView>
                </View>
              );
            }}
          </Formik>

          {this.state.Loading && <ActivityIndicator />}
        </View>
      </View>
    );
  }
}
