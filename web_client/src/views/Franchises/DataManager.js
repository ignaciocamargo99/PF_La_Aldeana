import NameManager from './components/DataFranchise/NameManager';
import LastNameManager from './components/DataFranchise/LastNameManager';
import DniManager from './components/DataFranchise/DniManager';

const DataManager = (props) => {

    const load = (childData) => {
        props.load(childData);
    }

    return (
        <>
            <h5 style={{fontSize: '2rem' }}>Franquiciado</h5>
            <NameManager load={load} data={props.data} />
            <LastNameManager load={load} data={props.data} />
            <DniManager load={load} data={props.data} />
        </>
    );
}

export default DataManager;