const initialState = {
    path: '/'
};

export default function routerReducer(state=initialState, action) {

    switch (action.type) {
        case 'ROUTE': {
            return {...state, path: action.payload};
        }
        default: return state
    }
}