import {Spinner} from 'reactstrap';

export default function LoaderSpinner(props){
    return(
        <Spinner color={props.color}/>
    );
}