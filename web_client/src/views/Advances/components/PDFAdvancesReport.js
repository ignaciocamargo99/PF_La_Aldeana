import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import dateFormat from '../../../utils/DateFormat/dateFormat';
import styles from '../../Reports/styles';
import { dateBDToString } from '../../../utils/ConverterDate/dateBDToString';

// Create Document Component
export default function MyDocument (props) {
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Adelantos - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
          <View style={styles.sectionFace}>
            <Text style={styles.header}>{dateFormat(new Date())}</Text>
            <Text style={styles.mainTitle}>~ Adelantos ~</Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" />
            <Text style={styles.detail}>{props.description}</Text>
            <Text style={styles.header}>{props.title}</Text>
          </View>
        </Page>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Adelantos - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'}>
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
                      <Text style={styles.text}>{license.amount}</Text>
                    </View>
                    <View style={styles.col7}>
                      <Text style={styles.text}>{license.pay}</Text>
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