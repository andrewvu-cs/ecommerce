// reducer is a function that gets two props, state and an action

// we set up an initial state, just like a constructor when we set up this.state
const INITIAL_STATE = {
    currentUser: null
}

// when we first fire our app, redux doesn't know what state it is in
// ES6 can set parameters to equal something
const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_CURRENT_USER':
            return{
                ...state,
                currentUser: action.payload
            }

        default:
            return state;
    }
}

export default userReducer;