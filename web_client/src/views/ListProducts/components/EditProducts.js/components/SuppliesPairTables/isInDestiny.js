export default function isInDestiny (j, destiny) {
    let res=false

    destiny?.map((e, i) => {
        console.log(e.id_supply == j.id_supply)
        if (e.id_supply == j.id_supply) {
            j.amount = e.number_supply;
            res = true;
        }
    })

    return res;
}