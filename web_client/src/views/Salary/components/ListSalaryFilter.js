const ListSalaryFilter = (props) => {

    return(
    <div className="formRow">
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="stateLicensesRO" id="rbNonConfirm" value="NonConfirm" onClick={(e) => {props.onClickRB(e.target.value)}} defaultChecked></input>
            <label className="form-check-label" htmlFor="rbNonConfirm">Sin confirmar</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="stateLicensesRO" id="rbConfirm" value="Confirm" onClick={(e) => {props.onClickRB(e.target.value)}}></input>
            <label className="form-check-label" htmlFor="rbConfirm">Confirmados</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="stateLicensesRO" id="rbOnHold" value="OnHold" onClick={(e) => {props.onClickRB(e.target.value)}}></input>
            <label className="form-check-label" htmlFor="rbOnHold">Pendientes</label>
        </div>
    </div>)
}

export default ListSalaryFilter;