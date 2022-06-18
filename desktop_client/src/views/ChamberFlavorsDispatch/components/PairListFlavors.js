import React from 'react';
import { connect } from 'react-redux';
import { updateTableDown, updateTableUp } from '../../../actions/TableUpDownActions';
import warningMessage from '../../../utils/WarningMessages/warningMessage';
import ListFlavorsDown from './ListFlavorsDown';
import ListFlavorsUp from './ListFlavorsUp';
import Buttons from '../../../common/Buttons';

const PairListFlavors = (props) => {

    const download = (i) => {
        let aux = [];
        let auxList = props.elementsTableUp;
        props.elementsTableDown.forEach((e, j) => {
            if (j !== i) aux.push(e);
            else {
                e.amount = 0;
                auxList.push(e);
            }
        });
        // Update states of redux...
        props.updateTableUp(auxList);
        props.updateTableDown(aux);
    }

    const upload = (i) => {
        if (i.amount > 0 && i.stock >= i.amount) {
            let aux = [];
            let auxDestiny = props.elementsTableDown;
            props.elementsTableUp.forEach((e, j) => {
                if (i.id_flavor !== e.id_flavor) aux[j] = e;
                else auxDestiny.push(e);
            });
            // Update states of redux...
            props.updateTableUp(aux);
            props.updateTableDown(auxDestiny);
        }
        else return warningMessage('Atención', 'Ingrese un número válido para el sabor (recuerde que la cantidad que sale no puede ser mayor al stock disponible en la cámara)');
    }

    return (
        <>
        <div className="row">
            <div className="col-6">
            <h4 className="text-secondary">Helados disponibles:</h4>
            </div>
            <div className="col-6">
            <h4 className="text-secondary">Helados que salen de cámara:</h4>
            </div>
        </div>
        <div className="row">
            <div className="col-6">
                <ListFlavorsUp upload={upload} />
            </div>
            <div className="col-6">
                <ListFlavorsDown download={download} />
            </div>
        </div>

        </>
    );

}

const mapStateToProps = (state) => {
    return {
        elementsTableUp: state.elementsTableUp,
        elementsTableDown: state.elementsTableDown
    }
}

const mapDispatchToProps = {
    updateTableUp,
    updateTableDown
}

export default connect(mapStateToProps, mapDispatchToProps)(PairListFlavors);