import { useEffect, useRef } from 'react';

const NameProduct = (props) => {

    const refName = useRef('');

    useEffect(() =>{
        const data = props.data;
        const name = refName.current.value;

        if (name !== '') {
            data.name = name;
            console.log(data.name);
            props.load(data);
        }
    }, [refName.current.value]);

    return(
        <>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="productName" >Nombre*</label>
                </div>
                <div className="form-control-input">
                    <input ref={refName} className="form-control" id="productName" type="text" placeholder="Ingrese nombre del producto...">
                    </input>
                </div>
            </div>
        </>
    );
}

export default NameProduct;