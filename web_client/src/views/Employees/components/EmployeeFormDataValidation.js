const isEmployeeFormDataValid = (data) => {
    return data.charges?.length > 0 &&
        data.date &&
        data.dni &&
        data.dni.toString().length === 8 &&
        data.employment_relationship &&
        data.last_name &&
        data.name
};

export default isEmployeeFormDataValid;