
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import { connect } from 'react-redux';
import { updateTableDown } from '../../../actions/TableUpDownActions';

const ListFlavorsDown = (props) => {

    return (
        (props.elementsTableDown.length > 0 ?

            <>
                <div className="table-responsive">
                    <table className="table" style={{ display: 'block', height: '350px', overflow: 'auto' }}>
                        <thead>
                            <tr>
                                <th scope="col" className="bg-info" style={{ textAlign: 'center', width: '400px'}}>Sabor</th>
                                <th scope="col" className="bg-info" style={{ textAlign: 'center', width: '200px' }}>Cantidad (baldes)</th>
                                <th scope="col" className="bg-info" style={{ textAlign: 'center', width: '200px' }}>Eliminar</th>
                            </tr>
                        </thead>
                        {props.elementsTableDown.length > 0 && props.elementsTableDown.map((element, i) => {
                            return (
                                <tbody key={i}>
                                    <tr>
                                        <td style={{ textAlign: 'center' }}>{element.name}</td>
                                        <td style={{ textAlign: 'center' }}>{element.amount}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <button type="button" className="btn btn-light sendDelete" onClick={(e) => props.download(i)}><FontAwesomeIcon icon={faMinus} /></button>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </div>
            </>
            :
            <h4 className="row justify-content-center" style={{ color: '#C16100', width:'80%', textAlign: 'center' }}>No cargó helados que salen de cámara aún...</h4>
        
    )

    );
}

const mapStateToProps = (state) => {
    return {
        elementsTableDown: state.elementsTableDown
    }
}

const mapDispatchToProps = {
    updateTableDown,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFlavorsDown);