
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import dateFormat from '../../../../utils/DateFormat/dateFormat';

export default function Viewer(props) {

  const extraAction = () => {
    if(props.extraAction)props.extraAction();
  }

  return (
    <Modal isOpen={props.showPdf}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <ModalHeader>
        <h2>Previsualización de reporte de {props.reportOf}</h2>
      </ModalHeader>
      <ModalBody style={{ height: '50em' }}>
        <PDFViewer style={{ width: '100%', height: '45em' }} showToolbar={false}>
          {props.MyDoc}
        </PDFViewer>
      </ModalBody>
      <ModalFooter>
        <PDFDownloadLink document={props.MyDoc} fileName={dateFormat(new Date()) + '-' + props.reportOf + '-' + (props.title?(props.title + '-'):'') + (props.description?props.description:'') + '.pdf'}>
          <button className='btn btn-light sendOk' onClick={extraAction}>Descargar</button>
        </PDFDownloadLink>
        <button className='btn btn-light cancel' onClick={props.cancel}>Cancelar</button>
      </ModalFooter>
    </Modal>
  )
}
