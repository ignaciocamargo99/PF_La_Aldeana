import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Canvas , Image, renderToFile} from '@react-pdf/renderer';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import dateFormat from '../../../../utils/DateFormat/dateFormat';
import { style } from '@material-ui/system';
import { connect } from 'react-redux';
import BeShowed from '../../../../common/BeShowed';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    borderWidth: '1px',
    width: '1000em',
  },
  col3: {
    borderWidth: '1px',
    width: '500em',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 15,
    paddingTop: 5,
    color: 'grey',
  },
  mainTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 10,
    textAlign: 'justify',
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  subtitle: {
    fontSize: 16,
    paddingLeft: '3px',
    paddingRight: '3px',
  },
  header: {
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'center',
    color: 'grey',
  },
  detail: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  logo: {
    marginVertical: 10,
    marginHorizontal: 150,
  },
});

// Create Document Component
const MyDocument = (props) => {

    return (
      <>
      <Document>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- VentaDeProductos -' + props.title} author={'Heladería y cafetería - La Aldeana'}>
          <View style={styles.section}>
            <Text style={styles.header}>{dateFormat(new Date())}</Text>
            <Text style={styles.mainTitle}>~ Venta De Productos ~</Text>
            <Text style={styles.detail}>{props.title}</Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png"/>
          </View>
          <View style={styles.section}>
              <Text style={styles.title}>Top 10 productos con más unidades vendidas</Text>
              <View style={styles.row}>
                <View style={styles.col}>
                    <Text style={styles.subtitle}>Nombre del producto</Text>
                </View>
                <View style={styles.col}>
                    <Text style={styles.subtitle}>Cantidad de uds. vendidas</Text>
                </View>
              </View>
              {props.top?.map(element => {
                  return (
                      <>
                      <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.text}>{element.name}</Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.text}>{element.quantity + ' uds.'}</Text>
                        </View>
                      </View>
                      </>
                  )
              })}
              <Text style={styles.title}>Total de ventas de tipos productos por unidad</Text>
              <View style={styles.row}>
                <View style={styles.col}>
                    <Text style={styles.subtitle}>Tipo de producto</Text>
                </View>
                <View style={styles.col}>
                    <Text style={styles.subtitle}>Cantidad de uds. vendidas</Text>
                </View>
              </View>
              {props.types?.map(element => {
                  return (
                      <>
                      <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.text}>{element.id}</Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.text}>{element.quantity + ' uds.'}</Text>
                        </View>
                      </View>
                      </>
                  )
              })}

              <Text style={styles.title}>Total de ventas de productos por unidad</Text>
              <View style={styles.row}>
                <View style={styles.col3}>
                    <Text style={styles.subtitle}>Nombre del producto</Text>
                </View>
                <View style={styles.col3}>
                    <Text style={styles.subtitle}>Tipo de producto</Text>
                </View>
                <View style={styles.col3}>
                    <Text style={styles.subtitle}>Cantidad de uds. vendidas</Text>
                </View>
              </View>
              {props.sales?.map(element => {
                  return (
                      <>
                      <View style={styles.row}>
                        <View style={styles.col3}>
                            <Text style={styles.text}>{element.name}</Text>
                        </View>
                        <View style={styles.col3}>
                            <Text style={styles.text}>{element.product_type}</Text>
                        </View>
                        <View style={styles.col3}>
                            <Text style={styles.text}>{element.quantity + ' uds.'}</Text>
                        </View>
                      </View>
                      </>
                  )
              })}
            
          </View>

          {/*<Image src={"https://quickchart.io/chart?c="+props.data}></Image>*/}
        </Page>
    </Document>
      </>
    );
}

const Viewer = (props) => {
  let [labels, setLabels] = useState([]);
  let [dat, setDat] = useState([]);

  useEffect(()=>{
    let l = []
    let d = []
    props.topTenProductSales?.forEach((e)=>{
      l = [...l, e.name]
      d = [...d, e.quantity]
    })

    setLabels(l);
    setDat(d);
  }, [props.topTenProductSales])

  const data = JSON.stringify({
    type: 'bar',
    labels: labels,
    datasets: [
      {
        label: 'número de unidades vendidas',
        data: dat,
      },
    ],
  });

  
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
                <MyDocument title={props.description} data={data} sales={props.productSales} top={props.topTenProductSales} types={props.typeProductSales.types} />
            </PDFViewer>
        </ModalBody>
        <ModalFooter>
            <PDFDownloadLink document={<MyDocument title={props.description} data={data} sales={props.productSales} top={props.topTenProductSales} types={props.typeProductSales.types} />} fileName={dateFormat(new Date()) + '-VentaDeProductos-' + props.description + '.pdf'}>
                <button className='sendOk' >Descargar</button>
            </PDFDownloadLink>
            <button className='cancel' onClick={props.cancel}>Cancelar</button>
        </ModalFooter>
      </Modal>
    )
}

const mapStateToProps = state => {
  return {
      productSales: state.productSales,
      topTenProductSales: state.topTenProductSales,
      typeProductSales: state.typeProductSales
  }
}

export default connect(mapStateToProps)(Viewer);