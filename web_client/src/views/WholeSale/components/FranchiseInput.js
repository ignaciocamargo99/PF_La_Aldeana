import { useGetFranchises } from 'hooks/useGetFranchises';
import React from 'react'

const FranchiseInput = ({ setSelectedFranchise }) => {
    const { franchises } = useGetFranchises();

    const onChangeFranchiseSelection = ({ target }) => {
        setSelectedFranchise(franchises?.find(element => +element.id_franchise === +target.value));
    }

    return (
        <div className="d-flex justify-content-between">
            <label className="align-self-center w-25" htmlFor="date" >Franquicia</label>
            <select defaultValue={-1} className="form-control align-self-center w-50 " onChange={onChangeFranchiseSelection}>
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
    )
}

export default FranchiseInput