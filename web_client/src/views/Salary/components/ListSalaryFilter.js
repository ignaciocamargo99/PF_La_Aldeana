const ListSalaryFilter = (props) => {

    return (
        <div className="formRow">
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="stateSalariesRO" id="rbNonGenerate" value="NonGenerate" onClick={(e) => { props.onClickRB(e.target.value) }} defaultChecked={props.filter === "NonGenerate"}></input>
                <label className="form-check-label" htmlFor="rbNonGenerate">Sin Generar</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="stateSalariesRO" id="rbConfirm" value="Confirm" onClick={(e) => { props.onClickRB(e.target.value) }} defaultChecked={props.filter === "Confirm"}></input>
                <label className="form-check-label" htmlFor="rbConfirm">Confirmados</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="stateSalariesRO" id="rbOnHold" value="OnHold" onClick={(e) => { props.onClickRB(e.target.value) }} defaultChecked={props.filter === "OnHold"}></input>
                <label className="form-check-label" htmlFor="rbOnHold">Pendientes</label>
            </div>
        </div>)
}

export default ListSalaryFilter;