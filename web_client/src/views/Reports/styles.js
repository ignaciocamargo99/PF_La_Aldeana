import { StyleSheet } from '@react-pdf/renderer';
// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    sectionFace: {
        alignContent: 'center',
        flexDirection: 'row',   
        marginBottom: '5mm',
    },
    section: {
        margin: 10,
        padding: 10,
    },
    row: {
        flexDirection: 'row',     
    },
    col: {
        borderWidth: '2px',
        width: '1000em',
        textAlign: 'center',
        margin: '-1px',
    },
    col6: {
        borderWidth: '2px',
        textAlign: 'center',
        margin: '-1px',
        width: '140cm',
    },
    col4: {
        borderWidth: '2px',
        textAlign: 'center',
        margin: '-1px',
        width: '17.4cm',
    },
    col5: {
        borderWidth: '2px',
        textAlign: 'center',
        margin: '-1px',
        width: '22.3cm',
    },
    col3: {
        borderWidth: '2px',
        textAlign: 'center',
        margin: '-1px',
        width: '500em',
    },
    col7: {
        borderWidth: '2px',
        textAlign: 'center',
        margin: '-1px',
        width: '10cm',
    },
    col8: {
        borderWidth: '2px',
        textAlign: 'center',
        margin: '-1px',
        width: '5cm',
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        color: 'grey',
        marginBottom: 10,
        padding: '2mm',
    },
    mainTitle: {
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 'auto',
    },
    text: {
        fontSize: 10,
        textAlign: 'left',
        padding: '2mm',
    },
    money: {
        fontSize: 10,
        textAlign: 'right',
        padding: '2mm',
    },
    total: {
        fontSize: 10,
        textAlign: 'right',
        backgroundColor: '#2284B6',
        color: 'white',
        padding: '2mm',
    },
    division: {
        flexDirection: 'row',
        backgroundColor: '#808080',
        color: 'white',
    },
    header: {
        fontSize: 12,
        marginLeft: 'auto',
        color: 'grey',
    },
    subtitle: {
        fontSize: 14,
        paddingLeft: '3px',
        paddingRight: '3px',
        color: 'grey',
        padding: '2mm',
    },
    detail: {
        fontSize: 12,
        marginLeft: 'auto',
    },
    image: {
        marginVertical: 30,
        marginHorizontal: 50,
    },
    logo: {
        width: '150px',
        height: '70px',
        marginLeft: 'auto'
    },
    pageNumbers: {
      position: 'absolute',
      bottom: 20,
      fontSize: 12,
      left: 0,
      right: 0,
      textAlign: 'center'
    },
    division: {
        flexDirection: 'row',
        backgroundColor: '#808080',
        color: 'white',
    },
    total: {
        fontSize: 10,
        textAlign: 'right',
        backgroundColor: '#2284B6',
        color: 'white',
        padding: '2mm',
    },
});

export default styles;