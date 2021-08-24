
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateFiltersFlavors } from '../../../actions/ChamberFlavorsDispatchActions';
import { updateAllElements, updateTableUp } from '../../../actions/TableUpDownActions';
import LoaderSpinner from '../../../common/LoaderSpinner';
import FlavorDispatchAmount from "./FlavorDispatchAmount";

const PORT = require('../../../config');

const ListFlavorsUp = (props) => {
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    let flavorValues = [];

    useEffect(() => {
        if (props.flavorsDispatchFilters[0]) {
            let filterFamilyFlavors = [];
            filterFamilyFlavors = props.allElements.filter((flavor) => ((!flavor.amount || flavor.amount === 0) && (flavor.family_flavor == props.flavorsDispatchFilters[0])));
            props.updateTableUp(filterFamilyFlavors);
        }
        else {
            Axios.get(`${PORT()}/api/allFlavors`)
                .then(response => {
                    handlerLoadingSpinner();
                    props.updateTableUp(response.data);
                    props.updateAllElements(response.data);
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
            {(flavorValues = props.elementsTableUp.filter(() => true),
                flavorValues.length === 0 && !isLoadingSpinner
                    ? <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No existen sabores con los filtros cargados o ya cargó todos los disponibles...</h4>
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
                                {props.elementsTableUp.map((element, i) => {
                                    return (
                                        <tbody key={i}>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>{element.name}</td>
                                                <FlavorDispatchAmount keyElement={i} />
                                                <td style={{ textAlign: 'center' }}>
                                                    <button type="button" className="btn btn-info btn-sm px-3" onClick={(e) => props.upload(element)}><FontAwesomeIcon icon={faPlus} /></button>
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
        elementsTableUp: state.elementsTableUp,
        allElements: state.allElements
    }
}

const mapDispatchToProps = {
    updateFiltersFlavors,
    updateTableUp,
    updateAllElements
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFlavorsUp);