import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlavorsToSellTableStock from "./FlavorsToSellTableStock";
import getFlavorsToSellTableColumnHeaders from "./getFlavorsToSellTableColumnHeaders";

const FlavorsToSellTableTable = ({ pageElements, handleRemoveFlavor }) => {
    const columnsHeaders = getFlavorsToSellTableColumnHeaders();

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
                                        <FlavorsToSellTableStock flavor={element}></FlavorsToSellTableStock>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            {element.reorderStock}
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <input
                                                type="number"
                                                min="0"
                                                max={element.stock}
                                                onChange={() => { }}
                                                onKeyDown={() => { }}
                                            >
                                            </input>
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <input
                                                type="number"
                                                min={1}
                                                max={element.stock}
                                                onChange={() => { }}
                                                onKeyDown={() => { }}
                                            >
                                            </input>
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>

                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <button
                                                className="btn btn-danger btnDelete"
                                                onClick={() => handleRemoveFlavor(element)}
                                                type="button"
                                            >
                                                <FontAwesomeIcon icon={faMinus} />
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

export default FlavorsToSellTableTable;
