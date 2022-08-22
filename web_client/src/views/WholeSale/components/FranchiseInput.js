import { useGetFranchises } from 'hooks/useGetFranchises';
import React from 'react'
import DisabledLabelInput from './DisabledLabelInput';

const FranchiseInput = ({ wholesaleFranchise, setWholesaleFranchise, read }) => {

    const { franchises } = useGetFranchises();

    const onChangeFranchiseSelection = ({ target }) => {
        const franchiseSelected = franchises?.find(element => +element.id_franchise === +target.value);
        setWholesaleFranchise(franchiseSelected);
    }

    return (
        <>
            <div className="d-flex justify-content-between mb-2">
                <label className="align-self-center w-25 fs-6" htmlFor="franchiseSelect" >Franquicia</label>
                {read && (
                    <select readOnly defaultValue={wholesaleFranchise.id_franchise} id="franchiseSelect" className="form-control align-self-center w-50 fs-6">
                        <option disabled value={wholesaleFranchise.id_franchise}>{wholesaleFranchise.name}.</option>
                    </select>
                )}
                {!read && (
                    <select defaultValue={-1} id="franchiseSelect" className="form-control align-self-center w-50 fs-6" onChange={onChangeFranchiseSelection}>
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
                )}
            </div>
            <DisabledLabelInput name={'Ciudad'} value={wholesaleFranchise?.city} />
            <DisabledLabelInput name={'Franquiciado'} value={wholesaleFranchise ? `${wholesaleFranchise.last_name_manager}, ${wholesaleFranchise.name_manager}` : ''} />
        </>
    )
}

export default FranchiseInput