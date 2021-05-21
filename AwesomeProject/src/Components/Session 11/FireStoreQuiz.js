import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';

export default function FireStoreQuiz() {
  const [questions, setQuestions] = React.useState(null);
  const [color, setColor] = React.useState('white');
  const [index, setIndex] = React.useState(0);
  const getQuestion = () => {
    const data = [];
    firestore()
      .collection('Questions')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const item = documentSnapshot.data();
          item.id = documentSnapshot.id;
          data.push(item);
        });
        setQuestions(data);
      })
      .catch((error) => {
        console.log(error);
     
        setQuestions([]);
      });
  };

  React.useEffect(getQuestion, []);
  return (
    <FlatList
      style={{flex: 1}}
      data={questions}
      renderItem={({item, index}) => {
        return (
          <View>
            <Text>{questions[index].content}</Text>
            {questions[index].options.map((o) => {
              return (
                <TouchableOpacity
                  style={{
                    marginVertical: 6,
                    padding: 12,
                    borderColor: '#bdc3c7',
                    borderWidth: 1,
                  }}
                  onPress={() => {
                    firestore()
                      .collection('Answers')
                      .add({
                        Name: 'thắng',
                        question: questions[index].id,
                        correct: o.correct,
                      })
                      .then(() => {
                        console.log('User added!');
                      });
                  }}>
                  <Text>{o.text}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }}></FlatList>
  );
}
