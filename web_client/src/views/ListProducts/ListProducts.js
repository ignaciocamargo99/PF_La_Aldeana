import ProductTable from "./components/ProductTable";
import '../../assets/Buttons.css';

export default function ListProducts(props) {

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Productos"}</div>
            <ProductTable permissionsAccess={props.permissionsAccess}/>
        </>
    );
}