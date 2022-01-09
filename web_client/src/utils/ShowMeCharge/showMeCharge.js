const showMeCharge = (name_charge) => {
    switch(name_charge){
        case 'Delivery':
            return 'delivery';
        case 'Cajera/o':
            return 'cashier';
        case 'Atención al público':
            return 'publicAttention';
    }
}

export default showMeCharge