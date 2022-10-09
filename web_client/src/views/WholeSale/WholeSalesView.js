import React from 'react'
import WholeSalesViewBody from './WholeSalesViewBody'

const WholeSalesView = ({user}) => {
    return (
        <>
            <div className="viewTitle">
                <h1>Registrar Venta Mayorista</h1>
            </div>
            <div className="viewBody">
                <WholeSalesViewBody user={user}/>
            </div>
        </>
    )
}

export default WholeSalesView