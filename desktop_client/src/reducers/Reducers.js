import { combineReducers } from "redux"
import { location, menu } from "./MenuReducers"

export default combineReducers({
    location: location,
    menu: menu
})