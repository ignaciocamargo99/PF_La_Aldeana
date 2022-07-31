import { CONFIRM, NON_GENEATE, ON_HOLD } from "./filtersConstants"

const ListSalaryFilter = ({ filter, onClickRB }) => {

    return (
        <div className="formRow">
            <div className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    defaultChecked={filter === NON_GENEATE}
                    id="rbNonGenerate"
                    name="stateSalariesRO"
                    onClick={(e) => { onClickRB(e.target.value) }}
                    type="radio"
                    value={NON_GENEATE}
                >
                </input>
                <label className="form-check-label" htmlFor="rbNonGenerate">Sin Generar</label>
            </div>
            <div className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    defaultChecked={filter === CONFIRM}
                    id="rbConfirm"
                    name="stateSalariesRO"
                    onClick={(e) => { onClickRB(e.target.value) }}
                    type="radio"
                    value={CONFIRM}
                >
                </input>
                <label className="form-check-label" htmlFor="rbConfirm">Confirmados</label>
            </div>
            <div className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    defaultChecked={filter === ON_HOLD}
                    id="rbOnHold"
                    name="stateSalariesRO"
                    onClick={(e) => { onClickRB(e.target.value) }}
                    type="radio"
                    value={ON_HOLD}
                >
                </input>
                <label className="form-check-label" htmlFor="rbOnHold">Pendientes</label>
            </div>
        </div>)
}

export default ListSalaryFilter;
