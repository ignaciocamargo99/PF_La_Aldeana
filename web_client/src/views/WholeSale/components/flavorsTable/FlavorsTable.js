import AmountCell from "../AmountCell";
import getAddFlavorsTableColumnHeaders from "./getAddFlavorsTableColumnHeaders";
import StockFlavorTable from "./StockFlavorTable";
const columnsHeaders = getAddFlavorsTableColumnHeaders();

const FlavorsTable = ({ pageElements, handleAddFlavor }) => {

    return (
        <>
            {(pageElements && pageElements.length > 0)
                ?
                <div className="table-responsive-md">
                    <table className="table table-control table-hover fs-6" >
                        <thead>
                            <tr>
                                {columnsHeaders.map((element, i) => {
                                    return (
                                        <th key={i} scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: element.width }}>
                                            {element.name}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {pageElements?.map((element, i) => {

                                return (
                                    <tr key={i}>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            {element.name}
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            {element.FlavorFamily.name}
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            {element.FlavorType.name}
                                        </td>
                                        <StockFlavorTable flavor={element}></StockFlavorTable>
                                        <AmountCell item={element} handleAddItem={handleAddFlavor}></AmountCell>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                :
                <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No existen sabores para los filtros ingresados...</h4>
            }
        </>
    )
};

export default FlavorsTable;
