import { combineReducers } from 'redux';

import user from './userReducer';
import location from './locationReducer';

export default combineReducers({
    user,
    location
});