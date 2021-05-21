import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  ListView,
  TouchableOpacity,
  View,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CongratulationScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={{
          uri:
            'https://mayphunsuonganthinh.com/wp-content/uploads/2018/10/kisspng-check-mark-bottle-material-green-tick-5ad25467123860.2792666715237336070746.png',
        }}
      />
      <Text style={styles.title}>Đặt hàng thành công</Text>
      <Text style={styles.description}>
        Chúng tôi sẽ xử lý đơn hàng và giao cho bạn sớm nhất,để xem trạng thái
        đơn hàng vào mục đơn hàng, Thank you !
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.buttonContainer, styles.loginButton]}
        onPress={() => navigation.navigate('ProductOrderScreen')}>
        <Text style={styles.buttonText}>Xem đơn hàng</Text>
      </TouchableOpacity>
      <TouchableHighlight
        activeOpacity={0.8}
        style={[styles.buttonContainer, styles.loginButton]}
        onPress={() => navigation.navigate('ShoppingCarts')}>
        <Text style={styles.buttonText}>Tiếp tục mua hàng</Text>
      </TouchableHighlight>
    </View>
  );
};
export default CongratulationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    paddingTop: 50,
  },
  icon: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 22,
    color: '#5F6D7A',
  },
  description: {
    marginTop: 20,
    textAlign: 'center',
    color: '#A9A9A9',
    fontSize: 16,
    margin: 40,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#ffa502',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
