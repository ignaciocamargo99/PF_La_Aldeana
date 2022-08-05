import React from "react";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import dateFormat from "../../../utils/DateFormat/dateFormat";
import dataChartToURL from "utils/dataChartToURL";
import styles from "../styles";
import dateText from "utils/DateFormat/dateText";

// Create Document Component
export default function MyDocument({
  title,
  description,
  user,
  chart,
  dataSales,
}) {
  return (
    <>
      <Document>
        <Page
          size="A4"
          style={styles.page}
          title={
            dateFormat(new Date()) +
            "- VentasTotales - " +
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
              <Text style={styles.mainTitle}>~ Ventas totales ~{"\n"}</Text>
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
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Tipo de venta</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Cantidad de ventas</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.subtitle}>Monto total (ARS)</Text>
              </View>
            </View>
            {dataSales.map((dataSale) => {
              return (
                <>
                  <View style={styles.row}>
                    <View style={styles.col}>
                      <Text style={styles.text}>
                        {dataSale.isOnsite === 1
                          ? "Venta en el local"
                          : dataSale.isOnsite === 0
                          ? "Venta por delivery"
                          : "Venta a franquicia"}
                      </Text>
                    </View>
                    <View style={styles.col}>
                      <Text style={styles.money}>
                        {dataSale.quantity_sales + " uds."}
                      </Text>
                    </View>
                    <View style={styles.col}>
                      <Text style={styles.money}>
                        {"$" + parseInt(dataSale.total)}
                      </Text>
                    </View>
                  </View>
                </>
              );
            })}
          </View>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "grey",
              marginBottom: 0,
              paddingBottom: 0,
            }}
          >
            Porcentaje de ventas totales realizadas
          </Text>
          <Image
            style={{ marginVertical: 0, marginHorizontal: 50 }}
            src={dataChartToURL(chart)}
          ></Image>
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
