
export default function productionData(user) {
    let aux = {
        id_user: user.id_user,
        nick_user : user.nick_user,
        first_name : user.first_name,
        last_name : user.last_name,
    }
    return aux;
}