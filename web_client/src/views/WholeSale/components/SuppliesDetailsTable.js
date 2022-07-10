import React from 'react'
import { faMinusCircle, faPlusCircle, faTrashRestore } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import calculateSupplySubtotal from './calculateSupplySubtotal'

const SuppliesDetailsTable = ({ supplies, handleRemoveSupply, modifySupplyAmountToSell }) => {
    return (
        <div className='me-4 mb-4'>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell ></TableCell>
                            <TableCell align="center">Stock</TableCell>
                            <TableCell align="center">Precio</TableCell>
                            <TableCell align="center">Cantidad   </TableCell>
                            <TableCell align="center">Subtotal insumo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {supplies.map((s) => {
                            const subtotalSupply = calculateSupplySubtotal(s);

                            return (
                                <TableRow
                                    key={s.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <FontAwesomeIcon className='icon-fa-pointer' icon={faTrashRestore} onClick={() => handleRemoveSupply(s)} />
                                    </TableCell>
                                    <TableCell >{s.name}</TableCell>
                                    <TableCell align="center">
                                        {s.stock_unit}
                                    </TableCell>
                                    <TableCell align="center">
                                        {s.price_wholesale}
                                    </TableCell>
                                    <TableCell align="center">
                                        <div className='ps-2 pe-2 d-flex justify-content-between'>
                                            <FontAwesomeIcon className='icon-fa-pointer text-la-aldeana-violeta' icon={faMinusCircle} onClick={() => modifySupplyAmountToSell(s, -1)} />
                                            &nbsp;
                                            {s.amountToSell}
                                            &nbsp;
                                            <FontAwesomeIcon className='icon-fa-pointer text-la-aldeana-violeta' icon={faPlusCircle} shake='true' onClick={() => modifySupplyAmountToSell(s, 1)} />
                                        </div>
                                    </TableCell>
                                    <TableCell align="center">
                                        $&nbsp;{subtotalSupply}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default SuppliesDetailsTable