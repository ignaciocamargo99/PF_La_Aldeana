import axios from "axios";
import UploadByName from "common/UploadByName";
import { groupBy } from "utils/groupBy";
import { useEffect, useRef, useState } from "react";

const PORT = require('../../config');

const WholeSale = () => {

    const [franchises, setFranchises] = useState(null);
    const [flavors, setFlavors] = useState(null);
    const [detailFlavors, setDetailFlavors] = useState(null);
    const [selectedFranchise, setSelectedFranchise] = useState(null);
    const inputDate = useRef();

    useEffect(() => {
        getFranchises();
        getFlavors();
    }, [])

    const getFranchises = () => {
        axios.get(`${PORT()}/api/franchises`)
            .then((res) => {
                setSelectedFranchise(res.data[0]);
                setFranchises(res.data);
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const getFlavors = () => {
        axios.get(`${PORT()}/api/flavors`)
            .then((res) => {
                console.log(res.data)
                setFlavors(res.data);
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const uploadFlavor = (id) => {
        let auxFlavors = flavors.filter(flavor => flavor.id_flavor !== id);
        let flavorToAdd = flavors.find(flavor => flavor.id_flavor === id);
        let auxDetailFlavors = detailFlavors ? detailFlavors.slice() : [];
        auxDetailFlavors.push(flavorToAdd);
        auxDetailFlavors[auxDetailFlavors.length - 1].quantity = 0;
        setFlavors(auxFlavors);
        setDetailFlavors(auxDetailFlavors);
    }

    return (
        <div className="container-fluid">
            <div className="viewTitle">
                <h1>Ventas mayoristas</h1>
            </div>
            <div className="viewBody">
                <div className="row justify-content-end">
                    <input type="date" className="form-control" style={{ width: '10rem' }} ref={inputDate} />
                </div>
                <div className="row align-items-center">
                    <div className="col-xl-3">
                        <label className="form-control-label">Franquicia:</label>
                    </div>
                    <div className="col-xl-9">
                        <select class="form-control" onChange={(e) => { setSelectedFranchise(JSON.parse(e.target.selectedOptions[0].value)) }}>
                            {franchises?.map((franchise) => {
                                return (<option key={franchise.id_franchise} value={JSON.stringify(franchise)} >{franchise.name}</option>)
                            })}
                        </select>
                    </div>
                </div>
                {selectedFranchise ?
                    <div className="row">
                        <div className="col-xl-4 offset-xl-1">
                            <label>Ciudad:  {selectedFranchise.city}</label>
                        </div>
                        <div className="col-xl-5 offset-xl-2">
                            <label>Franquiciado:  {selectedFranchise.name_manager}, {selectedFranchise.last_name_manager}</label>
                        </div>
                    </div>
                    : <></>
                }
            </div>
            <div className="viewTitle" />
            {
                flavors ?
                    <div className="viewBody">
                        <h3>Sabores</h3>
                        <div className="row">
                            <div className="offset-md-1">
                                <UploadByName list={flavors} upload={uploadFlavor} itemName="Sabor" listName="flavorList"
                                    placeholder="Ingrese el nombre del sabor que busca..." maxLength="50" id='id_flavor'></UploadByName>
                            </div>
                        </div>
                    </div>
                    : <></>
            }
            {
                detailFlavors ?
                    <div className="viewBody">
                        <h3>Detalle de sabores</h3>
                        <br />
                        <div>
                            {
                                Object.values(groupBy(detailFlavors, 'family_flavor')).map((arrayDetailFlavor) => {
                                    return (
                                        <div key={arrayDetailFlavor[0].family_flavor}>
                                            <div className="row align-items-center">
                                                <div className="col-4">
                                                    <h5><b>{arrayDetailFlavor[0].name_family_flavor.toUpperCase()}</b></h5>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row align-items-center">
                                                        <label className="col-4"><b>Peso (Kg.): </b></label>
                                                        <div className="col-6">
                                                            <input type="number" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <label><b>Precio ($): 1848</b></label>
                                                </div>
                                                <div className="col-2">
                                                    <label><b>Subtotal ($): 5485556</b></label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                {arrayDetailFlavor.map((detailFlavor) => {
                                                    return (
                                                        <div key={detailFlavor.id_flavor} className="row align-items-center">
                                                            <div className="col-2 offset-1">
                                                                <label>{detailFlavor.name}</label>
                                                            </div>
                                                            <div className="col-3 offset-1">
                                                                <div className="row align-items-center">
                                                                    <label className="col-6">Cantidad (baldes):</label>
                                                                    <div className="col-6">
                                                                        <input type="number" className="form-control" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )

                                                })}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    : <></>
            }
        </div >
    )
}
export default WholeSale;
