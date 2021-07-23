import ProductTable from "./components/ProductTable";
import SuppliesPairTables from "../RegisterProduct/components/SuppliesPairTables/SuppliesPairTables";

export default function ListProducts (props) {
    return (
        <>
            <div className="viewTitle">
                <h1>Productos</h1>
            </div>
            <div className="viewBody">
                <ProductTable/>
                <SuppliesPairTables/>
            </div>
        </>
    );
}