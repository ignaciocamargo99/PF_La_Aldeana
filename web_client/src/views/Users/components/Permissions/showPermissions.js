let flag0 = false, flag1 = false, flag2 = false, flag3 = false, flag4 = false, flag5 = false, flag6 = false, flag7 = false;

export default function showPermissions(check, permission, index, typePermission, matrix) {

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
                matrix[0][0] = 1;
                flag0 = true;
            }
        }
        else {
            if (showPermission1.length === 0 && flag0 === false) check.current.disabled = true;
            else {
                showPermission2 = permission.find(element => element.name === "Ventas" && element.id_access === idAccess);
                if (showPermission2) {
                    check.current.checked = true;
                    showPermission2 = [];
                    if(idAccess === 1) matrix[0][1] = 1;
                    else if(idAccess === 2) matrix[0][2] = 1;
                    else if(idAccess === 3) matrix[0][3] = 1;
                    else if(idAccess === 4) matrix[0][4] = 1;
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
                matrix[1][0] = 1;
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
                    if(idAccess === 1) matrix[1][1] = 1;
                    else if(idAccess === 2) matrix[1][2] = 1;
                    else if(idAccess === 3) matrix[1][3] = 1;
                    else if(idAccess === 4) matrix[1][4] = 1;
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
                matrix[2][0] = 1;
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
                    if(idAccess === 1) matrix[2][1] = 1;
                    else if(idAccess === 2) matrix[2][2] = 1;
                    else if(idAccess === 3) matrix[2][3] = 1;
                    else if(idAccess === 4) matrix[2][4] = 1;
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
                matrix[3][0] = 1;
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
                    if(idAccess === 1) matrix[3][1] = 1;
                    else if(idAccess === 2) matrix[3][2] = 1;
                    else if(idAccess === 3) matrix[3][3] = 1;
                    else if(idAccess === 4) matrix[3][4] = 1;
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
                matrix[4][0] = 1;
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
                    if(idAccess === 1) matrix[4][1] = 1;
                    else if(idAccess === 2) matrix[4][2] = 1;
                    else if(idAccess === 3) matrix[4][3] = 1;
                    else if(idAccess === 4) matrix[4][4] = 1;
                    
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
                matrix[5][0] = 1;
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
                    if(idAccess === 1) matrix[5][1] = 1;
                    else if(idAccess === 2) matrix[5][2] = 1;
                    else if(idAccess === 3) matrix[5][3] = 1;
                    else if(idAccess === 4) matrix[5][4] = 1;
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
                matrix[6][0] = 1;
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
                    if(idAccess === 1) matrix[6][1] = 1;
                    else if(idAccess === 2) matrix[6][2] = 1;
                    else if(idAccess === 3) matrix[6][3] = 1;
                    else if(idAccess === 4) matrix[6][4] = 1;
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
                matrix[7][0] = 1;
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
                    if(idAccess === 1) matrix[7][1] = 1;
                    else if(idAccess === 2) matrix[7][2] = 1;
                    else if(idAccess === 3) matrix[7][3] = 1;
                    else if(idAccess === 4) matrix[7][4] = 1;
                }
            }
        }
    }
}