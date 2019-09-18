import ShopActionTypes from "./shop.types";

import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

// Thunks are action creators that returns a function that gets the dispatch similar to mapDispatchToProps
// function that returns a dispatch

// if redux-thunk middleware is enabled, anytime I attempt to dispatch a function instead of an object, 
// the middleware will call that function with dispatch method itself as the first argument.

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
    // PRIME EXAMPLE OF THUNK
  return dispatch => {
    const collectionRef = firestore.collection("collections");

    // redux thunk allows this
    dispatch(fetchCollectionsStart());
    // Promise pattern
    collectionRef
      .get()
      .then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => dispatch(fetchCollectionsFailure(error.message)));
  };
};
