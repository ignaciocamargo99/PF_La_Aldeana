import ProductTable from "./components/ProductTable";
import '../../assets/Buttons.css';

export default function ListProducts() {

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Productos"}</div>
            <ProductTable />
        </>
    );
}