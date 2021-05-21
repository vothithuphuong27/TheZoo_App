import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {FancyAlert} from 'react-native-expo-fancy-alerts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DecentralizationScreen({route}) {
  const userUid = route.params.userUid;
  const [selectedRole, setSelectedRole] = React.useState('User');
  const [profile, setProfile] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  console.log(selectedRole);
  const getProfile = () => {
    firestore()
      .collection('Profiles')
      .doc(userUid)
      .get()
      .then((querySnapshot) => {
        setProfile(querySnapshot.data());
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // Alert.alert('Error', 'Something is wrong!');
        setProfile([]);
        setLoading(false);
      });
  };

  React.useEffect(getProfile, [setRefresh]);
  return (
    <SafeAreaView>
      <View style={{marginVertical: 5}}>
        <Text
          style={{
            alignSelf: 'center',
            fontWeight: '700',
            fontSize: 17,
          }}>
          Chọn quyền:
        </Text>
        <Picker
          selectedValue={selectedRole}
          style={{height: 50, width: 150, alignSelf: 'center'}}
          onValueChange={(itemValue, itemIndex) => setSelectedRole(itemValue)}>
          {/* <Picker.Item label={profile.role} value="Admin" /> */}
          <Picker.Item label="Admin" value="Admin" />
          <Picker.Item label="User" value="User" />
        </Picker>
      </View>

      <Button
        title="xác nhận"
        onPress={() => {
          firestore()
            .collection('Profiles')
            .doc(userUid)
            .update({
              role: selectedRole,
            })
            .then(() => {
              console.log('decentralization updated successfully..!');
              setRefresh(refresh + 1);
              setVisible(true);
            });
        }}></Button>
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
              <Text style={{}}>
                Cập nhật Quyền {selectedRole} thành công...!
              </Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  setVisible(false);
                  // navigation.navigate('ListProductScreen');
                }}>
                <Text style={styles.btnText}>OK</Text>
              </TouchableOpacity>
            </View>
          </FancyAlert>
        </View>
      )}
    </SafeAreaView>
  );
}
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
