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
    col4: {
        borderWidth: '2px',
        textAlign: 'center',
        margin: '-1px',
        width: '17.4cm',
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
        width: '200em',
    },
    col8: {
        borderWidth: '2px',
        textAlign: 'center',
        margin: '-1px',
        width: '100em',
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        color: 'grey',
        marginBottom: 10,
    },
    mainTitle: {
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 'auto',
    },
    text: {
        fontSize: 10,
        textAlign: 'left',
        padding: '1mm',
    },
    money: {
        fontSize: 10,
        textAlign: 'right',
        padding: '1mm',
    },
    total: {
        fontSize: 10,
        textAlign: 'right',
        backgroundColor: '#2284B6',
        color: 'white',
        padding: '1mm',
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
        fontSize: 16,
        paddingLeft: '3px',
        paddingRight: '3px',
        color: 'grey',
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
});

export default styles;