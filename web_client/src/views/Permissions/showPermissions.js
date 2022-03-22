
export default function showPermissions(check, permission, index, typePermission) {

    // Types permission
    //------------- N: NEW ------------ R: READ --------- E: EDIT -------- D: DELETE----------------
    let idAccess;
    if (typePermission === 'N') idAccess = 1;
    else if (typePermission === 'R') idAccess = 2;
    else if (typePermission === 'E') idAccess = 3;
    else if (typePermission === 'D') idAccess = 4;
    else if (typePermission === 'ED') idAccess = 5;


    let showPermission = [];

    if (index === 0) {
        if (idAccess === 5) {
            showPermission = permission.find(element => element.name === "Ventas")
            if (showPermission) {
                check.current.checked = true;
                showPermission = [];
            }
        }
        else {
            showPermission = permission.find(element => element.name === "Ventas" && element.id_access === idAccess)
            if (showPermission) {
                check.current.checked = true;
                showPermission = [];
            }
        }
    }
    else if (index === 1) {
        if (idAccess === 5) {
            showPermission = permission.find(element => element.name === "Compras")
            if (showPermission) {
                check.current.checked = true;
                showPermission = [];
            }
        }
        else {
            showPermission = permission.find(element => element.name === "Compras" && element.id_access === idAccess)
            if (showPermission) {
                check.current.checked = true;
                showPermission = [];
            }
        }

    }
    else if (index === 2) {
        if (idAccess === 5) {
            showPermission = permission.find(element => element.name === "Productos")
            if (showPermission) {
                check.current.checked = true;
                showPermission = [];
            }
        }
        else {
            showPermission = permission.find(element => element.name === "Productos" && element.id_access === idAccess)
            if (showPermission) {
                check.current.checked = true;
                showPermission = [];
            }
        }

    }
    else if (index === 3) {
        if (idAccess === 5) {
            showPermission = permission.find(element => element.name === "Producciones")
            if (showPermission) {
                check.current.checked = true;
                showPermission = [];
            }
        }
        else {
            showPermission = permission.find(element => element.name === "Producciones" && element.id_access === idAccess)
            if (showPermission) {
                check.current.checked = true;
                showPermission = [];
            }
        }

    }
    else if (index === 4) {
        if (idAccess === 5) {
            showPermission = permission.find(element => element.name === "Franquicias")
            if (showPermission) {
                check.current.checked = true;
                showPermission = [];
            }
        }
        else {
            showPermission = permission.find(element => element.name === "Franquicias" && element.id_access === idAccess)
            if (showPermission) {
                check.current.checked = true;
                showPermission = [];
            }
        }

    }
    else if (index === 5) {
        if (idAccess === 5) {
            showPermission = permission.find(element => element.name === "Reportes")
            if (showPermission) {
                check.current.checked = true;
                showPermission = [];
            }
        }
        else {
            showPermission = permission.find(element => element.name === "Reportes" && element.id_access === idAccess)
            if (showPermission) {
                check.current.checked = true;
                showPermission = [];
            }
        }

    }
    else if (index === 6) {
        if (idAccess === 5) {
            showPermission = permission.find(element => element.name === "Empleados")
            if (showPermission) {
                check.current.checked = true;
                showPermission = [];
            }
        }
        else{
            showPermission = permission.find(element => element.name === "Empleados" && element.id_access === idAccess)
            if (showPermission) {
                check.current.checked = true;
                showPermission = [];
            } 
        }
    }
    else if (index === 7) {
        if (idAccess === 5) {
            showPermission = permission.find(element => element.name === "Permisos")
            if (showPermission) {
                check.current.checked = true;
                showPermission = [];
            }
        }
        else {
            showPermission = permission.find(element => element.name === "Permisos" && element.id_access === idAccess)
            if (showPermission) {
                check.current.checked = true;
                showPermission = [];
            }
        }

    }
}