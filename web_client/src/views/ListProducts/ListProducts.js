import ProductTable from "./components/ProductTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../assets/Buttons.css';

export default function ListProducts() {
    const onClickNewProduct = () => window.location.replace('/app/registerProducts');

    return (
        <>
            <div className="viewTitleBtn">
                <h1>Productos</h1>
                <div className="btnTitle">
                    <button id='editProductButton' onClick={onClickNewProduct} type="button" className="sendNew"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                </div>
            </div>
            <div className="viewBody">
                <ProductTable />
            </div>
        </>
    );
}