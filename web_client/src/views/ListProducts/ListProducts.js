import ProductTable from "./components/ProductTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ListProducts() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">


                    <div className="col-10 viewTitle">
                        <h1>Productos</h1>
                    </div>
                    <div className="col-2">
                        <button id='editProductButton' type="button" className="btn btn-success px-3"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                    </div>
                    <div className="viewBody">
                        <ProductTable />
                    </div>
                </div>
            </div>
        </>
    );
}