export default function getPermission(permission, access, index, reading) {
    let aux = '';
    let permissions = [];
    let stringPermission = [];

    if (reading) {
        permissions = permission.find((permission) => permission.id_permission === index + 1);
        if (permissions) {
            stringPermission = access.find(a => a.name_access === permissions.name_access);
            aux = stringPermission.name_access.toString();
        }
        else aux = 'No';
    }
    return aux;
}