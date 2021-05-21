import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserListScreen from './ManageUserStackNavigator/UserListScreen';
import UserDetailScreen from './ManageUserStackNavigator/UserDetailScreen';
import MenuScreen from './MenuScreen';
import UserCommentScreen from './ManageUserStackNavigator/UserCommentScreen';
import UserOrderSceen from './ManageUserStackNavigator/UserOrderSceen';
import DecentralizationScreen from './ManageUserStackNavigator/DecentralizationScreen';
import ListOrderScreen from './ManageProductOrderStackNaviagtor/ListOrderScreen';
import SendNotifiactionScreen from './ManageUserStackNavigator/SendNotifiactionScreen';
import ProductStateScreen from './ManageProductOrderStackNaviagtor/ProductStateScreen';
import MenuCategory from './ManageCategoryStackNavigator/MenuCategory';
import CreateCategoryScreen from './ManageCategoryStackNavigator/CreateCategoryScreen';
import EditCategoryScreen from './ManageCategoryStackNavigator/EditCategoryScreen';
import ListProductScreen from './ManageProductScreenNavigator/ProductList';
import EditProductScreen from './ManageProductScreenNavigator/EditProduct';
import CreateProductScreen from './ManageProductScreenNavigator/CreateProduct';
import ListBannerScreen from './ManageBannerScreen';
import {Button} from 'react-native';
import plusIcon from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();

const ProductStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ManageUserStackNavigator"
        component={MenuScreen}
        options={{title: 'ManageUserStackNavigator', headerShown: false}}
      />
      <Stack.Screen
        name="MenuCategory"
        component={MenuCategory}
        options={{title: 'MenuCategory', headerShown: false}}
      />
      <Stack.Screen
        name="ListOrderScreen"
        component={ListOrderScreen}
        options={{title: 'Các đơn hàng', headerShown: true}}
      />
      <Stack.Screen
        name="ProductStateScreen"
        component={ProductStateScreen}
        options={{title: 'Chi tiết & trạng thái đơn hàng', headerShown: true}}
      />
      <Stack.Screen
        name="UserListScreen"
        component={UserListScreen}
        options={{title: 'Danh sách thành viên', headerShown: true}}
      />
      <Stack.Screen
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={{title: 'Chi tiết thành viên', headerShown: true}}
      />
      <Stack.Screen
        name="UserCommentScreen"
        component={UserCommentScreen}
        options={{title: 'Bình luận của thành viên', headerShown: true}}
      />
      <Stack.Screen
        name="UserOrderSceen"
        component={UserOrderSceen}
        options={{title: 'Đơn hàng của thành viên', headerShown: true}}
      />
      <Stack.Screen
        name="DecentralizationScreen"
        component={DecentralizationScreen}
        options={{title: 'Phân quyền thành viên', headerShown: true}}
      />
      <Stack.Screen
        name="SendNotifiactionScreen"
        component={SendNotifiactionScreen}
        options={{title: 'Gửi thông báo', headerShown: true}}
      />
      <Stack.Screen
        name="CreateCategoryScreen"
        component={CreateCategoryScreen}
        options={{title: 'Tạo danh mục', headerShown: true}}
      />
      <Stack.Screen
        name="EditCategoryScreen"
        component={EditCategoryScreen}
        options={{title: 'Chỉnh sửa danh mục', headerShown: false}}
      />
      <Stack.Screen
        name="ListProductScreen"
        component={ListProductScreen}
        options={{
          title: 'Danh sách sản phẩm',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={{
          title: 'Chỉnh sửa sản phẩm',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="CreateProductScreen"
        component={CreateProductScreen}
        options={{
          title: 'Thêm sản phẩm',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ListBannerScreen"
        component={ListBannerScreen}
        options={{
          title: 'Danh sách banners',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProductStackNavigator;
