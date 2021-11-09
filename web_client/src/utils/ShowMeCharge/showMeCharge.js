const showMeCharge = (idCharge) => {
    switch(idCharge){
        case 1:
            return 'delivery';
        case 2:
            return 'cashier';
        case 3:
            return 'publicAttention';
    }
}

export default showMeCharge