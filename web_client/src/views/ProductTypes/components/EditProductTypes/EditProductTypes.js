import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import '../../../../assets/Buttons.css';
import Breadcrumb from '../../../../common/Breadcrumb';
import DataProductType from '../DataProductType/DataProductType';
import Buttons from '../../../../common/Buttons';
import Axios from 'axios';
import displayError from 'utils/ErrorMessages/displayError';
import loadingMessage from 'utils/LoadingMessages/loadingMessage';
import successMessage from 'utils/SuccessMessages/successMessage';
import { defaultQuestionSweetAlert2 } from 'utils/questionMessages/sweetAlert2Questions';
import warningMessage from 'utils/WarningMessages/warningMessage';

const PORT = require('../../../../config');

const EditProductType = ({ productTypeToEdit, onClickCancelEdit }) => {
  const [data, setData] = useState({...productTypeToEdit});
  const [ready, setReady] = useState(true);
  // Update data to async react state hook
  useEffect(() => setData(productTypeToEdit), [productTypeToEdit]);

  const loadData = (childData) => {
    if (!data.name) setReady(false);
    else setReady(true);
    setData(childData);
  }

  const updateProductType = async () => {
    if (ready) {
      const editionConfirmed = (await defaultQuestionSweetAlert2('¿Confirmar cambios?')).isConfirmed;
      if (editionConfirmed) {
        loadingMessage('Guardando cambios...')
        Axios.put(`${PORT()}/api/productTypes/${data.id_product_type}`, data)
          .then(response => {
            if (response.status === 200) {
              successMessage('Atención', 'Sabor editado exitosamente', 'success')
                .then(() => window.location.replace('/app/productTypes'));
            }
            else displayError(response.data.message, 'Error al editar el tipo de producto');
          })
          .catch(() => { displayError(); });
      }
    }
    else warningMessage('Atención', 'Debe ingresar un nombre para el tipo de producto', 'warning');
  }

  return (
    <>
      <div style={{ display: 'none' }}>{document.title = "Editar tipo de producto"}</div>
      <Breadcrumb parentName="Tipos de producto" icon={faUsers} parentLink="productTypes" currentName="Editar tipo de producto" />
      <div className="viewTitle">
        <h1>Editar tipo de producto</h1>
      </div>
      <br />
      <div className="viewBody">
        <DataProductType productType={data} loadData={loadData} />
        <Buttons label='Aceptar' actionOK={updateProductType} ready={ready} actionNotOK={updateProductType} actionCancel={onClickCancelEdit}
        />
      </div>
    </>
  );
};

export default EditProductType;