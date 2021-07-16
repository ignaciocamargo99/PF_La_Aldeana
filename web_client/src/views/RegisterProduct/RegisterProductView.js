import { useEffect, useState } from 'react';
import Buttons from '../../common/Buttons';
import GeneralDataProd from './GeneralDataProd';
import ExtraDataProd from './ExtraDataProd';
import './RegisterProductView.css';
import validationProductRegister from '../../utils/validationProductRegister';

const RegisterProductView = (props) => {

    const [data, setData] = useState({name: '', description: '', price: -1, type: {}, supplies: [{}], img: null});
    const [ready, setReady] = useState(false);

    useEffect(
        ()=>{
            //const isValidate = validationProductRegister(data.name, data.price, data.type);
            //if (isValidate === true) setReady(true);
            console.log(data)

        }
        ,[data]);

    const register = () => {
        console.log('hola');
    }

    return (
        <>
            <div className="viewTitle">
                <h1>Registrar Producto</h1>
            </div>

            <div className="viewBody">


                <form>

                    <GeneralDataProd load={setData} data={data}/>
                        
                    <ExtraDataProd load={setData} data={data}/>

                    <Buttons label='Registrar' ready={ready} data={data} register={register}/>

                </form>


            </div>
        </>
    );
}

export default RegisterProductView;
{/*const RegisterProductView = () => {
    return (
        <>
            <div className="viewTitle">
                <h1>Registrar Producto</h1>
            </div>

            <div className="viewBody">


                <form>

                    <div className="formRow">
                        <div className="form-control-label">
                            <label htmlFor="productName" >Nombre*</label>
                        </div>
                        <div className="form-control-input">
                            <input className="form-control" id="productName" type="text" placeholder="Ingrese nombre del producto...">
                            </input>
                        </div>
                    </div>

                    <div className="formRow">
                        <div className="form-control-label">
                            <label htmlFor="productDescription">Descripción</label>
                        </div>
                        <div className="form-control-input">
                            <textarea className="form-control" id="productDescription" placeholder="Ingrese descripción del producto..." rows="3"></textarea>
                        </div>
                    </div>

                    <div className="formRow">
                        <div className="form-control-label">
                            <label htmlFor="productPrice" >Precio*</label>
                        </div>
                        <div className="form-control-input">
                            <input className="form-control" id="productPrice" type="number" placeholder="Ingrese precio del producto...">
                            </input>
                        </div>
                    </div>

                    <div className="formRow">
                        <div className="form-control-label">
                            <label>Rubro*</label>
                        </div>
                        <div className="d-flex form-radio-group">
                            <div className="form-check form-radio">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Heladería
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked></input>
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Cafetería
                                </label>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
}

export default RegisterProductView;
*/}