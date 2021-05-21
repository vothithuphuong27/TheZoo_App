import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FireBaseProduct() {
  const [users, setUsers] = React.useState([]);
  const [P, setP] = React.useState(0);
  const getUsers = () => {
    const data = [];
    firestore()
      .collection('Users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const item = documentSnapshot.data();
          item.id = documentSnapshot.id;
          data.push(item);
        });
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Error', 'Something is wrong!');
        setUsers([]);
      });
  };

  const removeUser = (id) => () => {
    firestore()
      .collection('Users')
      .doc(id)
      .delete()
      .then(() => {
        console.log('User removed!');
        setP(P + 1);
      });
  };

  // const addUser = () => {
  //   firestore()
  //     .collection('Users')
  //     .add({
  //       Name: 'Phát',
  //     })
  //     .then(() => {
  //       console.log('User added!');
  //       setP(P + 1);
  //     });
  // };
  const addUser = () => {
    firestore()
      .collection('Questions')
      .add({
        content: 'câu hỏi 2',
        options: [
          {
            text: 'dap an 1',
            correct: true,
          },
          {
            text: 'dap an 2',
          },
          {
            text: 'dap an 3',
          },
          {
            text: 'dap an 4',
          },
        ],
      })
      .then(() => {
        console.log('User added!');
        setP(P + 1);
      });
  };

  React.useEffect(getUsers, [P]);

  const renderItem = ({item}) => {
    console.log(item);
    return (
      <View
        style={{
          marginLeft: 4,
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text>{item.Name}</Text>
        <TouchableOpacity onPress={removeUser(item.id)}>
          <Icon name="delete" size={24} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <React.Fragment>
      <Button title="Add user" onPress={addUser} />

      <FlatList
        data={users}
        keyExtractor={(item, i) => 'user+' + i}
        renderItem={renderItem}
      />
    </React.Fragment>
  );
}
