
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateRefresh } from '../../../actions/SalesActions';
import { updateFiltersFlavors } from '../../../actions/ChamberFlavorsDispatchActions';
import { updateAllElements, updateTableUp } from '../../../actions/TableUpDownActions';
import LoaderSpinner from '../../../common/LoaderSpinner';
import FlavorDispatchAmount from "./FlavorDispatchAmount";
import StockFlavorTable from "./StockFlavorTable";

const PORT = require('../../../config');

const ListFlavorsUp = (props) => {
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    let flavorValues = [];

    useEffect(() => {
        if (props.refresh) {
            props.updateFiltersFlavors([]);
            props.updateRefresh(false);
        }
        else if (props.flavorsDispatchFilters[0] && !props.refresh && props.flavorsDispatchFilters[0] !== 'all_flavors') {
            let filterFamilyFlavors = [];
            filterFamilyFlavors = props.allElements.filter((flavor) => ((!flavor.amount || flavor.amount === 0) && (flavor.family_flavor === parseInt(props.flavorsDispatchFilters[0]))));
            props.updateTableUp(filterFamilyFlavors);
        }
        else if ((props.refresh && props.flavorsDispatchFilters[0]) || (!props.flavorsDispatchFilters[0] && props.elementsTableDown.length === 0)) {
            Axios.get(`${PORT()}/api/activeFlavors`)
                .then(response => {
                    handlerLoadingSpinner();

                    let auxFlavors = [...response.data.Data];
                    auxFlavors.forEach(f => {
                        f.id_flavor = f.idFlavor;
                        delete f.idFlavor;
                    })

                    props.updateTableUp(auxFlavors);
                    props.updateAllElements(auxFlavors);
                    props.updateRefresh(false);
                })
                .catch(error => console.log(error))
        }
    }, [props.flavorsDispatchFilters, props.refresh]);


    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    return (
        <>
            {isLoadingSpinner && (
                <LoaderSpinner color="primary" description="Cargando..." />
            )}
            {(flavorValues = props.elementsTableUp.filter(() => true),
                flavorValues.length === 0 && !isLoadingSpinner
                    ?
                    <h4 className="row justify-content-center" style={{ color: '#C16100', width: '80%', textAlign: 'center' }}>No existen sabores con los filtros cargados o ya cargó todos los disponibles...</h4>
                    : !isLoadingSpinner && (
                        <div className="table-responsive">
                            <table className="table" style={{ display: 'block', height: '350px', overflow: 'auto' }}>
                                <thead>
                                    <tr>
                                        <th scope="col" className="bg-info" style={{ textAlign: 'center' }}>Sabor</th>
                                        <th scope="col" className="bg-info" style={{ textAlign: 'center', width: '200px' }}>Stock disponible</th>
                                        <th scope="col" className="bg-info" style={{ textAlign: 'center', width: '300px' }}>Cantidad (baldes)</th>
                                        <th scope="col" className="bg-info" style={{ textAlign: 'center', width: '200px' }}>Añadir</th>
                                    </tr>
                                </thead>
                                {props.refresh && props.elementsTableUp.map((element, i) => {
                                    <tbody key={i}>
                                        <tr>
                                            <td style={{ textAlign: 'center' }}>{element.name}</td>
                                            <StockFlavorTable flavor={element} />
                                            {/* <td style={{ textAlign: 'center' }}>{element.stock}</td> */}
                                            <FlavorDispatchAmount keyElement={i} />
                                            <td style={{ textAlign: 'center' }}>
                                                <button type="button" className="sendAdd" onClick={(e) => props.upload(element)}><FontAwesomeIcon icon={faPlus} /></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                })}
                                {!props.refresh && props.elementsTableUp.map((element, i) => {
                                    return (
                                        <tbody key={i}>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>{element.name}</td>
                                                <StockFlavorTable flavor={element} />
                                                {/* <td style={{ textAlign: 'center' }}>{element.stock}</td> */}
                                                <FlavorDispatchAmount keyElement={i} />
                                                <td style={{ textAlign: 'center' }}>
                                                    <button type="button" className="btn btn-light sendAdd" onClick={(e) => props.upload(element)}><FontAwesomeIcon icon={faPlus} /></button>
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
        allElements: state.allElements,
        elementsTableDown: state.elementsTableDown,
        refresh: state.refresh,
    }
}

const mapDispatchToProps = {
    updateFiltersFlavors,
    updateTableUp,
    updateAllElements,
    updateRefresh
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFlavorsUp);