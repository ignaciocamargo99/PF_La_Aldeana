
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateFiltersFlavors, updateFlavors, updateAllFlavors } from '../../../actions/ChamberFlavorsDispatchActions';
import LoaderSpinner from '../../../common/LoaderSpinner';
import FlavorDispatchAmount from "./FlavorDispatchAmount";

const PORT = require('../../../config');

const ListFlavorsUp = (props) => {
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    let flavorValues = [];

    useEffect(() => {
        if (props.flavorsDispatchFilters[0]) {
            Axios.get(`${PORT()}/api/flavors/${props.flavorsDispatchFilters[0]}`)
                .then(response => {
                    handlerLoadingSpinner();
                    props.updateFlavors(response.data)
                })
                .catch(error => console.log(error))
        }
        else {
            Axios.get(`${PORT()}/api/flavors`)
                .then(response => {
                    handlerLoadingSpinner();
                    props.updateFlavors(response.data);
                    props.updateAllFlavors(response.data);
                })
                .catch(error => console.log(error))
        }
    }, [props.flavorsDispatchFilters]);

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    return (
        <>
            {isLoadingSpinner && (
                <LoaderSpinner color="primary" description="Cargando sabores. Aguarde..." />
            )}
            {(flavorValues = props.flavorsDispatch.filter(() => true),
                flavorValues.length === 0 && !isLoadingSpinner
                    ? <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No existen sabores con los filtros cargados...</h4>
                    : !isLoadingSpinner && (
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" className="bg-info" style={{ textAlign: 'center' }}>Sabor</th>
                                        <th scope="col" className="bg-info" style={{ textAlign: 'center', width: '300px' }}>Cantidad</th>
                                        <th scope="col" className="bg-info" style={{ textAlign: 'center', width: '200px' }}>Añadir</th>
                                    </tr>
                                </thead>
                                {props.flavorsDispatch?.map((element, i) => {
                                    return (
                                        <tbody key={i}>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>{element.name}</td>
                                                <FlavorDispatchAmount keyElement={i} />
                                                <td style={{ textAlign: 'center' }}>
                                                    <button type="button" className="btn btn-info btn-sm px-3" onClick={(e) => props.upload(i)}><FontAwesomeIcon icon={faPlus} /></button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </table>
                        </div>
                    ))}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        flavorsDispatchFilters: state.flavorsDispatchFilters,
        flavorsDispatch: state.flavorsDispatch
    }
}

const mapDispatchToProps = {
    updateFiltersFlavors,
    updateFlavors,
    updateAllFlavors
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFlavorsUp);