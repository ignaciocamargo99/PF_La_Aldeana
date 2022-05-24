import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import dateFormat from '../../../../utils/DateFormat/dateFormat';
import dataChartToURL from '../../../../utils/dataChartToURL';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  sectionFace: {
    margin: 10,
    padding: 10,
    marginTop: '35%'
  },
  section: {
    margin: 10,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    borderWidth: '2px',
    width: '1000em',
    textAlign: 'center',
    margin: '-1px',
  },
  col3: {
    borderWidth: '2px',
    textAlign: 'center',
    margin: '-1px',
    width: '500em',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 15,
    paddingTop: 15,
    color: 'grey',
  },
  mainTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 10,
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
    color: 'grey',
  },
  detail: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    marginVertical: 30,
    marginHorizontal: 50,
  },
  logo: {
    marginVertical: 10,
    marginHorizontal: 150,
  },
});

// Create Document Component
export default function MyDocument (props) {

  return (
    <>
      <Document>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- VentaDeProductos - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
          <View style={styles.sectionFace}>
            <Text style={styles.header}>{dateFormat(new Date())}</Text>
            <Text style={styles.mainTitle}>~ Venta De Productos ~</Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" />
            <Text style={styles.detail}>{props.description}</Text>
            <Text style={styles.header}>{props.title}</Text>
          </View>
        </Page>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- VentaDeProductos - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
          <View style={styles.section}>
            <Text style={styles.title}>Top 10 productos con más unidades vendidas</Text>
            <Image style={styles.image} src={dataChartToURL(props.topChart)}></Image>
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
          </View>
        </Page>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- VentaDeProductos - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
            <Text style={styles.title}>Total de ventas de tipos productos por unidad</Text>
            <Image style={styles.image} src={dataChartToURL(props.typesChart)}></Image>
            <Text style={styles.detail}>Total de ventas: {props.typesChart.total} uds.</Text>
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
        </Page>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- VentaDeProductos - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
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
        </Page>
      </Document>
    </>
  );
}