import { combineReducers } from "redux"
import { nickReducer, passwordReducer, userReducer , permissionsReducer } from "./LoginReducers"
import { updateProductionDate, flavors, flavorQuantity } from "./FlavorReducers"


export default combineReducers({
    nick: nickReducer,
    password: passwordReducer,
    user: userReducer,
    permissions: permissionsReducer,
    updateProductionDate: updateProductionDate,
    flavors: flavors,
    flavorQuantity: flavorQuantity
})