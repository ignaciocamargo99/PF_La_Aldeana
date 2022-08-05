import React from "react";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import dateFormat from "../../../utils/DateFormat/dateFormat";
import dataChartToURLWhenHaveTwoDataSets from "utils/dataChartToURLWhenHaveTwoDataSets";
import styles from "../styles";
import dateText from "utils/DateFormat/dateText";

// Create Document Component
export default function MyDocument({
  title,
  description,
  user,
  chart,
  salesData,
}) {
  return (
    <>
      <Document>
        <Page
          size="A4"
          style={styles.page}
          title={
            dateFormat(new Date()) +
            "- VentasEnElLocal - " +
            title +
            " - " +
            description
          }
          author={"Heladería y cafetería - La Aldeana"}
        >
          <View style={styles.sectionFace} fixed>
            <Text style={{ textAlign: "left", width: "400px" }} fixed>
              <Text style={styles.header}>
                {dateText(dateFormat(new Date()), true, true) + "\n"}
              </Text>
              <Text style={styles.mainTitle}>~ Ventas en el local ~{"\n"}</Text>
              <Text style={styles.detail}>{description + "\n"}</Text>
              <Text style={styles.detail}>Generado por: {user + "\n"}</Text>
              <Text style={styles.header}>{title}</Text>
            </Text>
            <Image
              style={styles.logo}
              src="/static/media/logo_expandido.1a36dfef.png"
              fixed
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Ventas en el local por turnos</Text>
            <Image
              style={{
                height: "375px",
                width: "80%",
                marginLeft: "10%",
                marginBottom: "10px",
              }}
              src={dataChartToURLWhenHaveTwoDataSets(chart)}
            ></Image>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Tipo de pago</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Cantidad de uds. vendidas</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Monto total (ARS)</Text>
              </View>
            </View>
            {Object.values(salesData).map((dataSalePerPayType) => {
              let totalPerPayType = 0;
              dataSalePerPayType.forEach(
                (sale) =>
                  (totalPerPayType = totalPerPayType + sale.total_amount)
              );
              return (
                <>
                  <View style={styles.row}>
                    <View style={styles.col}>
                      <Text style={styles.text}>
                        {dataSalePerPayType[0].name}
                      </Text>
                    </View>
                    <View style={styles.col}>
                      <Text style={styles.money}>
                        {dataSalePerPayType.length + " uds."}
                      </Text>
                    </View>
                    <View style={styles.col}>
                      <Text style={styles.money}>{"$" + totalPerPayType}</Text>
                    </View>
                  </View>
                </>
              );
            })}
          </View>
          <Text
            style={styles.pageNumbers}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    </>
  );
}
