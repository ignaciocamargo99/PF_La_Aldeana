import React, { useRef, useState } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import dateFormat from '../../../../utils/DateFormat/dateFormat';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = (props) => (
  <Document>
    <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '-VentaDeProductos-' + props.title} author={'Heladería y cafetería - La Aldeana'}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

const Viewer = (props) => {

    return(
      <Modal isOpen={props.showPdf} 
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <ModalHeader>
            <h2>Previsualización de reporte de venta de productos</h2>
        </ModalHeader>
        <ModalBody style={{height: '50em'}}>
            <PDFViewer style={{width: '100%', height: '45em'}} showToolbar={false}>
                <MyDocument title={props.description}/>
            </PDFViewer>
        </ModalBody>
        <ModalFooter>
            <PDFDownloadLink document={<MyDocument />} fileName={dateFormat(new Date()) + '-VentaDeProductos-' + props.description + '.pdf'}>
                <button className='sendOk' >Descargar</button>
            </PDFDownloadLink>
            <button className='cancel' onClick={props.cancel}>Cancelar</button>
        </ModalFooter>
      </Modal>
    )
}

export default Viewer;