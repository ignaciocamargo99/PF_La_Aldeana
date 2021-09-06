//Actions
export const toRoot = () =>{
    return{
        type: 'TO_ROOT',
        payload: 0
    }
}

export const toChamberFlavorsDispatch = () =>{
    return{
        type: 'TO_CHAMBER_FLAVORS_DISPATCH',
        payload: 1
    }
}

export const toRegisterAttendance = () =>{
    return{
        type: 'TO_REGISTER_ATTENDANCE',
        payload: 2
    }
}

export const lockMenu = () =>{
    return{
        type: 'LOCK_MENU',
        payload: true
    }
}

export const unlockMenu = () =>{
    return{
        type: 'UNLOCK_MENU',
        payload: false
    }
}