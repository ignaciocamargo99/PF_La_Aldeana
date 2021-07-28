import React, {useEffect, useRef} from "react";

const SectorProduct = (props) => {

    const rb1 = useRef();

    const rb2 = useRef();

    useEffect(()=>{
        if (props.data.id_sector == 1){
            rb1.current.checked = true;
            rb2.current.checked = false;
        } else {
            rb1.current.checked = false;
            rb2.current.checked = true;
        }
    }, []);

    const handlerOnChange = (e) => {
        let data = props.data;
        if (e.target.value === "iceCreamShop") data.sector = 1;
        else data.sector = 2;
        props.load(data);
    }


    return (
        <div className="formRow">
            <div className="form-control-label">
                <label>Rubro*</label>
            </div>
            <div className="d-flex form-radio-group">
                <div className="form-check form-radio">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="iceCreamShop" value="iceCreamShop" onChange={(e) => handlerOnChange(e)} ref={rb1}></input>
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Heladería
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="coffeShop" value="coffeShop" onChange={(e) => handlerOnChange(e)} ref={rb2}></input>
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Cafetería
                    </label>
                </div>
            </div>
        </div>
    );
}

export default SectorProduct;