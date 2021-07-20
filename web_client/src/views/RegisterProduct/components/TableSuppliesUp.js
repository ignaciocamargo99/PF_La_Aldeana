import { useState, useEffect } from 'react';
import Table from "../../../common/Table/Table";
import HeaderTable from '../../../common/Table/HeaderTable';
import BodyTable from '../../../common/Table/BodyTable';
import BeShowed from '../../../common/BeShowed';

const styles = (theme) => ({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    table: {
        // temporary right-to-left patch, waiting for
        // https://github.com/bvaughn/react-virtualized/issues/454
        '& .ReactVirtualized__Table__headerRow': {
            flip: false,
            paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
        },
    },
    tableRow: {
        cursor: 'pointer',  
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
    },
    noClick: {
        cursor: 'initial',
    },
});

function TableSuppliesUp (props){

    const [visibleQuantity, setVisibleQuantity] = useState(false);


    const upload = (id) => {
    }
    

    useEffect(() => {
        let amount = 0;

        props.supplies.map((elemento) => {
            if (elemento.cantidad_stock > 0) {
                amount += 1;
            }
        });
        setVisibleQuantity(amount > 0);
    });

    return (
        <>
            <BeShowed show={!visibleQuantity && props.isLoadingSpinner === false}>
                <label className="text-muted">No existen más productos en el catálogo para seleccionar...</label>
            </BeShowed>
            <BeShowed show={visibleQuantity}>
              <Table style={styles}>
                    <HeaderTable
                        th={
                            <>
                                <th style={{ textAlign: 'center' }} scope="col" className="bg-info">Nombre</th>
                                <th style={{ textAlign: 'center',width:'150px' }} scope="col" className="bg-info">Acción</th>
                            </>
                        }
                    />
                    <BodyTable
                        tbody={props.supplies.map((elemento, i) => {
                            return (
                                <tbody key={i}>
                                    <tr>
                                        <td style={{ textAlign: 'center' }}>{elemento.name}</td>
                                        <td style={{ textAlign: 'center' }}>
                                        <button type="button" className="btn btn-primary" onClick={(e) => upload(elemento.id_supply)}>+</button>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })
                        }
                    />                
                </Table>
            </BeShowed>
        </>
    );
}

export default TableSuppliesUp;