import React, { useEffect , useRef, useState} from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { updateFlavors, addFlavorQuantity, removeFlavorQuantity, updateFlavorQuantity } from '../../../actions/FlavorActions';
import LoaderSpinner from '../../../common/LoaderSpinner';
import Buttons from '../../../common/Buttons';
//import BeShowed from '../../../common/BeShowed';
import TableFlavorsUp from './TableFlavorsUp';

const PORT = require('../../../config');

const FlavorsTable = (props) => {

    const [flavors,setFlavors] = useState([]);
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [ready, setReady] = useState(false);

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    useEffect(()=>{
        Axios.get( PORT() + '/api/flavors')
        .then((response) => {
            handlerLoadingSpinner();
            setFlavors(response.data);
        })
        .catch((err) => {
            console.log(err)
        })
    },[true === false])

    const upload = (id) => {
        let FlavorAdd = flavors.find(flavor => flavor.id_flavor == id);
        let aux = flavors.filter(flavor => flavor.id_flavor != id);
        setFlavors(aux);
        let auxDestiny = props.productionFlavors;
        auxDestiny = [...auxDestiny,FlavorAdd];
        props.updateFlavors(auxDestiny);
        props.addFlavorQuantity(0);
    }

    const download = (id,i) => {
        let FlavorRemove = props.productionFlavors.find(flavor => flavor.id_flavor == id);
        let auxDestiny = props.productionFlavors.filter(flavor => flavor.id_flavor != id);
        props.updateFlavors(auxDestiny);
        let aux = flavors;
        aux = [...flavors,FlavorRemove];
        setFlavors(aux);
        props.removeFlavorQuantity(i);
    }

    const cancelRegisterProduction = () => window.location.reload();

    const registerProduction = () => {
        
        /*
        try {
            if (ready) {
                Axios.post(PORT() + '/api/productions/new', {
                    dateProduction: dateProduc,
                    flavors: destinyTable
                })
                    .then(successMessage("Atención", "Producción Registrada", "success"))
                    .catch(err => console.error(err))
            }
            else throw new Error
        } 
        catch (Error) {
            console.log(Error);
        }

        setDestinyTable([]);
        */
    }

    



    return (
        <>
            {isLoadingSpinner && (
                <>
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <LoaderSpinner color = "primary" />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <label className="text-muted" style={{margin: '10px', padding: '10px 50px 50px 50px'}}>Cargando sabores...</label>
                        </div>
                    </div>
                </>
            )}

            {!isLoadingSpinner && (
                <>
                    <TableFlavorsUp flavors={flavors} upload={upload}></TableFlavorsUp>
                </>
            )}
                <Buttons label="Registrar" ready={ready} actionOK={registerProduction} actionNotOK={registerProduction} actionCancel={cancelRegisterProduction}></Buttons>     
        </>
    )

}

const mapStateToProps = state => {
    return {
        productionFlavors: state.productionFlavors,
        productionQuantity: state.productionQuantity
    }
}

const mapDispatchToProps = {
    updateFlavors, 
    addFlavorQuantity, 
    removeFlavorQuantity
}

export default connect(mapStateToProps, mapDispatchToProps)(FlavorsTable);
