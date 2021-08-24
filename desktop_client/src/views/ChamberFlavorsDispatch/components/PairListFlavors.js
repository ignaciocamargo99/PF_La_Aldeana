import React from 'react';
import { connect } from 'react-redux';
import { updateTableDown, updateTableUp } from '../../../actions/TableUpDownActions';
import warningMessage from '../../../utils/WarningMessages/warningMessage';
import ListFlavorsDown from './ListFlavorsDown';
import ListFlavorsUp from './ListFlavorsUp';

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
        if (i.amount > 0) {
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
        else return warningMessage('Atención', 'Ingrese un número válido para el sabor');
    }

    return (
        <>
            <ListFlavorsUp upload={upload} />
            <br />
            <ListFlavorsDown download={download} />
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