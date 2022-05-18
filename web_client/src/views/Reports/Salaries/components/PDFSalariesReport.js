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
  col7: {
    borderWidth: '2px',
    textAlign: 'center',
    margin: '-1px',
    width: '80em',
  },
  col8: {
    borderWidth: '2px',
    textAlign: 'center',
    margin: '-1px',
    width: '40em',
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
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Salarios - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
          <View style={styles.sectionFace}>
            <Text style={styles.header}>{dateFormat(new Date())}</Text>
            <Text style={styles.mainTitle}>~ Salarios ~</Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" />
            <Text style={styles.detail}>{props.description}</Text>
            <Text style={styles.header}>{props.title}</Text>
          </View>
        </Page>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Salarios - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
            <Text style={styles.title}>Análisis de salarios</Text>
            <Image style={styles.image} src={dataChartToURL(props.totalisedChart)}></Image>
            <Text style={styles.detail}>Total de dinero pagado: $ {props.totalisedChart.total}</Text>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Total de...</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.subtitle}>$</Text>
              </View>
            </View>
            {props.totals?.map(element => {
              return (
                <>
                  <View style={styles.row}>
                    <View style={styles.col}>
                      <Text style={styles.text}>{element.id}</Text>
                    </View>
                    <View style={styles.col}>
                      <Text style={styles.text}>$ {element.quantity}</Text>
                    </View>
                  </View>
                </>
              )
            })}
        </Page>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Salarios - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
            <Text style={styles.title}>Salarios</Text>
            <View style={styles.row}>
              <View style={styles.col7}>
                <Text style={styles.subtitle}>Nombre</Text>
              </View>
              <View style={styles.col8}>
                <Text style={styles.subtitle}>Hs. trabajadas/extras</Text>
              </View>
              <View style={styles.col8}>
                <Text style={styles.subtitle}>Recibo de sueldo</Text>
              </View>
              <View style={styles.col8}>
                <Text style={styles.subtitle}>Adicionales</Text>
              </View>
              <View style={styles.col8}>
                <Text style={styles.subtitle}>Subtotal</Text>
              </View>
              <View style={styles.col8}>
                <Text style={styles.subtitle}>Descuentos y anticipos</Text>
              </View>
              <View style={styles.col8}>
                <Text style={styles.subtitle}>Total</Text>
              </View>
            </View>
            {props.sales?.map(element => {
              return (
                <>
                  <View style={styles.row}>
                    <View style={styles.col7}>
                      <Text style={styles.text}>{element.fullName}</Text>
                    </View>
                    <View style={styles.col8}>
                      <Text style={styles.text}>$ {element.salary_hs}</Text>
                    </View>
                    <View style={styles.col8}>
                      <Text style={styles.text}>$ {element.paycheck}</Text>
                    </View>
                    <View style={styles.col8}>
                      <Text style={styles.text}>$ {element.plus}</Text>
                    </View>
                    <View style={styles.col8}>
                      <Text style={styles.text}>$ {element.subtotal}</Text>
                    </View>
                    <View style={styles.col8}>
                      <Text style={styles.text}>$ {element.minus}</Text>
                    </View>
                    <View style={styles.col8}>
                      <Text style={styles.text}>$ {element.total}</Text>
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