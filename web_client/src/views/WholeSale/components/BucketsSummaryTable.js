import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'

const BucketsSummaryTable = ({ category, flavors }) => {

    const amountOfBuckets = flavors.map(f => +f.amountToSell).reduce((aux, n) => aux + n, 0); 

    return (
        <div className='me-4'>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Baldes {category.name}</TableCell>
                            <TableCell>Precio Kg {category.name}</TableCell>
                            <TableCell>Peso Total Kg</TableCell>
                            <TableCell>Subotal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            <TableRow
                                key={category.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell >{amountOfBuckets}</TableCell>
                                <TableCell >$&nbsp;{category.price}</TableCell>
                                <TableCell align="center">X</TableCell>
                                <TableCell align="right">$&nbsp;X</TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default BucketsSummaryTable