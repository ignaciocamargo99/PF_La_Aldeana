import { combineReducers } from "redux"
import { nickReducer, passwordReducer, userReducer , permissionsReducer } from "./LoginReducers"
import { productionFlavorsReducer } from "./FlavorReducers"
import { dateReducer } from './DateReducers'
import { nameSupply, descriptionSupply, singlePrice, multiplePrice, typeSupply, lotSupply, unitPerLotSupply, unitSupply } from "./SupplyReducers"
import { purchaseNumber, purchaseDate, purchaseSupplier, purchaseSupplies, purchaseQuantity, purchasePrice, purchaseSubtotal, purchaseTotal } from "./PurchaseSuppliesReducer"
import { dateTo, dateFrom, productSales, topTenProductSales, typeProductSales } from "./ReportsReducers"

export default combineReducers({
    nick: nickReducer,
    password: passwordReducer,
    user: userReducer,
    permissions: permissionsReducer,
    date: dateReducer,
    productionFlavors: productionFlavorsReducer,
    nameSupply: nameSupply,
    descriptionSupply: descriptionSupply,
    singlePrice: singlePrice,
    multiplePrice: multiplePrice,
    typeSupply: typeSupply,
    lotSupply: lotSupply,
    unitPerLotSupply: unitPerLotSupply,
    unitSupply: unitSupply,
    purchaseNumber: purchaseNumber,
    purchaseDate: purchaseDate,
    purchaseSupplier: purchaseSupplier,
    purchaseSupplies: purchaseSupplies,
    purchaseQuantity: purchaseQuantity,
    purchasePrice: purchasePrice,
    purchaseSubtotal: purchaseSubtotal,
    purchaseTotal: purchaseTotal,
    dateTo: dateTo,
    dateFrom: dateFrom,
    productSales: productSales,
    topTenProductSales: topTenProductSales,
    typeProductSales: typeProductSales
})
