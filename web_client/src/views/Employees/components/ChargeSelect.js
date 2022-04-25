import React from "react";

const ChargeSelect = ({ formData, allCharges, updateFormData, disableSelect = false }) => {

    const handleChargeSelectedChanged = ({ target }) => {
        const newChargeId = +target.value;
        const newCharge = searchChargeById(newChargeId);
        const newChargeMappedd = {
            chargeId: newCharge.id_charge,
            chargeName: newCharge.name,
        }

        const updatedFormData = { ...formData };
        updatedFormData.charges = [newChargeMappedd]

        updateFormData(updatedFormData)
    }

    const searchChargeById = (id) => {
        return { ...allCharges.find(c => +c.id_charge === +id) }
    }

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="employeeCharge" >Cargo*</label>
            </div>
            <div className="form-control-input">
                <select className="form-control"
                    value={formData.charges.length > 0 ? formData.charges[0].chargeId : -1}
                    disabled={disableSelect}
                    onChange={handleChargeSelectedChanged}
                >
                    <option disabled value='-1'>Seleccione cargo...</option>
                    {allCharges?.map((c, i) => {
                        return (
                            <option
                                key={c.id_charge}
                                value={c.id_charge}
                            >
                                {c.name}
                            </option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}
// const ChargeSelect = ({ defaultCharge, allCharges, updateCharge, disableSelect = false }) => {

//     // #region hooks

//     const initializeSelectedCharge = () => {
//         if (defaultCharge && defaultCharge.length > 0) {
//             // take first charge. Employees must have one charge
//             return defaultCharge[0].chargeId;
//         }
//         return -1;
//     };

//     const [selectedCharge, setSelectedCharge] = useState(initializeSelectedCharge());

//     // #endregion

//     const handleChargeSelectedChanged = ({ target }) => {
//         setSelectedCharge(target.value);
//     }

//     return (
//         <div className="formRow">
//             <div className="form-control-label">
//                 <label htmlFor="employeeCharge" >Cargo*</label>
//             </div>
//             <div className="form-control-input">
//                 <select className="form-control"
//                     value={selectedCharge}
//                     disabled={disableSelect}
//                     onChange={handleChargeSelectedChanged}
//                 >
//                     <option disabled value='-1'>Seleccione cargo...</option>
//                     {allCharges?.map((c, i) => {
//                         return (
//                             <option
//                                 key={c.id_charge}
//                                 value={c.id_charge}
//                             >
//                                 {c.name}
//                             </option>
//                         )
//                     })}
//                 </select>
//             </div>
//         </div>
//     )
// }

export default ChargeSelect