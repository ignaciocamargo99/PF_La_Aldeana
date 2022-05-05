import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import '../../../../assets/Buttons.css';
import Breadcrumb from '../../../../common/Breadcrumb';
import DataProductType from '../DataProductType/DataProductType';
import Buttons from '../../../../common/Buttons';

const EditProductType = ({ productTypeToEdit, onClickCancelEdit }) => {
  const [data, setData] = useState(productTypeToEdit);
  // Update data to async react state hook
  useEffect(() => setData(productTypeToEdit), [productTypeToEdit]);
  
  const loadData = (childData) => setData(childData);

  const updateProductType = () => {
    console.log(productTypeToEdit);
  }

  return (
    <>
      <div style={{ display: 'none' }}>{document.title = "Editar tipo de producto"}</div>
      <Breadcrumb parentName="Tipos de producto" icon={faUsers} parentLink="productTypes" currentName="Editar tipo de producto" />
      <div className="viewTitle">
        <h1>Tipo de producto "{data.name}"</h1>
      </div>
      <br />
      <div className="viewBody">
        <DataProductType productType={productTypeToEdit} loadData={loadData}/>
        <Buttons label='Aceptar' actionOK={updateProductType} ready={true} actionNotOK={updateProductType} actionCancel={onClickCancelEdit} 
         />
      </div>
    </>
  );
};

export default EditProductType;