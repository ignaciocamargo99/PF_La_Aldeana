import DeleteFlavorButton from "./DeleteFlavorButton";
import EditFlavorButton from './EditFlavorButton';
import ReadFlavorButton from "./ReadFlavorButton";
import StockFlavorTable from "./StockFlavorTable";
import getFlavorsTableColumnHeaders from "./getFlavorsTableColumnHeaders";

const FlavorsTable = ({ pageElements, deleteFlavor, permissionsAccess }) => {
    const columnsHeaders = getFlavorsTableColumnHeaders();

    return (
        <>
            {(pageElements && pageElements.length > 0)
                ?
                <div className="table-responsive-md">
                    <table className="table table-control table-hover" >
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
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            {element.reorderStock}
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <ReadFlavorButton flavorId={element.idFlavor} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <EditFlavorButton flavorId={element.idFlavor} permissionsAccess={permissionsAccess} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <DeleteFlavorButton flavorData={element} deleteFlavor={deleteFlavor} permissionsAccess={permissionsAccess} />
                                        </td>
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
