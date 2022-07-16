import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import validateFloatNumbers from 'utils/validateFloatNumbers';
import calculateCategorySubtotal from './calculateCategorySubtotal';

const BucketsSummaryTable = ({
    category,
    flavors,
    handleWeightChange,
    weight,
}) => {

    const amountOfBuckets = flavors.map(f => +f.amountToSell).reduce((aux, n) => aux + n, 0);

    const [subtotal, setSubtotal] = useState(0)

    useEffect(() => {
        setSubtotal(calculateCategorySubtotal(weight, category.price));
    }, [weight, category])

    return (
        <div className='me-4'>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell className='fs-6'>Baldes {category.name}</TableCell>
                            <TableCell className='fs-6'>Precio Kg {category.name}</TableCell>
                            <TableCell className='fs-6'>Peso Total Kg</TableCell>
                            <TableCell className='fs-6'>Subtotal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            key={category.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell className='fs-6'>{amountOfBuckets}</TableCell>
                            <TableCell className='fs-6'>$&nbsp;{category.price}</TableCell>
                            <TableCell className='fs-6' align="center">
                                <input
                                    style={{ maxWidth: '5em' }}
                                    type='number'
                                    value={weight}
                                    onChange={(e) => handleWeightChange(category, +e.target.value)}
                                    onKeyDown={(e) => validateFloatNumbers(e)}
                                />
                            </TableCell>
                            <TableCell className='fs-6' align="right">$&nbsp;{subtotal}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default BucketsSummaryTable