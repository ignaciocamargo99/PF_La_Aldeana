import { faMinusCircle, faPlusCircle, faTrashRestore } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'

const BucketsTable = ({ flavors, handleRemoveFlavor, modifyFlavorAmountToSell }) => {

    return (
        <div className='me-4 mb-4'>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell ></TableCell>
                            <TableCell align="right">Stock&nbsp;(Baldes)</TableCell>
                            <TableCell align="right">Cantidad&nbsp;(Baldes)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {flavors.map((f) => (
                            <TableRow
                                key={f.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <FontAwesomeIcon className='icon-fa-pointer' icon={faTrashRestore} onClick={() => handleRemoveFlavor(f)} />
                                </TableCell>
                                <TableCell >{f.name}</TableCell>
                                <TableCell align="center">
                                    {f.stock}
                                </TableCell>
                                <TableCell align="center">
                                    <div className='ps-2 pe-2 d-flex justify-content-between'>
                                        <FontAwesomeIcon className='icon-fa-pointer text-la-aldeana-violeta' icon={faMinusCircle} onClick={() => modifyFlavorAmountToSell(f, -1)} />
                                        &nbsp;
                                        {f.amountToSell}
                                        &nbsp;
                                        <FontAwesomeIcon className='icon-fa-pointer text-la-aldeana-violeta' icon={faPlusCircle} shake='true' onClick={() => modifyFlavorAmountToSell(f, 1)} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default BucketsTable