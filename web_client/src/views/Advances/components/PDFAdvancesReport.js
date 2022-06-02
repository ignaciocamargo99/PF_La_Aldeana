import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import dateFormat from '../../../utils/DateFormat/dateFormat';
import styles from '../../Reports/styles';
import { dateBDToString } from '../../../utils/ConverterDate/dateBDToString';
import dateText from 'utils/DateFormat/dateText';

// Create Document Component
export default function MyDocument (props) {
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Adelantos - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'} wrap>
          <View style={styles.sectionFace} fixed>
            <Text style={{textAlign: 'left', width: '400px'}}>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),true, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Adelantos ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" />
          </View>
            <Text style={styles.title}>Adelantos</Text>
            <View style={styles.row}>
              <View style={styles.col8}>
                <Text style={styles.subtitle}>DNI</Text>
              </View>
              <View style={styles.col7}>
                <Text style={styles.subtitle}>Empleado</Text>
              </View>
              <View style={styles.col7}>
                <Text style={styles.subtitle}>Fecha de adelanto</Text>
              </View>
              <View style={styles.col7}>
                <Text style={styles.subtitle}>Monto total</Text>
              </View>
              <View style={styles.col7}>
                <Text style={styles.subtitle}>Pagado hasta la fecha</Text>
              </View>
            </View>
            {props.advances?.map(license => {
              return (
                <>
                  <View style={styles.row}>
                    <View style={styles.col8}>
                      <Text style={styles.text}>{license.nroDNI}</Text>
                    </View>
                    <View style={styles.col7}>
                      <Text style={styles.text}>{license.fullName}</Text>
                    </View>
                    <View style={styles.col7}>
                      <Text style={styles.text}>{dateBDToString(license.date, 'Es')}</Text>
                    </View>
                    <View style={styles.col7}>
                      <Text style={styles.money}>{license.amount}</Text>
                    </View>
                    <View style={styles.col7}>
                      <Text style={styles.money}>{license.pay}</Text>
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