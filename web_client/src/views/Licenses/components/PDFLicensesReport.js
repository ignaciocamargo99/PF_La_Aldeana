import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import dateFormat from '../../../utils/DateFormat/dateFormat';
import styles from '../../Reports/styles';
import { dateBDToString } from '../../../utils/ConverterDate/dateBDToString';
import dateText from 'utils/DateFormat/dateText';

// Create Document Component
export default function MyDocument (props) {
  const date = new Date().setHours(0, 0, 0, 0);

  return (
    <>
      <Document>
        <Page size="A4" style={styles.page} title={dateFormat(new Date()) + '- Licencias - ' + props.title + ' - ' + props.description} author={'Heladería y cafetería - La Aldeana'} wrap>
          <View style={styles.sectionFace} fixed>
            <Text style={{textAlign: 'left', width: '400px'}}>
              <Text style={styles.header}>{dateText(dateFormat(new Date()),true, true) +'\n'}</Text>
              <Text style={styles.mainTitle}>~ Licencias ~{'\n'}</Text>
              <Text style={styles.detail}>{props.description +'\n'}</Text>
              <Text style={styles.detail}>Generado por: {props.user +'\n'}</Text>
              <Text style={styles.header}>{props.title}</Text>
            </Text>
            <Image style={styles.logo} src="/static/media/logo_expandido.1a36dfef.png" />
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Licencias</Text>
            <View style={styles.row}>
              <View style={styles.col7}>
                <Text style={styles.subtitle}>Inicio</Text>
              </View>
              <View style={styles.col7}>
                <Text style={styles.subtitle}>Fin</Text>
              </View>
              <View style={styles.col3}>
                <Text style={styles.subtitle}>Empleado</Text>
              </View>
              <View style={styles.col3}>
                <Text style={styles.subtitle}>Motivo</Text>
              </View>
            </View>
            {props.licenses?.map(license => {
              if ( (props.filter === "All") ||
                (props.filter === "Finish" && (new Date(dateBDToString(license.date_finish, 'En')).getTime() < date)) ||
                (props.filter === "Current" && (new Date(dateBDToString(license.date_init, 'En')).getTime() <= date) && (new Date(dateBDToString(license.date_finish, 'En')).getTime() >= date)) ||
                (props.filter === "OnComing" && (new Date(dateBDToString(license.date_init, 'En')).getTime() > date))) {
              return (
                <>
                  <View style={styles.row}>
                    <View style={styles.col7}>
                      <Text style={styles.text}>{dateBDToString(license.date_init, 'Es')}</Text>
                    </View>
                    <View style={styles.col7}>
                      <Text style={styles.text}>{dateBDToString(license.date_finish, 'Es')}</Text>
                    </View>
                    <View style={styles.col3}>
                      <Text style={styles.text}>{license.fullName}</Text>
                    </View>
                    <View style={styles.col3}>
                      <Text style={styles.text}>{license.reason}</Text>
                    </View>
                  </View>
                </>
              )}
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