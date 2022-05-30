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
        margin: 10,
        padding: 10,
        marginTop: '35%'
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
        paddingBottom: 15,
        paddingTop: 15,
        color: 'grey',
    },
    mainTitle: {
        fontSize: 20,
        textAlign: 'center',
    },
    text: {
        fontSize: 10,
    },
    money: {
        fontSize: 10,
        textAlign: 'right',
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
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
        textAlign: 'center',
        marginBottom: 10,
    },
    image: {
        marginVertical: 30,
        marginHorizontal: 50,
    },
    logo: {
        marginVertical: 10,
        marginHorizontal: 150,
    },
});

export default styles;