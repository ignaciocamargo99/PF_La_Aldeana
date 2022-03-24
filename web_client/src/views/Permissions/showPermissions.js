let flag0 = false, flag1 = false, flag2 = false, flag3 = false, flag4 = false, flag5 = false, flag6 = false, flag7 = false;

export default function showPermissions(check, permission, index, typePermission) {

    // Types permission
    //------------- N: NEW ------------ R: READ --------- E: EDIT -------- D: DELETE----------------
    let idAccess;
    if (typePermission === 'N') idAccess = 1;
    else if (typePermission === 'R') idAccess = 2;
    else if (typePermission === 'E') idAccess = 3;
    else if (typePermission === 'D') idAccess = 4;
    else if (typePermission === 'ED') idAccess = 5;


    let showPermission1 = [];
    let showPermission2 = [];

    if (index === 0) {
        if (idAccess === 5) {
            showPermission1 = permission.find(element => element.name === "Ventas");
            if (showPermission1) {
                check.current.checked = true;
                showPermission1 = [];
                flag0 = true;
            }
        }
        else {
            if (showPermission1.length === 0 && flag0 === false) check.current.disabled = true;
            else {
                showPermission2 = permission.find(element => element.name === "Ventas" && element.id_access === idAccess)
                if (showPermission2) {
                    check.current.checked = true;
                    showPermission2 = [];
                }
            }
        }

    }
    else if (index === 1) {
        if (idAccess === 5) {
            showPermission1 = permission.find(element => element.name === "Compras")
            if (showPermission1) {
                check.current.checked = true;
                showPermission1 = [];
                flag1 = true;
            }
        }
        else {
            if (showPermission1.length === 0 && flag1 === false) check.current.disabled = true;
            else {
                showPermission2 = permission.find(element => element.name === "Compras" && element.id_access === idAccess)
                if (showPermission2) {
                    check.current.checked = true;
                    showPermission2 = [];
                }
            }
        }
    }
    else if (index === 2) {
        if (idAccess === 5) {
            showPermission1 = permission.find(element => element.name === "Productos")
            if (showPermission1) {
                check.current.checked = true;
                showPermission1 = [];
                flag2 = true;
            }
        }
        else {
            if (showPermission1.length === 0 && flag2 === false) check.current.disabled = true;
            else {
                showPermission2 = permission.find(element => element.name === "Productos" && element.id_access === idAccess)
                if (showPermission2) {
                    check.current.checked = true;
                    showPermission2 = [];
                }
            }
        }
    }
    else if (index === 3) {
        if (idAccess === 5) {
            showPermission1 = permission.find(element => element.name === "Producciones")
            if (showPermission1) {
                check.current.checked = true;
                showPermission1 = [];
                flag3 = true;
            }
        }
        else {
            if (showPermission1.length === 0 && flag3 === false) check.current.disabled = true;
            else {
                showPermission2 = permission.find(element => element.name === "Producciones" && element.id_access === idAccess)
                if (showPermission2) {
                    check.current.checked = true;
                    showPermission2 = [];
                }
            }
        }
    }
    else if (index === 4) {
        if (idAccess === 5) {
            showPermission1 = permission.find(element => element.name === "Franquicias")
            if (showPermission1) {
                check.current.checked = true;
                showPermission1 = [];
                flag4 = true;
            }
        }
        else {
            if (showPermission1.length === 0 && flag4 === false) check.current.disabled = true;
            else {
                showPermission2 = permission.find(element => element.name === "Franquicias" && element.id_access === idAccess)
                if (showPermission2) {
                    check.current.checked = true;
                    showPermission2 = [];
                }
            }
        }
    }
    else if (index === 5) {
        if (idAccess === 5) {
            showPermission1 = permission.find(element => element.name === "Reportes")
            if (showPermission1) {
                check.current.checked = true;
                showPermission1 = [];
                flag5 = true;
            }
        }
        else {
            if (showPermission1.length === 0 && flag5 === false) check.current.disabled = true;
            else {
                showPermission2 = permission.find(element => element.name === "Reportes" && element.id_access === idAccess)
                if (showPermission2) {
                    check.current.checked = true;
                    showPermission2 = [];
                }
            }
        }
    }
    else if (index === 6) {
        if (idAccess === 5) {
            showPermission1 = permission.find(element => element.name === "Empleados")
            if (showPermission1) {
                check.current.checked = true;
                showPermission1 = [];
                flag6 = true;
            }
        }
        else {
            if (showPermission1.length === 0 && flag6 === false) check.current.disabled = true;
            else {
                showPermission2 = permission.find(element => element.name === "Empleados" && element.id_access === idAccess)
                if (showPermission2) {
                    check.current.checked = true;
                    showPermission2 = [];
                }
            }
        }
    }
    else if (index === 7) {
        if (idAccess === 5) {
            showPermission1 = permission.find(element => element.name === "Permisos")
            if (showPermission1) {
                check.current.checked = true;
                showPermission1 = [];
                flag7 = true;
            }
        }
        else {
            if (showPermission1.length === 0 && flag7 === false) check.current.disabled = true;
            else {
                showPermission2 = permission.find(element => element.name === "Permisos" && element.id_access === idAccess)
                if (showPermission2) {
                    check.current.checked = true;
                    showPermission2 = [];
                }
            }
        }
    }
}