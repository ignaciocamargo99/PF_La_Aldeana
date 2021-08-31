import React from 'react';

const RadioButtons = (props) => {

    const onClickRB = (value) => {
        props.setFilter(value)
    }

    return(
    <>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="sectorRadioOptions" id="rbAll" value="0" onClick={(e) => {onClickRB(e.target.value)}} defaultChecked></input>
            <label className="form-check-label" for="rbAll">Todos</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="sectorRadioOptions" id="rbIceCream" value="1" onClick={(e) => {onClickRB(e.target.value)}}></input>
            <label className="form-check-label" for="rbIceCream">Heladería</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="sectorRadioOptions" id="rbCafe" value="2" onClick={(e) => {onClickRB(e.target.value)}}></input>
            <label className="form-check-label" for="rbCafe">Cafetería</label>
        </div>
    </>
    )
}

export default RadioButtons