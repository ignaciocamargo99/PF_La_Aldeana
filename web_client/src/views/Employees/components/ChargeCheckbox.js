import React, { useEffect, useState } from "react";

const ChargeCheckbox = ({ chargeId, chargeName, employeeData, updateEmployeeData }) => {
    const [chargeChecked, setChargeChecked] = useState(false);

    const handleChargeClicked = (e) => {
        setChargeChecked(e.target.checked);
    };

    useEffect(() => {
        if (employeeData.editing) {
            checkIfEmployeeHasThisCharge(employeeData);
        }
    });

    useEffect(() => {
        manageChargeForEmployee();
    });

    const checkIfEmployeeHasThisCharge = (empData) => {
        const employeeHasThisCharge = empData.charges.find((c) => {
            return +c.chargeId === +chargeId
        });

        if (employeeHasThisCharge) {
            markCheckboxAsChecked();
        };
    };

    const markCheckboxAsChecked = () => {
        setChargeChecked(true);
    }

    const manageChargeForEmployee = () => {
        if (chargeChecked) {
            addChargeToEmployee(employeeData);
        }
        else {
            removeChargeToEmployee(employeeData)
        }

        updateEmployeeData(employeeData);
    };

    const addChargeToEmployee = (empData) => {
        const chargeAlreadyExistent = empData.chargesIds?.find(c => +c === +chargeId);

        if (!chargeAlreadyExistent) {
            if (!empData.chargesIds) {
                empData.chargesIds = [];
            };

            empData.chargesIds.push(+chargeId);
        };
    };

    const removeChargeToEmployee = (empData) => {
        if (empData?.chargesIds) {
            empData.chargesIds = empData.chargesIds.filter((c) => {
                return +c !== +chargeId;
            });
        };
    };

    return (
        <>
            <input
                className="form-check-input"
                id={chargeId}
                checked={chargeChecked}
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
