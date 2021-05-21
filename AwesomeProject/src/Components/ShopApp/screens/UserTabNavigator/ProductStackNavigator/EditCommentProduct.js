import React, {useState} from 'react';
import Color from '../../../constants/color';
import Animated from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';
import FirestoreService from '../../../services/FirestoreService';
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const StartRateProductScreen = ({route}) => {
  // console.log(route.params.producId.comment);
  const signedInUser = useSelector((state) => state.auth.signedInUser);
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={{flex: 1, alignItems: 'center', marginVertical: 15}}>
        <TextInput
          multiline={true}
          numberOfLines={10}
          onChangeText={(text) => setText(text)}
          style={{
            height: 100,
            width: 300,
            textAlignVertical: 'top',
            borderWidth: 1,
            borderColor: '#959595',
          }}
          defaultValue={route.params.comment}
        />

        <TouchableOpacity
          activeOpacity={1}
          disabled={loading}
          loading={!loading}
          style={styles.buttonStyle}
          //   onPress={() => {
          //     firestore.collection('StarRate').doc(route.params.uid).set({
          //       comment: text,
          //     });
          //   }}
          onPress={() => {
            firestore()
              .collection('StarRate')
              .doc(route.params.producId.id)
              .update({
                comment: text ? text : route.params.producId.comment,
              })

              .then((createdOrder) => {});

            navigation.navigate('ProductDetailScreen');
          }}>
          <Text style={styles.buttonTextStyle}>Ok</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default StartRateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  titleText: {
    padding: 8,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
    color: '#000',
    marginTop: 15,
  },

  buttonStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    padding: 15,
    backgroundColor: Color.PRIMARY,
    borderRadius: 10,
  },
  buttonStyleDefaul: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    padding: 15,
    backgroundColor: '#9E9E9E',
    borderRadius: 10,
  },
  buttonTextStyle: {
    color: '#fff',
    width: '10%',
    textAlign: 'center',
    alignItems: 'center',
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 1,
    marginVertical: 5,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  textAreaContainer: {
    borderColor: '#ebebeb',
    borderWidth: 1,
    padding: 5,
  },
});
