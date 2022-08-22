import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import dateFormat from '../../../../utils/DateFormat/dateFormat';
import styles from 'views/Reports/styles';
import dateText from 'utils/DateFormat/dateText';

// Create Document Component
export default function MyDocument (props) {
  let family = -1;

  return (
    <>
      <Document>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Comprobante de venta mayorista - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
          <View style={styles.sectionFace}>
            <Text style={{textAlign: 'left', width: '400px'}} fixed>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),true, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Comprobante de venta mayorista ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" fixed/>
          </View>
            <Text style={styles.title}>Franquicia</Text>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Nombre</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.text}>{props.wholesaleFranchise.name}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Dirección</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.text}>{props.wholesaleFranchise.province + ' - ' + props.wholesaleFranchise.city + ' - ' + props.wholesaleFranchise.address + ' ' + props.wholesaleFranchise.address_number}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Franquiciado</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.text}>{props.wholesaleFranchise.last_name_manager + ', ' + props.wholesaleFranchise.name_manager}</Text>
              </View>
            </View>
            <Text style={{margin: '1cm'}}> </Text>
          <Text style={styles.title}>Resumen</Text>
            <>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Nombre</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.subtitle}>$</Text>
              </View>
            </View>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text style={styles.text}>Sabores de helados</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.money}>$ {props.subtotals.subtotalFlavors}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text style={styles.text}>Insumos</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.money}>$ {props.subtotals.subtotalSupplies}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text style={styles.text}>Flete</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.money}>$ {props.wholesaleTransportCost}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text style={styles.text}>Total</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.total}>$ {props.subtotals.total}</Text>
                </View>
              </View>
            </>
            <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                          `${pageNumber} / ${totalPages}`
                        )} fixed />
        </Page>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Comprobante de venta mayorista - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
        <View style={styles.sectionFace}>
            <Text style={{textAlign: 'left', width: '400px'}} fixed>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),true, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Comprobante de venta mayorista ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" fixed/>
          </View>
          <Text style={styles.title}>Sabores de Helados</Text>
            <View style={styles.row}>
              <View style={styles.col4}>
                <Text style={styles.subtitle}>Nombre/ Familia</Text>
              </View>
              <View style={styles.col8}>
                <Text style={styles.subtitle}>Peso total</Text>
              </View>
              <View style={styles.col7}>
                <Text style={styles.subtitle}>Precio por Kilo/ Tipo</Text>
              </View>
              <View style={styles.col7}>
                <Text style={styles.subtitle}>Subtotal/ Cantidad de baldes</Text>
              </View>
            </View>
            {props.wholesaleFlavors?.map((element, i) => {
              let weight = props.wholesaleBucketsWeights.find(e => +element.FlavorType.idFlavorType === +e.idFlavorType).weight;
              if(+family !== +element.FlavorType.idFlavorType){
                family = +element.FlavorType.idFlavorType;
                return (
                  <>
                    <View style={styles.division}>
                      <View style={styles.col4}>
                        <Text style={styles.text}>{element.FlavorType.name}</Text>
                      </View>
                      <View style={styles.col8}>
                        <Text style={styles.money}>{weight} kg.</Text>
                      </View>
                      <View style={styles.col7}>
                        <Text style={styles.money}>$ {element.FlavorType.price}</Text>
                      </View>
                      <View style={styles.col7}>
                        <Text style={styles.money}>$ {element.FlavorType.price * weight}</Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <View style={styles.col5}>
                        <Text style={styles.text}>{element.name}</Text>
                      </View>
                      <View style={styles.col7}>
                        <Text style={styles.text}>{element.FlavorFamily.name}</Text>
                      </View>
                      <View style={styles.col7}>
                        <Text style={styles.money}>{element.amountToSell} uds.</Text>
                      </View>
                    </View>
                  </>
                )
              } else {
                return (
                  <>
                    <View style={styles.row}>
                      <View style={styles.col5}>
                        <Text style={styles.text}>{element.name}</Text>
                      </View>
                      <View style={styles.col7}>
                        <Text style={styles.text}>{element.FlavorFamily.name}</Text>
                      </View>
                      <View style={styles.col7}>
                        <Text style={styles.money}>{element.amountToSell} uds.</Text>
                      </View>
                    </View>
                  </>
                )
              }
            })}
            <>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text style={styles.text}>Total</Text>
                </View>
                <View style={{
        borderWidth: '2px',
        textAlign: 'center',
        margin: '-1px',
        width: '11.0cm',}}>
                  <Text style={styles.total}>$ {props.subtotals.subtotalFlavors}</Text>
                </View>
              </View>
            </>
            <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                          `${pageNumber} / ${totalPages}`
                        )} fixed />
        </Page>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Comprobante de venta mayorista - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
        <View style={styles.sectionFace}>
            <Text style={{textAlign: 'left', width: '400px'}} fixed>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),true, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Comprobante de venta mayorista ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" fixed/>
          </View>
          <Text style={styles.title}>Insumos</Text>
            <View style={styles.row}>
              <View style={styles.col4}>
                <Text style={styles.subtitle}>Nombre</Text>
              </View>
              <View style={styles.col4}>
                <Text style={styles.subtitle}>Cantidad</Text>
              </View>
              <View style={styles.col4}>
                <Text style={styles.subtitle}>Precio</Text>
              </View>
              <View style={styles.col4}>
                <Text style={styles.subtitle}>Subtotal</Text>
              </View>
            </View>
            {props.wholesaleSupplies?.map((element, i) => {
              return (
                <>
                  <View style={styles.row}>
                    <View style={styles.col4}>
                      <Text style={styles.text}>{element.name}</Text>
                    </View>
                    <View style={styles.col4}>
                      <Text style={styles.money}>{element.amountToSell} uds.</Text>
                    </View>
                    <View style={styles.col4}>
                      <Text style={styles.text}>$ {element.price_wholesale}</Text>
                    </View>
                    <View style={styles.col4}>
                      <Text style={styles.money}>$ {element.price_wholesale * element.amountToSell}</Text>
                    </View>
                  </View>
                </>
              )
            })}
            <>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text style={styles.text}>Total</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.total}>$ {props.subtotals.subtotalSupplies}</Text>
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