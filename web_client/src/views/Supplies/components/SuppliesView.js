import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BeShowed from 'common/BeShowed';
import LoaderSpinner from 'common/LoaderSpinner';
import React, { useState, useEffect } from 'react'
import { useGetSupplies } from '../customHooks/useGetSupplies';
import { assembleColumnHeaders } from '../customHooks/assembleColumnHeaders';
import { useReadEditSupplies } from '../customHooks/useReadEditSupplies';
import TablePagination from './TablePagination/TablePagination';
import ReadSupplies from './ReadSupplies/ReadSupplies';
import EditSupplies from './EditSupplies/EditSupplies';

const SuppliesView = ({ permissionsAccess }) => {
    const columnsHeaders = assembleColumnHeaders();
    /* Destructuring the object returned by the useGetProductTypes() hook. */
    const { loadingSupplies, supplies } = useGetSupplies();
    /* A custom hook that is used to read and edit a product type. */
    const [elementToDo, setElementToDo] = useState();
    const [action, setAction] = useState('');
    const { supplyToDo } = useReadEditSupplies(elementToDo, action);

    const [listSupplies, setListSupplies] = useState();
    useEffect(() => { setListSupplies(supplies) }, [supplies])

    const deleteSupply = (i) => {
        let aux = [];
        listSupplies?.forEach((e, j) => {
            if (j !== i) {
                aux[j] = e;
            }
        });
        setListSupplies(aux);
    };

    const handleNewSupplyBtnClicked = () => window.location.replace('/app/supplies/new');

    const goBackToTable = () => {
        <div style={{ display: 'none' }}>{document.title = "Insumos"}</div>
        setAction('')
        window.scrollTo(0, 0);
    }

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Insumos"}</div>
            {loadingSupplies &&
                <LoaderSpinner color="primary" loading="Cargando..." />
            }
            {(!loadingSupplies && action === '') &&
                <>
                    <div className="viewTitleBtn">
                        <h1>Insumos</h1>
                        <BeShowed show={permissionsAccess === 2 || permissionsAccess === 3}>
                            <button onClick={handleNewSupplyBtnClicked} type="button" className="btn btn-light newBtn">
                                <FontAwesomeIcon icon={faPlus} /> Nuevo
                            </button>
                        </BeShowed>
                        <BeShowed show={permissionsAccess === 1}>
                            <button disabled type="button" className="disabledNewBtn">
                                <FontAwesomeIcon icon={faPlus} /> Nuevo
                            </button>
                        </BeShowed>
                    </div>

                    <div className="viewBody">
                        {listSupplies && listSupplies?.length > 0
                            ?
                            <TablePagination
                                columnsHeaders={columnsHeaders}
                                currentElements={listSupplies}
                                handleRead={(supply) => { setAction('R'); setElementToDo(supply) }}
                                handleEdit={(supply) => { setAction('E'); setElementToDo(supply) }}
                                handleDelete={deleteSupply}
                                permissionsAccess={permissionsAccess}
                            />
                            :
                            <h4 className="row justify-content-center" style={{ color: '#C16100', padding: '0 auto' }}>
                                No se encontraron insumos registrados...
                            </h4>
                        }
                    </div>
                </>
            }
            {action === 'R' && <ReadSupplies onClickCancelRead={goBackToTable} supplyToRead={supplyToDo} />}
            {action === 'E' && <EditSupplies onClickCancelEdit={goBackToTable} supplyToEdit={supplyToDo} />}
        </>
    )
}

export default SuppliesView
