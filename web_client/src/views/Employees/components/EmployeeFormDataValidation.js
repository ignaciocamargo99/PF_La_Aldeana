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
        data.cuil &&
        data.cuil.toString().length === 11 &&
        data.phone &&
        data.phone.toString().length === 10 &&
        data.employment_relationship &&
        data.last_name &&
        data.birthday &&
        data.city &&
        data.street &&
        data.number &&
        data.number.toString().length <= 5 &&
        data.name &&
        data.nickname
};

export default isEmployeeFormDataValid;