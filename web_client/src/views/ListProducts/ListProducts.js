import ProductTable from "./components/ProductTable";

export default function ListProducts(props) {
    return (
        <>
            <div className="viewTitle">
                <h1>Productos</h1>
            </div>
            <div className="viewBody">
                <ProductTable />
            </div>
        </>
    );
}