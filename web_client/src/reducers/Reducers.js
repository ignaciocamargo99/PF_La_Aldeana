import { combineReducers } from "redux"
import { nickReducer, passwordReducer, userReducer , permissionsReducer } from "./LoginReducers"
import { productionFlavorsReducer } from "./FlavorReducers"
import { dateReducer } from './DateReducers'


export default combineReducers({
    nick: nickReducer,
    password: passwordReducer,
    user: userReducer,
    permissions: permissionsReducer,
    date: dateReducer,
    productionFlavors: productionFlavorsReducer
}) 