import errorNameFranchise from "../ErrorMessages/errorNameFranchise";

export default function validationProductRegister(data) {
    const name = data.name;

    try {

        if (name === "") errorNameFranchise();

    }

    catch (e) {
    }
}