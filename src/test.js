// Just a test file to test firebase database

import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users').doc('GJ08WNlFPONMO2XsQMvV').collection('cartItems').doc('GJ08WNlFPONMO2XsQMvV');
firestore.doc('/users/GJ08WNlFPONMO2XsQMvV/cartItems/GJ08WNlFPONMO2XsQMvV');
firestore.collection('/users/GJ08WNlFPONMO2XsQMvV/cartItems');