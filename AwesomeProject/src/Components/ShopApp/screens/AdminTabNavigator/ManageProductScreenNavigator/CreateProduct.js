import * as Animatable from 'react-native-animatable';
import * as Yup from 'yup';
import FirestoreService from '../../../services/FirestoreService';
import {FancyAlert} from 'react-native-expo-fancy-alerts';
import React from 'react';
import {Button, Headline, useTheme} from 'react-native-paper';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';
import TextBox from '../../../components/Texbox';
import colors from '../../../constants/color';
import {addAddressAction} from '../../../modules/auth/actions';
import ImagePicker from 'react-native-image-crop-picker';
// YUP
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
import storage from '@react-native-firebase/storage';
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required(),
  price: Yup.number().required(),
  categories: Yup.string().required(),
  description: Yup.string().required(),
});

const Updateproduct = () => {
  const Touch =
    Platform.OS === 'ios' ? TouchableOpacity : TouchableWithoutFeedback;
  // REDUX
  //   const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  // THEMNE
  const paperColor = useTheme().colors;
  const signedInUser = useSelector((state) => state.auth.signedInUser);
  const [visible, setVisible] = React.useState(false);
  const [selectedImage, setSelectImage] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('iphone');
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // NAVIGATION
  const navigation = useNavigation();
  const [Imageurl, setImageUrl] = React.useState('');
  const [percent, setPercent] = React.useState([]);
  const getCategories = () => {
    const data = [];
    firestore()
      .collection('Categories')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const category = documentSnapshot.data();
          category.id = documentSnapshot.id;
          data.push(category);
        });
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setCategories([]);
        setLoading(false);
      });
  };
  React.useEffect(getCategories, []);
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        activeOpacity={1}
        style={{flex: 1, backgroundColor: colors.WHITE}}
        onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{flex: 1}}>
          <Formik
            initialValues={{
              uid: signedInUser ? signedInUser.uid : null,
              name: '',
              price: '',
              description: '',
              categories: selectedValue,
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
              if (Imageurl) {
                console.log(values);
                firestore()
                  .collection('Products')
                  .add({
                    name: values.name,
                    price: values.price,
                    categories: selectedValue,
                    description: values.description,
                    imageUrl: [Imageurl],
                  })
                  .then(() => {
                    console.log('Product added!');
                    setVisible(true);
                  });
              } else {
                Alert.alert('bạn chưa tải ảnh ...');
              }
            }}>
            {(formik) => (
              <React.Fragment>
                <View style={{alignItems: 'center'}}></View>
                {/* https://cdn.tgdd.vn/Products/Images/42/220438/oppo-reno5-trang-600x600-1-600x600.jpg   Reno 5 */}
                {!selectedImage && (
                  <TouchableOpacity
                    style={{alignItems: 'center'}}
                    onPress={() => {
                      ImagePicker.openPicker({
                        width: 300,
                        height: 400,
                        cropping: true,
                        multiple: true,
                      }).then(async (image) => {
                        setSelectImage(true);
                        if (image) {
                          const {path} = image;
                          const filename = path.replace(/^.*[\\/]/, '');
                          const reference = storage().ref('images/' + filename);

                          // uploads file
                          const task = reference.putFile(path);

                          // uploading
                          task.on('state_changed', (taskSnapshot) => {
                            let currentPercent =
                              (taskSnapshot.bytesTransferred /
                                taskSnapshot.totalBytes) *
                              100;
                            // console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                            setPercent(currentPercent);
                          });

                          // completed
                          task.then(() => {
                            console.log('Image uploaded to the bucket!');
                            // Alert.alert('Upload', 'picture uploaded!');
                            storage()
                              .ref('images/' + filename)
                              .getDownloadURL()
                              .then((url) => {
                                console.log(url);
                                setImageUrl(url);
                                setSelectImage(false);
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          });
                        }
                      });
                    }}>
                    {Imageurl ? (
                      <Image
                        source={{
                          uri: Imageurl,
                        }}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 10,
                          marginTop: 10,
                        }}
                      />
                    ) : (
                      <Image
                        source={{
                          uri:
                            'https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg',
                        }}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 10,
                          marginTop: 10,
                        }}
                      />
                    )}
                  </TouchableOpacity>
                )}
                {selectedImage && (
                  <Text style={{textAlign: 'center'}}>
                    đang tải ảnh...{percent}%
                  </Text>
                )}

                <View
                  style={{flex: 0, justifyContent: 'flex-start', padding: 16}}>
                  <TextBox
                    name="name"
                    iconName="account"
                    disabled={loading}
                    placeholder="Tên sản phẩm "
                    containerStyle={{borderWidth: 0, backgroundColor: 'white'}}
                    inputContainerStyle={{borderBottomWidth: 1.5}}
                    leftIconContainerStyle={{marginLeft: 12}}
                    onBlur={() => formik.handleBlur('name')}
                    onChangeText={formik.handleChange('name')}
                    value={formik.values.name}
                  />
                  <TextBox
                    name="price"
                    autoCapitalize="none"
                    // iconName="money"
                    keyboardType="numeric"
                    disabled={loading}
                    placeholder="Giá"
                    containerStyle={{borderWidth: 0, backgroundColor: 'white'}}
                    inputContainerStyle={{borderBottomWidth: 1.5}}
                    leftIconContainerStyle={{marginLeft: 12}}
                    onBlur={() => formik.handleBlur('price')}
                    onChangeText={formik.handleChange('price')}
                    value={formik.values.price}
                  />
                  <TextBox
                    name="description"
                    autoCapitalize="none"
                    disabled={loading}
                    placeholder="mô tả sản phẩm"
                    containerStyle={{borderWidth: 0, backgroundColor: 'white'}}
                    inputContainerStyle={{borderBottomWidth: 1.5}}
                    leftIconContainerStyle={{marginLeft: 12}}
                    onBlur={() => formik.handleBlur('description')}
                    onChangeText={formik.handleChange('description')}
                    value={formik.values.description}
                  />
                  <View height={16} />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                    }}>
                    <Text style={{alignSelf: 'center', paddingHorizontal: 10}}>
                      Chọn danh mục:
                    </Text>

                    <Picker
                      selectedValue={selectedValue}
                      style={{height: 50, width: 150, alignSelf: 'center'}}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedValue(itemValue)
                      }>
                      {categories.map((e, index) => (
                        <Picker.Item
                          key={'e' + index}
                          label={e.id}
                          value={e.id}
                        />
                      ))}
                    </Picker>
                  </View>
                  <View height={16} />
                </View>
                <Animatable.View
                  animation="slideInUp"
                  duration={1000}
                  style={{
                    flex: 1,
                    padding: 16,
                    justifyContent: 'flex-end',
                  }}>
                  {!visible && (
                    <Button
                      disabled={loading}
                      loading={loading}
                      labelStyle={{fontSize: 18}}
                      contentStyle={{
                        height: 48,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#00BFFF',
                      }}
                      style={{elevation: 0}}
                      uppercase={false}
                      icon="key"
                      mode="contained"
                      onPress={formik.handleSubmit}
                      dark>
                      {loading ? 'Thêm sản phẩm ...' : ' Thêm sản phẩm'}
                    </Button>
                  )}
                  {visible && (
                    <View>
                      <FancyAlert
                        visible={visible}
                        icon={
                          <View
                            style={{
                              flex: 1,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#4CB748',
                              borderRadius: 50,
                              width: '100%',
                            }}>
                            <Text>
                              <Icon name="check" size={30} color="white"></Icon>
                            </Text>
                          </View>
                        }
                        style={{backgroundColor: 'white'}}>
                        <View style={styles.content}>
                          <Text style={{}}>Thêm sản phẩm thành công...!</Text>
                          <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                              setVisible(false);
                              navigation.navigate('ListProductScreen');
                            }}>
                            <Text style={styles.btnText}>OK</Text>
                          </TouchableOpacity>
                        </View>
                      </FancyAlert>
                    </View>
                  )}
                  {/* <Touch
                    onPress={() => {
                      navigation.navigate('SignInScreen');
                    }}>
                    <View style={{alignItems: 'center', padding: 12}}></View>
                  </Touch> */}
                </Animatable.View>
              </React.Fragment>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </View>
  );
};

export default Updateproduct;
const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -16,
    marginBottom: 16,
  },
  contentText: {
    textAlign: 'center',
  },
  btn: {
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'stretch',
    backgroundColor: '#4CB748',
    marginTop: 16,
    minWidth: '50%',
    paddingHorizontal: 16,
  },
  btnText: {
    color: '#FFFFFF',
  },
});
