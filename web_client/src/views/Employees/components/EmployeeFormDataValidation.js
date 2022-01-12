const isEmployeeFormDataValid = (data) => {
    return data.chargesIds?.length > 0 &&
        data.date &&
        data.dni &&
        data.dni.length === 8 &&
        data.employmentRelationshipId &&
        data.lastName &&
        data.nameEmployee
};

export default isEmployeeFormDataValid;