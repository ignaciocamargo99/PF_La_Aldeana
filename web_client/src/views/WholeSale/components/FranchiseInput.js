import { useGetFranchises } from 'hooks/useGetFranchises';
import React from 'react'

const FranchiseInput = ({ wholesaleFranchise, setWholesaleFranchise }) => {

    console.log('FranchiseInput');

    const { franchises } = useGetFranchises();

    const onChangeFranchiseSelection = ({ target }) => {
        const franchiseSelected = franchises?.find(element => +element.id_franchise === +target.value);
        setWholesaleFranchise(franchiseSelected);
    }

    return (
        <>
            <div className="d-flex justify-content-between mb-2">
                <label className="align-self-center w-25 fs-6" htmlFor="date" >Franquicia</label>
                <select defaultValue={-1} className="form-control align-self-center w-50 fs-6" onChange={onChangeFranchiseSelection}>
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
            <div className="d-flex justify-content-between mb-2">
                <label className="align-self-center w-25 fs-6" htmlFor="date" >Ciudad</label>
                <input
                    className="form-control align-self-center w-50 fs-6"
                    defaultValue={wholesaleFranchise?.city}
                    disabled
                >
                </input>
            </div>
            <div className="d-flex justify-content-between mb-2">
                <label className="align-self-center w-25 fs-6" htmlFor="date" >Franquiciado</label>
                <input
                    className="form-control align-self-center w-50 fs-6"
                    defaultValue={wholesaleFranchise ? `${wholesaleFranchise.name_manager}, ${wholesaleFranchise.last_name_manager}` : ''}
                    disabled
                >
                </input>
            </div>
        </>
    )
}

export default FranchiseInput