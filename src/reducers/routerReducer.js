const initialState = {
    path: '/'
};

export default function routerReducer(state=initialState, action) {

    switch (action.type) {
        case 'ROUTE': {
            return {...state, path: action.payload};
        }
        case '@@reactReduxFirebase/LOGIN': {
            return {...state, path: '/dashboard'}
        }
        case '@@reactReduxFirebase/LOGOUT' : {
            return {...state, path: '/'}
        }
        default: return state
    }
}