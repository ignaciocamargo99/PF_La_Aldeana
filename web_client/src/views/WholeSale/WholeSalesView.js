import React from 'react'
import WholeSalesViewBody from './WholeSalesViewBody'

const WholeSalesView = () => {
    return (
        <>
            <div className="viewTitle">
                <h1>Ventas Mayoristas</h1>
            </div>
            <div className="viewBody">
                <WholeSalesViewBody />
            </div>
        </>
    )
}

export default WholeSalesView