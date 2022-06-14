import ProductsPage from "./components/ProductsPage";
import '../../assets/Buttons.css';

export default function ProductsView(props) {

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Productos"}</div>
            <ProductsPage permissionsAccess={props.permissionsAccess} />
        </>
    );
}