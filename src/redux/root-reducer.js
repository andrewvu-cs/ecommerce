// will be the base reducer object, combines all the other states

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

// Accessing local storage
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

// only need to whitelist cart bc user is being handled by firebase
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer)