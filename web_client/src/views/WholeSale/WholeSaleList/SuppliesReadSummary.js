import React from 'react'

const SuppliesReadSummary = ({ suppliesWholesale, subtotalSupplies }) => {

    const suppliesSelected = suppliesWholesale?.length > 0;

    return (
        <div>
            <h3>Insumos</h3>
            {!suppliesSelected && (
                <label className='text-black-50'>&nbsp;{'0 insumos vendidos'}</label>
            )}
            {suppliesSelected && (
                suppliesWholesale.map(s => {
                    const supplyDetailDescrip = `${s.quantity}x ${s.name} ($${s.subtotal / s.quantity}/unidad)`;
                    const supplyDetailSubtotal = `${s.subtotal}`;

                    return (
                        <div className='d-flex justify-content-between text-black-50'>
                            <label>&nbsp;{supplyDetailDescrip}</label>
                            <label>$&nbsp;{supplyDetailSubtotal || '0'}</label>
                        </div>
                    )
                })
            )}
            <div className={`d-flex justify-content-between`}>
                <label>Subtotal</label>
                <label>$&nbsp;{subtotalSupplies || '0'}</label>
            </div>
        </div>
    )
}

export default SuppliesReadSummary