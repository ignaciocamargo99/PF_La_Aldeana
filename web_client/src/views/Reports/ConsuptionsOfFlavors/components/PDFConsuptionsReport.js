import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import dateFormat from '../../../../utils/DateFormat/dateFormat';
import dataChartToURL from 'utils/dataChartToURL';
import dataChartToURLWhenHaveTwoDataSets from 'utils/dataChartToURLWhenHaveTwoDataSets';
import styles from '../../styles';
import dateText from 'utils/DateFormat/dateText';

// Create Document Component
export default function MyDocument (props) {

  return (
    <>
      <Document><Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Consumo de baldes de sabores de helados - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
          <View style={styles.sectionFace}>
            <Text style={{textAlign: 'left', width: '400px'}} fixed>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),false, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Consumo de baldes de sabores de helados ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" fixed/>
          </View>
            <Text style={styles.title}>Análisis de consumo y producción mensual de baldes de sabores de helados</Text>
            <Image style={styles.image} src={dataChartToURLWhenHaveTwoDataSets(props.bar)}></Image>
            <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                          `${pageNumber} / ${totalPages}`
                        )} fixed />
        </Page>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Consumo de baldes de sabores de helados - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
          <View style={styles.sectionFace}>
            <Text style={{textAlign: 'left', width: '400px'}} fixed>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),false, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Consumo de baldes de sabores de helados ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" fixed/>
          </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Mes</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Producción</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Consumo</Text>
              </View>
            </View>
            {props.totals?.map(element => {
              return (
                <>
                  <View style={styles.row}>
                    <View style={styles.col}>
                      <Text style={styles.text}>{element.month}</Text>
                    </View>
                    <View style={styles.col}>
                      <Text style={styles.money}>{element.prod}</Text>
                    </View>
                    <View style={styles.col}>
                      <Text style={styles.money}>{element.consum}</Text>
                    </View>
                  </View>
                </>
              )
            })}
            <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                          `${pageNumber} / ${totalPages}`
                        )} fixed />
        </Page>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Consumo de baldes de sabores de helados - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
          <View style={styles.sectionFace}>
            <Text style={{textAlign: 'left', width: '400px'}} fixed>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),false, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Consumo de baldes de sabores de helados ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" fixed/>
          </View>
            <Text style={styles.title}>Análisis de producción de baldes de sabores de helados</Text>
            <Text style={styles.subtitle}>Análisis proporcional (% sin decimales)</Text>
            <Image style={styles.image} src={dataChartToURL(props.totalisedChart)}></Image>
            <Text style={styles.detail}>Total de baldes: {props.totalisedChart.total}</Text>
            <Text style={styles.subtitle}>Análisis nominal</Text>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Total de...</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Baldes</Text>
              </View>
            </View>
            {props.months?.map(element => {
              return (
                <>
                  <View style={styles.row}>
                    <View style={styles.col}>
                      <Text style={styles.text}>{element.name}</Text>
                    </View>
                    <View style={styles.col}>
                      <Text style={styles.money}>{element.prod}</Text>
                    </View>
                  </View>
                </>
              )
            })}
            <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                          `${pageNumber} / ${totalPages}`
                        )} fixed />
        </Page>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Consumo de baldes de sabores de helados - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
          <View style={styles.sectionFace}>
            <Text style={{textAlign: 'left', width: '400px'}} fixed>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),false, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Consumo de baldes de sabores de helados ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" fixed/>
          </View>
            <Text style={styles.title}>Análisis de consumo de baldes de sabores de helados</Text>
            <Text style={styles.subtitle}>Análisis proporcional (% sin decimales)</Text>
            <Image style={styles.image} src={dataChartToURL(props.totalisedConsum)}></Image>
            <Text style={styles.detail}>Total de baldes: {props.totalisedConsum.total}</Text>
            <Text style={styles.subtitle}>Análisis nominal</Text>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Total de...</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Baldes</Text>
              </View>
            </View>
            {props.months?.map(element => {
              return (
                <>
                  <View style={styles.row}>
                    <View style={styles.col}>
                      <Text style={styles.text}>{element.name}</Text>
                    </View>
                    <View style={styles.col}>
                      <Text style={styles.money}>{element.consum}</Text>
                    </View>
                  </View>
                </>
              )
            })}
            <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                          `${pageNumber} / ${totalPages}`
                        )} fixed />
        </Page>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Consumo de baldes de sabores de helados - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
        <View style={styles.sectionFace}>
            <Text style={{textAlign: 'left', width: '400px'}} fixed>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),false, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Consumo de baldes de sabores de helados ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" fixed/>
          </View>
          <Text style={styles.title}>Producción y consumo de baldes de sabores de helados</Text>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Nombre</Text>
              </View>
              <View style={styles.col4}>
                <Text style={styles.subtitle}>Tipo</Text>
              </View>
              <View style={styles.col4}>
                <Text style={styles.subtitle}>Familia</Text>
              </View>
              <View style={styles.col4}>
                <Text style={styles.subtitle}>Producción (baldes)</Text>
              </View>
              <View style={styles.col4}>
                <Text style={styles.subtitle}>Consumo (baldes)</Text>
              </View>
              <View style={styles.col4}>
                <Text style={styles.subtitle}>Diferencia (baldes)</Text>
              </View>
            </View>
            {props.consuptions[0]?.map(element => {
              return (
                <>
                  <View style={styles.row}>
                    <View style={styles.col}>
                      <Text style={styles.text}>{element.name}</Text>
                    </View>
                    <View style={styles.col4}>
                      <Text style={styles.text}>{element.type}</Text>
                    </View>
                    <View style={styles.col4}>
                      <Text style={styles.text}>{element.family}</Text>
                    </View>
                    <View style={styles.col4}>
                      <Text style={styles.money}>{element.prod}</Text>
                    </View>
                    <View style={styles.col4}>
                      <Text style={styles.money}>{element.consum}</Text>
                    </View>
                    <View style={styles.col4}>
                      <Text style={styles.money}>{element.prod - element.consum}</Text>
                    </View>
                  </View>
                </>
              )
            })}
            <>
              <View style={styles.row}>
                <View style={styles.col6}>
                  <Text style={styles.text}>Total</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.total}>{props.consuptions[1][0].quantity}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.total}>{props.consuptions[1][1].quantity}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.total}>{props.consuptions[1][0].quantity - props.consuptions[1][1].quantity}</Text>
                </View>
              </View>
            </>
            <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                          `${pageNumber} / ${totalPages}`
                        )} fixed />
        </Page>
      </Document>
    </>
  );
}