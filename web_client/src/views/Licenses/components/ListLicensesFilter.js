import { useEffect } from "react"

const ListLicensesFilter = (props) => {

    useEffect(() => {
        document.getElementById(`rb${props.filter}`).checked = true
    },[props.filter])

    return(
    <div className="formRow">
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="stateLicensesRO" id="rbAll" value="All" onClick={(e) => {props.onClickRB(e.target.value)}} defaultChecked></input>
            <label className="form-check-label" htmlFor="rbAll">Todos</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="stateLicensesRO" id="rbFinish" value="Finish" onClick={(e) => {props.onClickRB(e.target.value)}}></input>
            <label className="form-check-label" htmlFor="rbFinish">Finalizadas</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="stateLicensesRO" id="rbCurrent" value="Current" onClick={(e) => {props.onClickRB(e.target.value)}}></input>
            <label className="form-check-label" htmlFor="rbCurrent">Actuales</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="stateLicensesRO" id="rbOnComing" value="OnComing" onClick={(e) => {props.onClickRB(e.target.value)}}></input>
            <label className="form-check-label" htmlFor="rbOnComing">Próximas</label>
        </div>
    </div>)
}

export default ListLicensesFilter