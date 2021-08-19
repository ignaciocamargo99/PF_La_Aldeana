
import React, { useState, useEffect } from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';
import { connect } from 'react-redux';
import { updateFiltersFlavors } from '../../../actions/ChamberFlavorsDispatchActions';

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
                            <th scope="col" className="bg-info" style={{ textAlign: 'center', width: '200px' }}>Añadir</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'center' }}>Hola</td>
                            <td style={{ textAlign: 'center' }}>3</td>
                            <td style={{ textAlign: 'center' }}>
                                <button type="button" className="btn btn-info btn-sm px-3"><FontAwesomeIcon icon={faPlus} /></button>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </>
    );
}

export default ListFlavorsDown;