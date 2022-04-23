import DeleteFlavorButton from "./DeleteFlavorButton";
import EditFlavorButton from './EditFlavorButton';
import ReadFlavorButton from "./ReadFlavorButton";

const FlavorsTable = ({ pageElements, columnsHeaders, deleteFlavor, permissionsAccess }) => {
    return (
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
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    {element.stock}
                                </td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    {element.reorderStock}
                                </td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    {element.price}
                                </td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <ReadFlavorButton flavorId={element.idFlavor} permissionsAccess={permissionsAccess}/>
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
    )
};

export default FlavorsTable;
