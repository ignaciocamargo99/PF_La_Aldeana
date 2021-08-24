
import React, { useState, useEffect } from 'react';
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';
import { connect } from 'react-redux';
import { updateFlavorsListDown, updateFlavors, } from '../../../actions/ChamberFlavorsDispatchActions';

const PORT = require('../../../config');

const ListFlavorsDown = (props) => {

    return (
        <>
            <h2>Productos que salen de cámara:</h2>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}>Sabor</th>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center', width: '300px' }}>Cantidad</th>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center', width: '200px' }}>Eliminar</th>
                        </tr>
                    </thead>
                    {props.flavorsListDownDispatch.length > 0 && props.flavorsListDownDispatch.map((element, i) => {
                        return(
                        <tbody key={i}>
                            <tr>
                                <td style={{ textAlign: 'center' }}>{element.name}</td>
                                <td style={{ textAlign: 'center' }}>{element.amount}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <button type="button" className="btn btn-info btn-sm px-3" onClick={(e) => props.download(i)}><FontAwesomeIcon icon={faMinus} /></button>
                                </td>
                            </tr>
                        </tbody>
                    )})}
                </table>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        flavorsListDownDispatch: state.flavorsListDownDispatch,
        flavorsDispatch: state.flavorsDispatch
    }
}

const mapDispatchToProps = {
    updateFlavorsListDown,
    updateFlavors
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFlavorsDown);