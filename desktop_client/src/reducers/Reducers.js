import { combineReducers } from "redux"
import { flavorsDispatchDate, flavorsDispatchFilters, } from "./ChamberFlavorsDispatchReducer";
import { location, menu } from "./MenuReducers"
import { elementsTableUp, allElements, elementsTableDown } from "./TableUpDownReducer";

export default combineReducers({
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
});
