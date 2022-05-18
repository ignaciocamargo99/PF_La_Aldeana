import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import dateFormat from '../../../../utils/DateFormat/dateFormat';
import dataChartToURL from '../../../../utils/dataChartToURL';
import styles from '../../styles';

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
                      <Text style={styles.money}>$ {element.quantity}</Text>
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
                <Text style={styles.subtitle}>Hs. trabajadas / extras</Text>
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
            {props.salaries?.map(element => {
              return (
                <>
                  <View style={styles.row}>
                    <View style={styles.col7}>
                      <Text style={styles.text}>{element.fullName}</Text>
                    </View>
                    <View style={styles.col8}>
                      <Text style={styles.money}>$ {element.salary_hs}</Text>
                    </View>
                    <View style={styles.col8}>
                      <Text style={styles.money}>$ {element.paycheck}</Text>
                    </View>
                    <View style={styles.col8}>
                      <Text style={styles.money}>$ {element.plus}</Text>
                    </View>
                    <View style={styles.col8}>
                      <Text style={styles.money}>$ {element.subtotal}</Text>
                    </View>
                    <View style={styles.col8}>
                      <Text style={styles.money}>$ {element.minus}</Text>
                    </View>
                    <View style={styles.col8}>
                      <Text style={styles.money}>$ {element.total}</Text>
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