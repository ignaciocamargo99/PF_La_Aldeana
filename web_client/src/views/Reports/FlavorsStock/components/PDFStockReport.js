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
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Stock de sabores de helados - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
          <View style={styles.sectionFace}>
            <Text style={{textAlign: 'left', width: '400px'}} fixed>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),true, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Stock de sabores de helados ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" fixed/>
          </View>
            <Text style={styles.title}>Análisis de Stock de sabores de helados</Text>
            <Text style={styles.subtitle}>Análisis proporcional (% sin decimales)</Text>
            <Image style={styles.image} src={dataChartToURL(props.totalisedChart)}></Image>
            <Text style={styles.detail}>Total de sabores: {props.totalisedChart.total} baldes</Text>
            <Text style={styles.subtitle}>Análisis nominal</Text>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Total de...</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Sabores</Text>
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
                      <Text style={styles.money}>{element.quantity}</Text>
                    </View>
                  </View>
                </>
              )
            })}
            <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                          `${pageNumber} / ${totalPages}`
                        )} fixed />
        </Page>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Stock de sabores de helados - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
        <View style={styles.sectionFace}>
            <Text style={{textAlign: 'left', width: '400px'}} fixed>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),true, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Stock de sabores de helados ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" fixed/>
          </View>
          <Text style={styles.title}>{props.stock[0].id}</Text>
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
                <Text style={styles.subtitle}>Stock (baldes)</Text>
              </View>
              <View style={styles.col4}>
                <Text style={styles.subtitle}>Punto de reorden (baldes)</Text>
              </View>
              <View style={styles.col4}>
                <Text style={styles.subtitle}>Diferencia con punto de reorden (baldes)</Text>
              </View>
            </View>
            {props.stock[0].list?.map(element => {
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
                      <Text style={styles.money}>{element.stock}</Text>
                    </View>
                    <View style={styles.col4}>
                      <Text style={styles.money}>{element.reorder_stock}</Text>
                    </View>
                    <View style={styles.col4}>
                      <Text style={styles.money}>{element.stock - element.reorder_stock}</Text>
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
                  <Text style={styles.total}>{props.stock[0].totals[0].quantity}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.total}>{props.stock[0].totals[1].quantity}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.total}>{props.stock[0].totals[0].quantity - props.stock[0].totals[1].quantity}</Text>
                </View>
              </View>
            </>
            <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                          `${pageNumber} / ${totalPages}`
                        )} fixed />
        </Page>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Stock de sabores de helados - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
        <View style={styles.sectionFace}>
            <Text style={{textAlign: 'left', width: '400px'}} fixed>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),true, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Stock de sabores de helados ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" fixed/>
          </View>
          <Text style={styles.title}>{props.stock[1].id}</Text>
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
                <Text style={styles.subtitle}>Stock (baldes)</Text>
              </View>
              <View style={styles.col4}>
                <Text style={styles.subtitle}>Punto de reorden (baldes)</Text>
              </View>
              <View style={styles.col4}>
                <Text style={styles.subtitle}>Diferencia con punto de reorden (baldes)</Text>
              </View>
            </View>
            {props.stock[1].list?.map(element => {
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
                      <Text style={styles.money}>{element.stock}</Text>
                    </View>
                    <View style={styles.col4}>
                      <Text style={styles.money}>{element.reorder_stock}</Text>
                    </View>
                    <View style={styles.col4}>
                      <Text style={styles.money}>{element.stock - element.reorder_stock}</Text>
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
                  <Text style={styles.total}>{props.stock[1].totals[0].quantity}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.total}>{props.stock[1].totals[1].quantity}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.total}>{props.stock[1].totals[0].quantity - props.stock[1].totals[1].quantity}</Text>
                </View>
              </View>
            </>
            <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                          `${pageNumber} / ${totalPages}`
                        )} fixed />
        </Page>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Stock de sabores de helados - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
        <View style={styles.sectionFace}>
            <Text style={{textAlign: 'left', width: '400px'}} fixed>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),true, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Stock de sabores de helados ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" fixed/>
          </View>
          <Text style={styles.title}>{props.stock[2].id}</Text>
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
                <Text style={styles.subtitle}>Stock (baldes)</Text>
              </View>
              <View style={styles.col4}>
                <Text style={styles.subtitle}>Punto de reorden (baldes)</Text>
              </View>
              <View style={styles.col4}>
                <Text style={styles.subtitle}>Diferencia con punto de reorden (baldes)</Text>
              </View>
            </View>
            {props.stock[2].list?.map(element => {
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
                      <Text style={styles.money}>{element.stock}</Text>
                    </View>
                    <View style={styles.col4}>
                      <Text style={styles.money}>{element.reorder_stock}</Text>
                    </View>
                    <View style={styles.col4}>
                      <Text style={styles.money}>{element.stock - element.reorder_stock}</Text>
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
                  <Text style={styles.total}>{props.stock[2].totals[0].quantity}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.total}>{props.stock[2].totals[1].quantity}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.total}>{props.stock[2].totals[0].quantity - props.stock[2].totals[1].quantity}</Text>
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