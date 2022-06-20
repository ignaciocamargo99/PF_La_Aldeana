import React from 'react'

const FranchiseDetails = ({ franchise }) => {
    return (
        (franchise) && (
            <div className="d-flex justify-content-between mb-2">
                <div className="align-self-center w-25" />
                <div className="align-self-center w-50">
                    <p className="mb-1 mt-2"> - Ciudad:  {franchise.city}</p>
                    <p className="mb-1 mt-1"> - Franquiciado:  {franchise.name_manager}, {franchise.last_name_manager}</p>
                </div>
            </div>
        )
    )
}

export default FranchiseDetails