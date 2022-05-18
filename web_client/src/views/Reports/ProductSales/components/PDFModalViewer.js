
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import dateFormat from '../../../../utils/DateFormat/dateFormat';

export default function Viewer(props) {

    return (
      <Modal isOpen={props.showPdf}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <ModalHeader>
          <h2>Previsualización de reporte de venta de productos</h2>
        </ModalHeader>
        <ModalBody style={{ height: '50em' }}>
          <PDFViewer style={{ width: '100%', height: '45em' }} showToolbar={false}>
            {props.MyDoc}
          </PDFViewer>
          
        </ModalBody>
        <ModalFooter>
          <PDFDownloadLink document={props.MyDoc} fileName={dateFormat(new Date()) + '-VentaDeProductos-' + props.description + '.pdf'}>
            <button className='sendOk' >Descargar</button>
          </PDFDownloadLink>
          <button className='cancel' onClick={props.cancel}>Cancelar</button>
        </ModalFooter>
      </Modal>
    )
  }