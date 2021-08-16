import { combineReducers } from "redux"
import { nickReducer, passwordReducer, userReducer , permissionsReducer } from "./LoginReducers"
import { purchaseNumber, purchaseDate, purchaseSupplier, purchaseSupplies, purchaseQuantity, purchasePrice, purchaseSubtotal, purchaseTotal } from "./PurchaseSuppliesReducer"
import { nameSupply, descriptionSupply, singlePrice, multiplePrice, typeSupply, lotSupply, unitPerLotSupply, unitSupply } from "./SupplyReducers"
import { productionFlavorsReducer } from "./FlavorReducers"
import { dateReducer } from './DateReducers'

export default combineReducers({
    nick: nickReducer,
    password: passwordReducer,
    user: userReducer,
    permissions: permissionsReducer,
    purchaseNumber: purchaseNumber,
    purchaseDate: purchaseDate,
    purchaseSupplier: purchaseSupplier,
    purchaseSupplies: purchaseSupplies,
    purchaseQuantity: purchaseQuantity,
    purchasePrice: purchasePrice,
    purchaseSubtotal: purchaseSubtotal,
    purchaseTotal: purchaseTotal,
    date: dateReducer,
    productionFlavors: productionFlavorsReducer,
    nameSupply: nameSupply,
    descriptionSupply: descriptionSupply,
    singlePrice: singlePrice,
    multiplePrice: multiplePrice,
    typeSupply: typeSupply,
    lotSupply: lotSupply,
    unitPerLotSupply: unitPerLotSupply,
    unitSupply: unitSupply
})
