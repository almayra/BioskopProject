import {combineReducers} from 'redux'
import Authreducers from './authReducer'

export default combineReducers({
    Auth:Authreducers
})