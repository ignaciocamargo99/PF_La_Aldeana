const EmploymentRelationshipModel = require('../database/models/employmentRelationshipModel');

class EmploymentRelationshipRepository {
    getEmploymentRelationshipDBByID = (idEmploymentRelationship) => {
        return EmploymentRelationshipModel.findOne({
            where: {
                id_employee_relationship: idEmploymentRelationship
            },
        });
    };

}

module.exports = new EmploymentRelationshipRepository();
