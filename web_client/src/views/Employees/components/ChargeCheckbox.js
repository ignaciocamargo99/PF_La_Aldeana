import React, { useState, useEffect } from "react";

const ChargeCheckbox = ({ chargeId, chargeName, checkedCheckbox = false, employeeData, updateEmployeeData }) => {
    const [chargeChecked, setChargeChecked] = useState(checkedCheckbox);

    const handleChargeClicked = (e) => {
        setChargeChecked(e.target.checked);
    };

    useEffect(() => {
        if (chargeChecked) {
            addChargeToEmployee(employeeData);
        }
        else {
            removeChargeToEmployee(employeeData)
        }

        updateEmployeeData(employeeData);

    }, [chargeChecked]);

    const addChargeToEmployee = (empData) => {
        const chargeAlreadyExistent = empData.charges?.find(c => +c.chargeId === +chargeId);

        if (!chargeAlreadyExistent) {
            if (!empData.charges) {
                empData.charges = [];
            };

            empData.charges.push({
                chargeId: +chargeId,
                chargeName: chargeName
            });
        };
    };

    const removeChargeToEmployee = (empData) => {
        if (empData?.charges) {
            empData.charges = empData.charges.filter((c) => {
                return +c.chargeId !== +chargeId;
            });
        };
    };

    return (
        <>
            <input
                checked={chargeChecked}
                className="form-check-input"
                id={chargeId}
                onChange={handleChargeClicked}
                type="checkbox"
            >
            </input>
            <label
                className="form-check-label"
                htmlFor={chargeId}
            >
                {chargeName}
            </label>
            <br />
        </>
    )
};

export default ChargeCheckbox;
