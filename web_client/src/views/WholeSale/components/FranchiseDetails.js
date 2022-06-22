import React from 'react'

const FranchiseDetails = ({ franchise }) => {
    return (
        (franchise) && (
            <div className="row">
                <div className="col-xl-4 offset-xl-1">
                    <label>Ciudad:  {franchise.city}</label>
                </div>
                <div className="col-xl-5 offset-xl-2">
                    <label>Franquiciado:  {franchise.name_manager}, {franchise.last_name_manager}</label>
                </div>
            </div>
        )
    )
}

export default FranchiseDetails