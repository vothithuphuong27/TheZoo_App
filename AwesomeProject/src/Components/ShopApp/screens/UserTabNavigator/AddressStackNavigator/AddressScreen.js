import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card, Chip, TouchableRipple, Subheading} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import IconEdit from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {EditAddressAction} from '../../../modules/auth/actions';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {deleteAddressAction} from '../../../modules/auth/actions';
export default function AddressScreen() {
  const navigation = useNavigation();
  const addressList = useSelector((state) => state.auth.addressOrder);

  const dispatch = useDispatch();

  return (
    <View>
      {/* {ShoppingCarts.address} */}
      {addressList.map((p, index) => (
        <View
          style={{borderWidth: 0.4, borderBottomColor: '#ebebeb'}}
          key={'p' + index}>
          <TouchableOpacity
            style={{flexDirection: 'row', paddingHorizontal: 15}}
            onPress={() => {
              navigation.navigate('ShoppingCarts', {address: p});
            }}>
            <View
              style={{
                flex: 1,
                marginVertical: 20,

                margin: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginVertical: 2,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '700',
                      marginVertical: 1,
                      paddingHorizontal: 1,
                    }}>
                    {p.name},{p.phone},{p.address},
                  </Text>
                </View>
              </View>
            </View>
            <TouchableRipple
              style={{marginVertical: 20}}
              onPress={() => {
                // dispatch(EditAddressAction(p.name, p.phone, p.address));
                navigation.navigate('EditAddress', {address: p, id: index});
              }}>
              <IconEdit
                name="edit"
                style={{
                  color: 'green',
                  paddingTop: 7,
                  paddingRight: 5,
                  shadowColor: '#ebebeb',
                  textAlign: 'center',
                }}>
                Edit
              </IconEdit>
            </TouchableRipple>
            <TouchableRipple
              style={{marginVertical: 20, width: 40}}
              onPress={() => {
                dispatch(deleteAddressAction(p.address));
                // console.log(notification123);
              }}>
              <Icon1
                name="delete"
                size={24}
                style={{
                  color: 'red',
                  paddingTop: 4,
                  shadowColor: '#ebebeb',
                  alignSelf: 'center',
                }}
              />
            </TouchableRipple>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableRipple
        style={{marginVertical: 20}}
        onPress={() => {
          navigation.navigate('AddAddress');
        }}>
        <Icon
          style={{marginHorizontal: 16}}
          name="plus"
          type="material-community"
          color={'red'}
          size={25}
        />
      </TouchableRipple>
    </View>
  );
}
