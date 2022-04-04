const isEmployeeFormDataValid = (data, isEditingEmployee) => {
    if (isEditingEmployee) {
        return isDataValid(data);
    }
    else {
        return isNewEmployeeDataValid(data);
    }
};

const isNewEmployeeDataValid = (data) => {
    return data.firstDayOffDate && isDataValid(data);
}

const isDataValid = (data) => {
    return data.charges?.length > 0 &&
        data.date &&
        data.dni &&
        data.dni.toString().length === 8 &&
        data.employment_relationship &&
        data.last_name &&
        data.name
};

export default isEmployeeFormDataValid;