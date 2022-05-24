
export default function validationRouters(route, accesses) {

    // Products
    let pathsToReadProducts = ['/app/products', '/app/productTypes', '/app/supplies'];
    let pathsToReadRegisterProducts = ['/app/registerProducts', '/app/registerProductTypes', '/app/supplies/new'].concat(pathsToReadProducts);

    // Production
    let pathsToReadProductions = ['/app/productions', '/app/flavors', '/app/flavors/view'];
    let pathsToReadRegisterProductions = ['/app/production', '/app/flavors/new'].concat(pathsToReadProductions);

    // Franchises
    let pathsToReadFranchises = ['/app/franchises'];
    let pathsToReadRegisterFranchises = ['/app/newFranchise'].concat(pathsToReadFranchises);

    // Sales Report
    let pathsToAllReportsSale = ['/app/salesReport', '/app/productSalesReport'];

    // RRHH Report
    let pathsToAllReportsRRHH = ['/app/RRHHReport'];

    // Purchases
    // let pathsToReadPurchases;
    let pathsToReadRegisterPurchases = ['/app/purchaseSupplies'];

    // Employees
    let pathsToReadEmployees = ['/app/employees', '/app/licenses', '/app/assistanceEmployees', '/app/advances', '/app/employeesSchedules', '/app/salary'];
    let pathsToReadRegisterEmployees = ['/app/registerEmployees', '/app/registerAssistance', '/app/registerAdvances'].concat(pathsToReadEmployees);

    // Users
    let pathToReadUsers = ['/app/users'];
    let pathToReadRegisterUsers = ['/app/registerUser'].concat(pathToReadUsers);

    const stringContainsNumber = (_string) => /\d/.test(_string);

    if (pathsToReadRegisterProducts.indexOf(route) !== -1) {
        if (accesses[3] === 1 && pathsToReadProducts.indexOf(route) === -1) return false
        else if ((accesses[3] === 2 || accesses[3] === 3) && pathsToReadRegisterProducts.indexOf(route) === -1) return false
        else if (!accesses[3]) return false;
        else return true;
    }
    else if (pathsToReadRegisterProductions.includes(route.substring(0, 17)) && stringContainsNumber(route)) {
        if (accesses[4] === 1 || accesses[4] === 2 || accesses[4] === 3) return true;
        else return false;
    }

    else if (pathsToReadRegisterProductions.includes(route.substring(0, 12)) && stringContainsNumber(route)) {
        if (accesses[4] === 3) return true;
        else return false;
    }

    else if (pathsToReadRegisterProductions.includes(route.substring(0, 17)) && stringContainsNumber(route)) {
        if (accesses[4] === 1 || accesses[4] === 2 || accesses[4] === 3) return true;
        else return false;
    }

    else if (pathsToReadRegisterProductions.indexOf(route) !== -1) {
        if (accesses[4] === 1 && pathsToReadProductions.indexOf(route) === -1) return false;
        else if ((accesses[4] === 2 || accesses[4] === 3) && pathsToReadRegisterProductions.indexOf(route) === -1) return false;
        else if (!accesses[4]) return false;
        else return true;
    }
    else if (pathsToReadRegisterFranchises.indexOf(route) !== -1) {
        if (accesses[5] === 1 && pathsToReadFranchises.indexOf(route) === -1) return false;
        else if ((accesses[5] === 2 || accesses[5] === 3) && pathsToReadRegisterFranchises.indexOf(route) === -1) return false;
        else if (!accesses[5]) return false;
        else return true;

    }
    else if (pathsToAllReportsSale.indexOf(route) !== -1) {
        if ((accesses[6] === 2 || accesses[6] === 3 || accesses[6] === 1) && pathsToAllReportsSale.indexOf(route) === -1) return false;
        else if (!accesses[6]) return false;
        else return true;

    }
    else if (pathsToAllReportsRRHH.indexOf(route) !== -1) {
        if ((accesses[1] === 2 || accesses[1] === 3 || accesses[1] === 1) && pathsToAllReportsRRHH.indexOf(route) === -1) return false;
        else if (!accesses[1]) return false;
        else return true;

    }
    else if (pathsToReadRegisterPurchases.indexOf(route) !== -1) {
        if ((accesses[2] === 1) && pathsToReadRegisterPurchases.indexOf(route) === -1) return false;
        else if (!accesses[2]) return false;
        else return true;

    }
    else if (pathsToReadRegisterEmployees.indexOf(route) !== -1) {
        if (accesses[7] === 1 && pathsToReadEmployees.indexOf(route) === -1) return false;
        else if ((accesses[7] === 2 || accesses[5] === 3) && pathsToReadRegisterEmployees.indexOf(route) === -1) return false;
        else if (!accesses[7]) return false;
        else return true;
    }
    else if (pathToReadRegisterUsers.indexOf(route) !== -1) {
        if (accesses[8] === 1 && pathToReadUsers.indexOf(route) === -1) return false;
        else if ((accesses[8] === 2 || accesses[5] === 3) && pathToReadRegisterUsers.indexOf(route) === -1) return false;
        else if (!accesses[8]) return false;
        else return true;
    }
}