import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getAddFlavorsTableColumnHeaders from "./getAddFlavorsTableColumnHeaders";
import StockFlavorTable from "./StockFlavorTable";
const columnsHeaders = getAddFlavorsTableColumnHeaders();

const FlavorsTable = ({ pageElements, handleAddFlavor }) => {

    console.log('FlavorsTable');

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
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <input type="number"/>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <button
                                                type="button"
                                                className="btnAdd btn btn-info"
                                                onClick={() => handleAddFlavor(element)}
                                                disabled={+element.stock <= 0}
                                            >
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
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
