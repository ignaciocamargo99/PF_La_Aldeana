import { combineReducers } from "redux"
import { nickReducer, passwordReducer, userReducer , permissionsReducer } from "./LoginReducers"
import { purchaseNumber, purchaseDate, purchaseSupplier, purchaseSupplies, purchaseQuantity } from "./PurchaseSuppliesReducer"

export default combineReducers({
    nick: nickReducer,
    password: passwordReducer,
    user: userReducer,
    permissions: permissionsReducer,
    purchaseNumber: purchaseNumber,
    purchaseDate: purchaseDate,
    purchaseSupplier: purchaseSupplier,
    purchaseSupplies: purchaseSupplies,
    purchaseQuantity: purchaseQuantity
})