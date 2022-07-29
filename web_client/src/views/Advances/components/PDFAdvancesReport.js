import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import dateFormat from '../../../utils/DateFormat/dateFormat';
import styles from '../../Reports/styles';
import { dateBDToString } from '../../../utils/ConverterDate/dateBDToString';
import dateText from 'utils/DateFormat/dateText';

// Create Document Component
export default function MyDocument (props) {
  let total = 0;
  let pay = 0;
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Adelantos - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'} wrap>
          <View style={styles.sectionFace} fixed>
            <Text style={{textAlign: 'left', width: '400px'}}>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),true, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Adelantos ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" />
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Adelantos</Text>
            <View style={styles.row}>
              <View style={styles.col8}>
                <Text style={styles.subtitle}>DNI</Text>
              </View>
              <View style={styles.col4}>
                <Text style={styles.subtitle}>Empleado / Fecha de adelanto</Text>
              </View>
              <View style={styles.col7}>
                <Text style={styles.subtitle}>Monto total</Text>
              </View>
              <View style={styles.col7}>
                <Text style={styles.subtitle}>Pagado hasta la fecha</Text>
              </View>
            </View>
            {props.advances?.map(advance => {
              if(advance.title === true){
                total += advance.amount;
                pay += advance.pay;
              }
              return (
                <>{advance.title === true ?
                  <View style={styles.division}>
                    <View style={styles.col8}>
                      <Text style={styles.text}>{advance.nroDNI}</Text>
                    </View>
                    <View style={styles.col4}>
                      <Text style={styles.text}>{advance.fullName}</Text>
                    </View>
                    <View style={styles.col7}>
                      <Text style={styles.money}>$ {advance.amount}</Text>
                    </View>
                    <View style={styles.col7}>
                      <Text style={styles.money}>$ {advance.pay}</Text>
                    </View>
                  </View>:
                  <View style={styles.row}>
                    <View style={styles.col5}>
                      <Text style={styles.text}>{dateBDToString(advance.date, 'Es')}</Text>
                    </View>
                    <View style={styles.col7}>
                      <Text style={styles.money}>$ {advance.amount}</Text>
                    </View>
                    <View style={styles.col7}>
                      <Text style={styles.money}>$ {advance.pay}</Text>
                    </View>
                  </View>
                  }
                </>
              )
            })}
            <View style={styles.row}>
              <View style={styles.col5}>
                <Text style={styles.text}>Total</Text>
              </View>
              <View style={styles.col7}>
                <Text style={styles.total}>$ {total}</Text>
              </View>
              <View style={styles.col7}>
                <Text style={styles.total}>$ {pay}</Text>
              </View>
            </View>
            </View>
            <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
              `${pageNumber} / ${totalPages}`
            )} fixed />
        </Page>
      </Document>
    </>
  );
}