import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import FastImage from 'react-native-fast-image';

export default function ProductFavorite() {
  const productFavorites = useSelector(
    (state) => state.main.shoppingCart.productFavoriteList,
  );
  const navigation = useNavigation();
  // console.log(productFavorites);
  return (
    <View style={styles.container}>
      {productFavorites.length > 0 ? (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={productFavorites}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={(post) => {
            const item = post.item;

            return (
              <React.Fragment>
                {item.status == true ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      navigation.navigate('ProductDetailScreen', {
                        product: item,
                      });
                    }}
                    style={styles.card}>
                    <View style={[styles.cardHeader]}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={styles.title}>{item.name}</Text>
                      </View>
                    </View>

                    <FastImage
                      style={[styles.cardImage, {borderRadius: 20}]}
                      source={{uri: item.imageUrl[0]}}
                    />

                    <View style={styles.cardFooter}>
                      <View style={styles.socialBarContainer}>
                        <View style={styles.socialBarSection}>
                          <View style={styles.socialBarButton}>
                            <Text
                              style={[styles.socialBarLabel, styles.buyNow]}>
                              Tìm sản phẩm
                            </Text>
                          </View>
                        </View>
                        <View style={styles.socialBarSection}>
                          <TouchableOpacity style={styles.socialBarButton}>
                            <Text style={[styles.price, {textAlign: 'center'}]}>
                              {item.price}$
                            </Text>
                            {/* <Text style={styles.socialBarLabel}>25</Text> */}
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ) : null}
              </React.Fragment>
            );
          }}
        />
      ) : (
        <Text style={{flex: 1, textAlign: 'center'}}>
          bạn chưa có sản phẩm yêu thích
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: '#E6E6E6',
  },
  listContainer: {
    alignItems: 'center',
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: 'white',
    flexBasis: '47%',
    marginHorizontal: 5,
    borderRadius: 10,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    flex: 1,
    height: 120,
    width: 100,
    alignSelf: 'center',
  },
  /******** card components **************/
  title: {
    color: 'red',
    fontWeight: '700',
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
  },
  buyNow: {
    color: 'purple',
  },
  icon: {
    width: 25,
    height: 25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
