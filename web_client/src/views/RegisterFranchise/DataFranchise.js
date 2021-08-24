import AddressFranchise from './components/AddressFranchise';
import AddressNumberFrabchise from "./components/AddressNumberFrabchise";
import CityFranchise from './components/CityFranchise';
import ProvinceFranchise from './components/ProvinceFranchise';
import StartDate from "./components/StartDate";
import NameFranchise from "./components/NameFranchise";

const DataFranchise = (props) => {

    const load = (childData) => {
        props.load(childData);
    }
    return (
        <>
            <NameFranchise load={load} data={props.data} />
            <StartDate load={load} data={props.data} />
            <AddressFranchise load={load} data={props.data} />
            <AddressNumberFrabchise load={load} data={props.data} />
            <CityFranchise load={load} data={props.data} />
            <ProvinceFranchise load={load} data={props.data} />
        </>
    );
}

export default DataFranchise;