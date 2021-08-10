import NameManager from './components/NameManager';
import LastNameManager from './components/LastNameManager';
import DniManager from './components/DniManager';

const DataManager = (props) => {

    const load = (childData) => {
        props.load(childData);
    }

    return (
        <>
            <h5>Franquiciado</h5>
            <NameManager load={load} data={props.data} />
            <LastNameManager load={load} data={props.data} />
            <DniManager load={load} data={props.data} />
        </>
    );
}

export default DataManager;