import React, { useEffect, useState } from 'react';

const RadioButtons = (props) => {
    
    const [valueRB,setValueRB] = useState(0)

    useEffect(()=>{
        onClickRB(valueRB)
    },[props.products.length])

    const onClickRB = (value) => {
        setValueRB(value)
        if(value != 0){
            let newFilterProducts = props.products.filter(product => product.id_sector == value)
            props.setFilterProducts(newFilterProducts)
        }else{
            props.setFilterProducts(props.products)
        }
        
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