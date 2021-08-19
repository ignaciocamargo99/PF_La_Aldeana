
import React, { useState, useEffect } from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';
import { connect } from 'react-redux';
import { updateFiltersFlavors } from '../../../actions/ChamberFlavorsDispatchActions';

const PORT = require('../../../config');

const ListFlavors = (props) => {
    const [flavors, setFlavors] = useState();

    useEffect(() => {
        Axios.get(`${PORT()}/api/flavors?type_flavor=${props.flavorsDispatchFilters[0]}&family_flavor=${props.flavorsDispatchFilters[1]}`)
            .then(response => setFlavors(response.data))
            .catch(error => console.error(error))
    }, [props.flavorsDispatchFilters]);


    return (
        <>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}>Sabor</th>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center', width: '300px' }}>Cantidad</th>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center', width: '200px' }}>Añadir</th>
                        </tr>
                    </thead>
                    {flavors?.map((element, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td style={{ textAlign: 'center' }}>{element.name}</td>
                                    <td style={{ textAlign: 'center' }}><input type="number" className="form-control-amount" placeholder="0" min="0"></input></td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button type="button" className="btn btn-info btn-sm px-3"><FontAwesomeIcon icon={faPlus} /></button>
                                    </td>
                                </tr>
                            </tbody>

                        )
                    })}
                </table>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        flavorsDispatchFilters: state.flavorsDispatchFilters
    }
}

const mapDispatchToProps = {
    updateFiltersFlavors
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFlavors);