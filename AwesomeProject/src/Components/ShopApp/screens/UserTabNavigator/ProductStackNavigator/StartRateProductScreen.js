import React, {useState} from 'react';
import Color from '../../../constants/color';
import Animated from 'react-native-reanimated';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import FirestoreService from '../../../services/FirestoreService';
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

const StartRateProductScreen = ({route}) => {
  const signedInUser = useSelector((state) => state.auth.signedInUser);
  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const starImageFilled =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
  const starImageCorner =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
  const navigation = useNavigation();
  const productFavorites = useSelector(
    (state) => state.main.shoppingCart.productFavoriteList,
  );
  const productFv = productFavorites.find(
    (e) => e.id == route.params.product.id,
  );
  const logoRef = React.useRef(null);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // logoRef.current.transitionTo({opacity: 0.6});
        containerRef.current.transitionTo({marginTop: -200}, 120);
        logoRef.current.fadeOutUpBig(1000);
        // logoRef.current.fadeOutUpBig(1000);

        // logoRef.current.transitionTo({marginTop: -150}, 1000);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // logoRef.current.fadeInDownBig(1000);
        containerRef.current.transitionTo({marginTop: 0}, 120);

        logoRef.current.fadeInDownBig(1000);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const CustomRatingBar = () => {
    return (
      <Animatable.View
        animation="pulse"
        iterationCount={5}
        style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Animatable.View>
                <Image
                  style={styles.starImageStyle}
                  source={
                    item <= defaultRating //3 <= 3  || 2 <= 2 | 3 < =2
                      ? {uri: starImageFilled}
                      : {uri: starImageCorner}
                  }
                />
              </Animatable.View>
            </TouchableOpacity>
          );
        })}
      </Animatable.View>
    );
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      onPress={Keyboard.dismiss}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Animatable.View
        animation="slideInDown"
        ref={containerRef}
        style={{flex: 1, alignItems: 'center', marginVertical: 15}}>
        <Animatable.View
          animation="slideInDown"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
          }}
          ref={logoRef}>
          <View>
            <Image
              source={{
                uri: route.params.product.imageUrl[0],
              }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 15,
              }}
            />
          </View>
        </Animatable.View>

        <Text style={styles.titleText}>{route.params.product.name}</Text>

        <CustomRatingBar />

        <Animatable.Text animation="zoomInUp">
          Viết đánh giá của bạn về sản phẩm
        </Animatable.Text>
        <TextInput
          multiline={true}
          numberOfLines={10}
          onChangeText={(text) => setText(text)}
          defaultValue={text}
          style={{
            height: 100,
            width: 300,
            textAlignVertical: 'top',
            borderWidth: 1,
            borderColor: '#959595',
          }}
        />

        <Text style={styles.textStyle}>
          {defaultRating} / {maxRating.length}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={loading}
          loading={!loading}
          style={loading ? styles.buttonStyleDefaul : styles.buttonStyle}
          onPress={() => {
            FirestoreService.createStarRate({
              numberStar: defaultRating,
              productId: route.params.product.id,
              userId: signedInUser.uid,
              comment: text,
              imageProduct: route.params.product.imageUrl,
              imageUrl: route.params.product.imageUrl,
              name: route.params.product.name,
              status: productFv?.status,
              price: route.params.product.price,
              avatarUrl: signedInUser.photoURL,
              description: route.params.product.description,
              Name: route.params.Name,
              dayRateProductOrder: firestore.Timestamp.now(),
              timeProductOrder: route.params.timeOrders,
              timeRate: firestore.Timestamp.now(),
            });
            navigation.navigate('ProductOrderScreen');
          }}>
          <Text style={styles.buttonTextStyle}>Gửi đánh giá</Text>
        </TouchableOpacity>
      </Animatable.View>
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
