/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';

export default class Product extends Component {
  render() {
    return (
      <View style={{height: 200, flexDirection: 'row'}}>
        <View style={{flex: 1, backgroundColor: 'red'}}>
          <Image
            style={{
              flex: 1,
            }}
            source={{
              uri:
                'https://vcdn-sohoa.vnecdn.net/2020/11/09/14102-1604890703-1681-1604890903.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=5bKzjzmF_Eo09PdAlVGpxQ',
            }}
          />
        </View>
        <View style={{flex: 2, backgroundColor: 'yellow'}}>
          <Text style={{fontWeight: '700'}}>Kids jumpsuit</Text>
          <View
            style={{
              flex: 1 / 3,
              backgroundColor: 'blue',
              flexDirection: 'row',
            }}>
            <Text style={{color: '#7331C6', fontSize: 32, fontWeight: '700'}}>
              $39.00
            </Text>
            <Text style={{}}>In stock</Text>
          </View>
          <View
            style={{
              flex: 1 / 2,
              backgroundColor: 'black',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                borderRadius: 50,
                width: 50,
                height: 50,
                padding: 10,
                backgroundColor: 'yellow',
                lineHeight: 30,
                textAlign: 'center',
                marginTop: 10,
              }}>
              L{' '}
            </Text>
            <Text
              style={{
                borderRadius: 50,
                width: 50,
                height: 50,
                padding: 10,
                backgroundColor: 'yellow',
                textAlign: 'center',
                lineHeight: 30,
                marginTop: 10,
              }}>
              M{' '}
            </Text>
            <Text
              style={{
                borderRadius: 50,
                width: 50,
                height: 50,
                padding: 10,
                backgroundColor: 'yellow',
                textAlign: 'center',
                lineHeight: 30,
                marginTop: 10,
              }}>
              N{' '}
            </Text>
            <Text style={{color: 'white', lineHeight: 50}}>SIZE GUILDE</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                top: 10,
                width: 100,
                padding: 10,
                borderRadius: 10,
                backgroundColor: 'blue',
              }}>
              BUY NOW
            </Text>
            <Text
              style={{
                top: 10,
                width: 100,
                padding: 10,
                borderRadius: 10,
                backgroundColor: 'blue',
                marginLeft: 10,
              }}>
              ADD TO BAG
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
