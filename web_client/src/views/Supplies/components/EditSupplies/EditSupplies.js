import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import '../../../../assets/Buttons.css';
import Breadcrumb from '../../../../common/Breadcrumb';
// import DataProductType from '../DataProductType/DataProductType';
import Buttons from '../../../../common/Buttons';
import Axios from 'axios';
import displayError from 'utils/ErrorMessages/displayError';
import loadingMessage from 'utils/LoadingMessages/loadingMessage';
import successMessage from 'utils/SuccessMessages/successMessage';
import { defaultQuestionSweetAlert2 } from 'utils/questionMessages/sweetAlert2Questions';
import warningMessage from 'utils/WarningMessages/warningMessage';

const PORT = require('../../../../config');

const EditProductType = ({ supplyToEdit, onClickCancelEdit }) => {
  const [data, setData] = useState({...supplyToEdit});
  const [ready, setReady] = useState(true);
  // Update data to async react state hook
  useEffect(() => setData(supplyToEdit), [supplyToEdit]);

  const loadData = (childData) => {
    if (!data.name) setReady(false);
    else setReady(true);
    setData(childData);
  }

  const updateSupply = async () => {
    if (ready) {
      const editionConfirmed = (await defaultQuestionSweetAlert2('¿Confirmar cambios?')).isConfirmed;
      if (editionConfirmed) {
        loadingMessage('Guardando cambios...')
        Axios.put(`${PORT()}/api/supplies/${data.id_supply}`, data)
          .then(response => {
            if (response.status === 200) {
              successMessage('Atención', 'Insumo editado exitosamente', 'success')
                .then(() => window.location.replace('/app/supplies'));
            }
            else displayError(response.data.message, 'Error al editar el insumo');
          })
          .catch(() => { displayError(); });
      }
    }
    else warningMessage('Atención', 'Debe ingresar un nombre para el tipo de producto', 'warning');
  }

  return (
    <>
      <div style={{ display: 'none' }}>{document.title = "Editar insumo"}</div>
      <Breadcrumb parentName="Insumos" icon={faUsers} parentLink="supplies" currentName="Editar insumo" />
      <div className="viewTitle">
        <h1>Editar insumo</h1>
      </div>
      <br />
      <div className="viewBody">
        {/* <DataProductType productType={data} loadData={loadData} /> */}
        <Buttons label='Aceptar' actionOK={updateSupply} ready={ready} actionNotOK={updateSupply} actionCancel={onClickCancelEdit}
        />
      </div>
    </>
  );
};

export default EditProductType;