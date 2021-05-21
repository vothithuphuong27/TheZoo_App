import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';

function createOrder(order) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Orders')
      .add(order)
      .then((ref) => {
        // OK
        // TODO: Send a email to customers (THANK YOU)
        // TODO: Send notification to call center
        ref
          .get()
          .then((documentSnapshot) => {
            let createdOrder = documentSnapshot.data();
            createdOrder.id = documentSnapshot.id;
            console.log(createdOrder);
            resolve(createdOrder);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
function createStarRate(starRate) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('StarRate')
      .add(starRate)
      .then((ref) => {
        // OK
        // TODO: Send a email to customers (THANK YOU)
        // TODO: Send notification to call center
        ref
          .get()
          .then((documentSnapshot) => {
            let createStarRate = documentSnapshot.data();
            createStarRate.id = documentSnapshot.id;
            // console.log(createdOrder);
            resolve(createStarRate);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
function AddAddress(order) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('address')
      .add(order)
      .then((ref) => {
        // OK
        // TODO: Send a email to customers (THANK YOU)
        // TODO: Send notification to call center
        ref
          .get()
          .then((documentSnapshot) => {
            let createdOrder = documentSnapshot.data();
            createdOrder.id = documentSnapshot.id;
            console.log(createdOrder);
            resolve(createdOrder);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function saveTempcart(order) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('tempCarts')
      .add(order)
      .then((ref) => {
        // OK
        // TODO: Send a email to customers (THANK YOU)
        // TODO: Send notification to call center
        ref
          .get()
          .then((documentSnapshot) => {
            console.log(documentSnapshot);
            let uid = auth().currentUser.uid;
            let createdOrder = documentSnapshot.data();
            createdOrder.id = uid;
            resolve(createdOrder);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
function CreateCategory(nameCategory, imageCategory) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Categories')
      .doc(nameCategory)
      .set({
        imageUrl: imageCategory,
        name: nameCategory,
      })
      .then(() => {
        resolve('category added successfully!');
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export default {
  createOrder,
  saveTempcart,
  AddAddress,
  createStarRate,
  CreateCategory,
};
