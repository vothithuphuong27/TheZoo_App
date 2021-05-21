/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Entypo';
import axios from 'axios';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
      Email: '',
      Password: '',
      Loading: false,
    };
  }
  SignIn = () => {
    this.setState({Loading: true});
    const url = 'https://training.softech.cloud/api/users/login';
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        if (response.data.length === 0) {
          Alert.alert('Thông báo', 'Đăng nhập không thành công');
        } else {
          Alert.alert('Thông báo', 'Đăng nhập thành công');
        }
      })
      .catch((error) => {
        this.setState({Loading: false});
        console.log(error);
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
      });
  };
  render() {
    let disabled = !(
      this.state.Email.length > 0 && this.state.Password.length > 0
    );

    return (
      <View style={{height: 700}}>
        <View style={{flex: 1, backgroundColor: '#3366FF'}}>
          <View
            style={{
              height: 300,
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
          <View
            style={{flex: 2, backgroundColor: 'white', alignItems: 'center'}}>
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
                onChangeText={(text) => {
                  this.setState({Email: text});
                }}
                placeholder="Email"
              />
              <Icon
                name="user"
                style={{
                  position: 'absolute',
                  right: 4,
                  fontSize: 25,
                  top: 31,
                  backgroundColor: 'white',
                  marginLeft: 2,
                }}
              />
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
                onChangeText={(text) => {
                  this.setState({Password: text});
                }}
                placeholder="Password"
              />
              <Icons
                name={this.state.secureTextEntry ? 'eye-with-line' : 'eye'}
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
            </View>
            <Text style={{marginLeft: 220, textAlign: 'right', top: 10}}>
              Forgot Your Password ?
            </Text>
          </View>
          {this.state.Loading && <ActivityIndicator />}
          {!this.state.Loading && (
            <View
              style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
              <TouchableOpacity disabled={disabled} onPress={this.SignIn}>
                <Text
                  style={{
                    textAlign: 'center',
                    paddingTop: 10,
                    paddingBottom: 10,
                    fontSize: 20,
                    backgroundColor: 'blue',
                    width: 380,
                  }}>
                  SING IN
                </Text>
              </TouchableOpacity>

              <Text style={{marginTop: 15}}>Dont have account ? Create</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}
