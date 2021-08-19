
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateFiltersFlavors, updateFlavors } from '../../../actions/ChamberFlavorsDispatchActions';

const PORT = require('../../../config');

const ListFlavorsUp = (props) => {

    useEffect(() => {
        if (props.flavorsDispatchFilters[0]) {
            Axios.get(`${PORT()}/api/flavors/${props.flavorsDispatchFilters[0]}`)
                .then(response => props.updateFlavors(response.data))
                .catch(error => console.error(error))
        }
        else {
            Axios.get(`${PORT()}/api/flavors`)
                .then(response => props.updateFlavors(response.data))
                .catch(error => console.error(error))
        }
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
                    {props.flavorsDispatch?.map((element, i) => {
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
        flavorsDispatchFilters: state.flavorsDispatchFilters,
        flavorsDispatch: state.flavorsDispatch
    }
}

const mapDispatchToProps = {
    updateFiltersFlavors,
    updateFlavors
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFlavorsUp);