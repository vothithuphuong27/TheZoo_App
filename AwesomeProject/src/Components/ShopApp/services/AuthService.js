import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {get} from 'lodash';
import {Alert} from 'react-native';

function getProfile(uid) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Profiles')
      .doc(uid)
      .get()
      .then((documentSnapshot) => {
        resolve(documentSnapshot.data());
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function getCarts_id(uid) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('tempCarts')
      .doc(uid)
      .get()
      .then((documentSnapshot) => {
        resolve(documentSnapshot.data());
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function getAdress_id(uid) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('address')
      .doc(uid)
      .get()
      .then((documentSnapshot) => {
        resolve(documentSnapshot.data());
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function signIn(email, password) {
  return new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        // console.log(error);
        reject(error);
      });
  });
}
function signOut() {
  return new Promise((resolve, reject) => {
    if (auth().currentUser) {
      auth()
        .signOut()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    }
  });
}
function register(email, password, role, name) {
  return new Promise((resolve, reject) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        let uid = auth().currentUser.uid;
        auth().currentUser.updateProfile({displayName: name});
        // Update role
        firestore().collection('Profiles').doc(uid).set({
          role: role,
        });

        resolve('User account created');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          reject('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          reject('That email address is invalid!');
        }

        console.error(error);
        reject(error);
      });
  });
}
function updateInforProfile(infor, role) {
  return new Promise((resolve, reject) => {
    let uid = auth().currentUser.uid;
    // Update profile
    firestore()
      .collection('Profiles')
      .doc(uid)
      .set({
        name: infor.displayName,
        email: infor.email,
        imageUrl: infor.photoURL,
        role: role,
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });

    resolve('User account created');
  });
}

function updateProfile(name, image, phone) {
  return new Promise((resolve, reject) => {
    let uid = auth().currentUser.uid;
    auth()
      .currentUser.updateProfile({
        displayName: name,
        photoURL: image,
        phoneNumber: phone,
      })

      .then((result) => {
        resolve(auth().currentUser);
      });
    // Update role

    // resolve('User account created');
  });
}

function getNotifications() {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Notifications')
      .where('type', '==', 'public')
      .orderBy('createdTime', 'desc')
      .get()
      .then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((documentSnapshot) => {
          // console.log(documentSnapshot.data());
          const item = documentSnapshot.data();
          item.id = documentSnapshot.id;
          items.push(item);
        });

        resolve(items);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
function getStarRate() {
  return new Promise((resolve, reject) => {
    let uid = auth().currentUser.uid;
    // Update profile
    firestore()
      .collection('StarRate')
      .where('userId', '==', uid)
      .get()
      .then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((documentSnapshot) => {
          const item = documentSnapshot.data();
          item.id = documentSnapshot.id;
          items.push(item);
        });
        resolve(items);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function getComment_id(id, response) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('StarRate')
      .doc(id)
      .update({
        avatarUrl: response.photoURL,
        // Name: response.displayName,
      })
      .then(() => {
        resolve('image cmt updated!');
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function getMessageChatUser(name) {
  return new Promise((resolve, reject) => {
    let uid = auth().currentUser.uid;
    // let name = auth().currentUser.displayName;
    // console.log(name);
    firestore()
      .collection('Messages')
      .where('to', '==', uid)
      .where('username', '==', name)
      .get()
      .then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((documentSnapshot) => {
          const item = documentSnapshot.data();
          item.id = documentSnapshot.id;
          items.push(item);
        });
        console.log(items);
        resolve(items);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function getMessageChatAdmin(name) {
  return new Promise((resolve, reject) => {
    let uid = auth().currentUser.uid;
    // let name = auth().currentUser.displayName;
    // console.log(name);
    firestore()
      .collection('Messages')
      .where('from', '==', uid)
      .where('username', '==', name)
      .get()
      .then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((documentSnapshot) => {
          const item = documentSnapshot.data();
          item.id = documentSnapshot.id;
          items.push(item);
        });
        console.log(items);
        resolve(items);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
function UpdateUsernameChat_id(id, name) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Messages')
      .doc(id)
      .update({
        username: name,
        // Name: response.displayName,
      })
      .then(() => {
        resolve('image cmt updated!');
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function getFavorite_id(uid) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('productFavorite')
      .doc(uid)
      .get()
      .then((documentSnapshot) => {
        resolve(documentSnapshot.data());
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
function getPlayer_Id(id) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('PlayerId')
      .doc(id)
      .get()
      .then((documentSnapshot) => {
        resolve(documentSnapshot.data());
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
export default {
  signIn,
  getProfile,
  signOut,
  register,
  getCarts_id,
  getAdress_id,
  getNotifications,
  updateProfile,
  updateInforProfile,
  getStarRate,
  getComment_id,
  getMessageChatUser,
  getMessageChatAdmin,
  UpdateUsernameChat_id,
  getFavorite_id,
  getPlayer_Id,
};
