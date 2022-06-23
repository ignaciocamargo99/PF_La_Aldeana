
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { updateFiltersFlavors } from '../../../actions/ChamberFlavorsDispatchActions';
import { updateTableUp } from '../../../actions/TableUpDownActions';
import BeShowed from '../../../common/BeShowed';
import toFilterFlavors from './toFilterFlavors';

const PORT = require('../../../config');

const ListFlavors = (props) => {
    const [familyFlavor, setFamilyFlavor] = useState();
    const [boolSearchNameFlavor, setBoolSearchNameFlavor] = useState();
    const [boolFamilyFlavor, setBoolFamilyFlavor] = useState();
    const [nameSearch, setNameSearch] = useState('');
    const [selectFamilyFlavor, setSelectFamilyFlavor] = useState();
    const inputSearchNameFlavor = useRef(null);
    const inputFamilyFlavor = useRef(null);

    useEffect(() => {
        Axios.get(`${PORT()}/api/familyFlavors`)
            .then(response => setFamilyFlavor(response.data))
            .catch(error => console.error(error))
    }, []);

    useEffect(() => {
        if (props.refresh) {
            setBoolFamilyFlavor(false);
            setBoolSearchNameFlavor(false);
            inputSearchNameFlavor.current.checked = false;
            inputFamilyFlavor.current.checked = false;
        }
    }, [props.refresh]);

    const handlerOnChangeSearchNameFlavor = () => {
        if (inputSearchNameFlavor.current.checked) {
            let filterFlavorsWithDownList = [];
            setBoolSearchNameFlavor(true);
            setBoolFamilyFlavor(false);
            props.updateFiltersFlavors([]);
            // Filter without repeating what was loaded in the ListFlavorsDown
            filterFlavorsWithDownList = props.allElements.filter((flavor) => (!flavor.amount || flavor.amount === 0));
            props.updateTableUp(filterFlavorsWithDownList);
        }
        else setBoolFamilyFlavor(false);
    }

    const handlerOnChangeFamilyFlavor = () => {
        if (inputFamilyFlavor.current.checked === true) {
            let filterFlavorsWithDownList = [];
            setBoolFamilyFlavor(true);
            setBoolSearchNameFlavor(false);
            // Filter without repeating what was loaded in the ListFlavorsDown
            filterFlavorsWithDownList = props.allElements.filter((flavor) => (!flavor.amount || flavor.amount === 0));
            props.updateTableUp(filterFlavorsWithDownList);
        }
        else setBoolFamilyFlavor(false);
    }

    useEffect(() => {
        // Filter without repeating what was loaded in the ListFlavorsDown
        let filterFlavorsWithDownList = [];
        filterFlavorsWithDownList = props.allElements.filter((flavor) => (!flavor.amount || flavor.amount === 0));
        toFilterFlavors(nameSearch, props.elementsTableUp, filterFlavorsWithDownList, props.updateTableUp);
    }, [nameSearch]);

    const onChangeFamilyProduct = (e) => {
        if (e.target.value === "all_flavors") {
            setSelectFamilyFlavor(e.target.value);
            let filterFlavorsWithDownList = [];
            filterFlavorsWithDownList = props.allElements.filter((flavor) => (!flavor.amount || flavor.amount === 0));
            props.updateTableUp(filterFlavorsWithDownList);
        }
        setSelectFamilyFlavor(e.target.value);
        props.updateFiltersFlavors(e.target.value)
    }

    useEffect(() => {
        if (selectFamilyFlavor === 'all_flavors') {
            let filters = [selectFamilyFlavor];
            props.updateFiltersFlavors(filters);
        }
    }, [selectFamilyFlavor]);

    const handleChangeName = (e) => setNameSearch(e.target.value);

    return (
        <>
            <h4>Filtrar por:</h4>
            <div className="form-radio-group formRow">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="radio_searchNameFlavor" ref={inputSearchNameFlavor} onChange={handlerOnChangeSearchNameFlavor} />
                    <label className="form-check-label" htmlFor="radio_searchNameFlavor">Nombre de sabor</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="radio_flavorFamily" ref={inputFamilyFlavor} onChange={handlerOnChangeFamilyFlavor} />
                    <label className="form-check-label" htmlFor="radio_flavorFamily">Familia de sabores</label>
                </div>
            </div>
            <BeShowed show={boolSearchNameFlavor}>
                <div className="formRow title-searcher">
                    <div className="search-input">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"
                                    id="inputGroup-sizing-default"
                                    style={{ height: '100%' }}
                                >
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
                            </div>
                            <input type="text"
                                className="form-control"
                                placeholder="Buscar por nombre..."
                                onChange={(e) => handleChangeName(e)}
                                aria-describedby="inputGroup-sizing-default"
                                style={{ width: '490px' }}
                            />
                        </div>
                    </div>
                </div>
            </BeShowed>
            <BeShowed show={boolFamilyFlavor}>
                <select className="form-combo-btn" id="selectTypeProduct" onChange={e => onChangeFamilyProduct(e)}>
                    <option value="all_flavors">Todos los sabores</option>
                    {
                        familyFlavor?.map((element, i) => (
                            <option key={i} value={element.id_family_flavor}>{element.name}</option>
                        ))
                    }
                </select>
                <br />
            </BeShowed>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        flavorsDispatchFilters: state.flavorsDispatchFilters,
        elementsTableUp: state.elementsTableUp,
        allElements: state.allElements,
        refresh: state.refresh
    }
}

const mapDispatchToProps = {
    updateFiltersFlavors,
    updateTableUp
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFlavors);