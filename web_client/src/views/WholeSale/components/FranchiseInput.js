import React from 'react'

const FranchiseInput = ({ franchises, setSelectedFranchise }) => {
    const onChangeFranchiseSelection = ({ target }) => {
        setSelectedFranchise(franchises?.find(element => +element.id_franchise === +target.value));
    }

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="date" >Franquicia*</label>
            </div>
            <div className="form-control-input-mw-50">
                <select defaultValue={-1} className="form-control" onChange={onChangeFranchiseSelection}>
                    <option disabled value='-1'>Seleccione una franquicia...</option>
                    {franchises?.map((f) => {
                        return (
                            <option
                                key={f.id_franchise}
                                value={f.id_franchise}
                            >
                                {f.name}
                            </option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export default FranchiseInput