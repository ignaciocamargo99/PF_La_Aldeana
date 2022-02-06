const showMeCharge = (name_charge) => {
    switch(name_charge){
        case 'Delivery':
            return 'delivery';
        case 'Cajera/o':
            return 'cashier';
        case 'Dependiente de Mostrador':
            return 'publicAttention';
        case 'Producción':
            return 'production';
        default:
            return;
    }
}

export default showMeCharge