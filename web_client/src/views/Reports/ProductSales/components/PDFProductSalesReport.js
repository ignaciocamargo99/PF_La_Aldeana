import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import dateFormat from '../../../../utils/DateFormat/dateFormat';
import dataChartToURL from 'utils/dataChartToURL';
import styles from '../../styles';
import dateText from 'utils/DateFormat/dateText';

// Create Document Component
export default function MyDocument (props) {
  let prev = 0;

  return (
    <>
      <Document>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- VentaDeProductos - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
        <View style={styles.sectionFace} fixed>
            <Text style={{textAlign: 'left', width: '400px'}} fixed>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),true, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Ventas de productos ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" fixed/>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Top 10 productos con más unidades vendidas</Text>
            <Image style={styles.image} src={dataChartToURL(props.topChart)}></Image>
          </View>
          <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                        `${pageNumber} / ${totalPages}`
                      )} fixed />
        </Page>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- VentaDeProductos - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
        <View style={styles.sectionFace} fixed>
            <Text style={{textAlign: 'left', width: '400px'}} fixed>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),true, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Ventas de productos  ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" fixed/>
          </View>
          <View style={styles.section}>
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
                      <Text style={styles.money}>{element.quantity + ' uds.'}</Text>
                    </View>
                  </View>
                </>
              )
            })}
          </View>
          <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                        `${pageNumber} / ${totalPages}`
                      )} fixed />
        </Page>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- VentaDeProductos - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
        <View style={styles.sectionFace} fixed>
            <Text style={{textAlign: 'left', width: '400px'}} fixed>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),true, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Ventas de productos  ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" fixed/>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Total de ventas de tipos productos por unidad</Text>
            <Text style={styles.subtitle}>Análisis proporcional (% sin decimales)</Text>
            <Image style={styles.image} src={dataChartToURL(props.typesChart)}></Image>
            <Text style={styles.detail}>Total de ventas: {props.typesChart.total} uds.</Text>
          </View>
          <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                        `${pageNumber} / ${totalPages}`
                      )} fixed />
        </Page>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- VentaDeProductos - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
        <View style={styles.sectionFace} fixed>
            <Text style={{textAlign: 'left', width: '400px'}} fixed>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),true, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Ventas de productos  ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" fixed/>
          </View>
          <View style={styles.section}>
            <Text style={styles.subtitle}>Análisis nominal</Text>
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
                      <Text style={styles.money}>{element.quantity + ' uds.'}</Text>
                    </View>
                  </View>
                </>
              )
            })}
            </View>
            <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                          `${pageNumber} / ${totalPages}`
                        )} fixed />
        </Page>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- VentaDeProductos - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
        <View style={styles.sectionFace} fixed>
            <Text style={{textAlign: 'left', width: '400px'}} fixed>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),true, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Ventas de productos ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" fixed/>
          </View>
          <View style={styles.section}>
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
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.division}>{props.sales[0].sector}</Text>
              </View>
            </View>
            {props.sales?.map(element => {
              if(prev !== 0 && prev.id_sector !== element.id_sector){
                prev = element;
                return (
                  <>
                    <View style={styles.row}>
                      <View style={styles.col}>
                        <Text style={styles.division}>{element.sector}</Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <View style={styles.col3}>
                        <Text style={styles.text}>{element.name}</Text>
                      </View>
                      <View style={styles.col3}>
                        <Text style={styles.text}>{element.product_type}</Text>
                      </View>
                      <View style={styles.col3}>
                        <Text style={styles.money}>{element.quantity + ' uds.'}</Text>
                      </View>
                    </View>
                  </>
              )} else {
                prev = element;
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
                        <Text style={styles.money}>{element.quantity + ' uds.'}</Text>
                      </View>
                    </View>
                  </>
                )
              }
            })}
            </View>
            <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                          `${pageNumber} / ${totalPages}`
                        )} fixed />
        </Page>
      </Document>
    </>
  );
}