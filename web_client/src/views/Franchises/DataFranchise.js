import AddressFranchise from './components/DataFranchise/AddressFranchise';
import AddressNumberFranchise from "./components/DataFranchise/AddressNumberFranchise";
import CityFranchise from './components/DataFranchise/CityFranchise';
import ProvinceFranchise from './components/DataFranchise/ProvinceFranchise';
import StartDate from "./components/DataFranchise/StartDate";
import NameFranchise from "./components/DataFranchise/NameFranchise";

const DataFranchise = (props) => {

    const load = (childData) => {
        props.load(childData);
    }
    return (
        <>
            <NameFranchise load={load} data={props.data} />
            <StartDate load={load} data={props.data} />
            <AddressFranchise load={load} data={props.data} />
            <AddressNumberFranchise load={load} data={props.data} />
            <CityFranchise load={load} data={props.data} />
            <ProvinceFranchise load={load} data={props.data} />
        </>
    );
}

export default DataFranchise;