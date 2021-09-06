import { combineReducers } from "redux"
import { flavorsDispatchDate, flavorsDispatchFilters, } from "./ChamberFlavorsDispatchReducer";
import { productsReducer, productsFilteredReducer, detailProductsReducer, payTypeReducer, totalAmountReducer, productSelectedReducer, refreshReducer} from "./SalesReducers";
import { location, menu } from "./MenuReducers"
import { elementsTableUp, allElements, elementsTableDown } from "./TableUpDownReducer";

export default combineReducers({
    products: productsReducer,
    productsFiltered: productsFilteredReducer,
    detailProducts: detailProductsReducer,
    payType: payTypeReducer,
    totalAmount: totalAmountReducer,
    productSelected: productSelectedReducer,
    refresh: refreshReducer,
    //Menu
    location: location,
    menu: menu,
    // Chamber flavors
    flavorsDispatchDate: flavorsDispatchDate,
    flavorsDispatchFilters: flavorsDispatchFilters,
    // Table Up-Down
    elementsTableUp: elementsTableUp,
    allElements: allElements,
    elementsTableDown: elementsTableDown
})

