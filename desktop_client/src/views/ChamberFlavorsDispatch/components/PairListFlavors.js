import React from 'react';
import { connect } from 'react-redux';
import { updateFlavors, updateFlavorsListDown } from '../../../actions/ChamberFlavorsDispatchActions';
import warningCountProduct from '../../../utils/WarningMessages/warningCountProduct';
import ListFlavorsDown from './ListFlavorsDown';
import ListFlavorsUp from './ListFlavorsUp';

const PairListFlavors = (props) => {

    const download = (i) => {
        let aux = [];
        let auxList = props.flavorsDispatch;
        props.flavorsListDownDispatch.map((e, j) => {
            if (j !== i) aux[j] = e;
            else {
                e.amount = 0;
                auxList[j] = e;
            }
        });
        props.updateFlavors(auxList);
        props.updateFlavorsListDown(aux);
        console.log(props.flavorsDispatch);
        console.log(props.flavorsListDownDispatch)
    }


    const upload = (i) => {
        if (props.flavorsDispatch[i].amount > 0) {
            let aux = [];
            let auxDestiny = props.flavorsListDownDispatch;
            props.flavorsDispatch?.map((e, j) => {
                if (j !== i) {
                    aux[j] = e;
                } else {
                    auxDestiny[j] = e;
                }
            });
            props.updateFlavors(aux);
            props.updateFlavorsListDown(auxDestiny);
            console.log(props.flavorsDispatch);
            console.log(props.flavorsListDownDispatch)
        }
        else return warningCountProduct();
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
        flavorsListDownDispatch: state.flavorsListDownDispatch,
        flavorsDispatch: state.flavorsDispatch
    }
}

const mapDispatchToProps = {
    updateFlavorsListDown,
    updateFlavors,
}

export default connect(mapStateToProps, mapDispatchToProps)(PairListFlavors);