
import { combineReducers } from "redux"
import { nickReducer, passwordReducer, userReducer , permissionsReducer } from "./LoginReducers"
import { nameSupply, descriptionSupply, singlePrice, multiplePrice, typeSupply, lotSupply, unitPerLotSupply, unitSupply, deliverySupply, franchiseSupply } from "./SupplyReducers"

export default combineReducers({
    nick: nickReducer,
    password: passwordReducer,
    user: userReducer,
    permissions: permissionsReducer,
    nameSupply: nameSupply,
    descriptionSupply: descriptionSupply,
    singlePrice: singlePrice,
    multiplePrice: multiplePrice,
    typeSupply: typeSupply,
    lotSupply: lotSupply,
    unitPerLotSupply: unitPerLotSupply,
    unitSupply: unitSupply,
    deliverySupply: deliverySupply,
    franchiseSupply: franchiseSupply
})