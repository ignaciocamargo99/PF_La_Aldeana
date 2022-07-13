import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ItemSummary from './ItemSummary';

const CardSummary = ({
    subtotalFlavors,
    subtotalSupplies,
    subtotalTransport,
    total,
}) => {

    return (
        <Card className="d-flex p-2 flex-column justify-content-between" style={{ minWidth: '20em' }}>
            <CardContent>
                <ItemSummary name='Sabores' value={subtotalFlavors} />
                <ItemSummary name='Insumos' value={subtotalSupplies} />
                <ItemSummary name='Flete' value={subtotalTransport} />
                <hr />
                <div className="d-flex justify-content-between fs-4 fw-bold">
                    <label>Total</label>
                    <label>$&nbsp;{total}</label>
                </div>
            </CardContent>
            <CardActions className="align-self-end">
                <button type="button" className="btn btn-light">Guardar</button>
                <button type="button" className="btn bg-la-aldeana-violeta text-white">Finalizar</button>
            </CardActions>
        </Card>
    )
}

export default CardSummary