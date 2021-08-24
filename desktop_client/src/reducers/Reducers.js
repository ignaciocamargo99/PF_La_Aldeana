import { combineReducers } from "redux"
import { flavorsDispatchDate, flavorsDispatchFilters, } from "./ChamberFlavorsDispatchReducer";

import { elementsTableUp, allElements, elementsTableDown } from "./TableUpDownReducer";

export default combineReducers({
    // Chamber flavors
    flavorsDispatchDate: flavorsDispatchDate,
    flavorsDispatchFilters: flavorsDispatchFilters,
    // Table Up-Down
    elementsTableUp: elementsTableUp,
    allElements: allElements,
    elementsTableDown: elementsTableDown


});