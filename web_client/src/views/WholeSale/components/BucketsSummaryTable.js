import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import validateFloatNumbers from 'utils/validateFloatNumbers';

const BucketsSummaryTable = ({
    category,
    flavors,
    handleWeightChange,
    weight,
}) => {

    const amountOfBuckets = flavors.map(f => +f.amountToSell).reduce((aux, n) => aux + n, 0);

    const [subtotal, setSubtotal] = useState(0)

    useEffect(() => {
        setSubtotal(weight * category.price);
    }, [weight, category])

    return (
        <div className='me-4'>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Baldes {category.name}</TableCell>
                            <TableCell>Precio Kg {category.name}</TableCell>
                            <TableCell>Peso Total Kg</TableCell>
                            <TableCell>Subtotal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            key={category.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell >{amountOfBuckets}</TableCell>
                            <TableCell >$&nbsp;{category.price}</TableCell>
                            <TableCell align="center">
                                <input
                                    style={{ maxWidth: '5em' }}
                                    type='number'
                                    value={weight}
                                    onChange={(e) => handleWeightChange(category, +e.target.value)}
                                    onKeyDown={(e) => validateFloatNumbers(e)}
                                />
                            </TableCell>
                            <TableCell align="right">$&nbsp;{subtotal}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default BucketsSummaryTable