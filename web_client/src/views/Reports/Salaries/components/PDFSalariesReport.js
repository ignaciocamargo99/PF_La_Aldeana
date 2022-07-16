import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import dateFormat from '../../../../utils/DateFormat/dateFormat';
import dataChartToURL from 'utils/dataChartToURL';
import styles from '../../styles';
import dateText from 'utils/DateFormat/dateText';

// Create Document Component
export default function MyDocument (props) {

  return (
    <>
      <Document>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Salarios - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
          <View style={styles.sectionFace}>
            <Text style={{textAlign: 'left', width: '400px'}} fixed>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),true, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Salarios ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" fixed/>
          </View>
            <Text style={styles.title}>Análisis de salarios</Text>
            <Text style={styles.subtitle}>Análisis proporcional (% sin decimales)</Text>
            <Image style={styles.image} src={dataChartToURL(props.totalisedChart)}></Image>
            <Text style={styles.detail}>Total de dinero pagado: $ {props.totalisedChart.total}</Text>
            <Text style={styles.subtitle}>Análisis nominal</Text>
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
            <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                          `${pageNumber} / ${totalPages}`
                        )} fixed />
        </Page>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Salarios - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
        <View style={styles.sectionFace}>
            <Text style={{textAlign: 'left', width: '400px'}} fixed>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),true, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Salarios ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" fixed/>
          </View>
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
            <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                          `${pageNumber} / ${totalPages}`
                        )} fixed />
        </Page>
      </Document>
    </>
  );
}