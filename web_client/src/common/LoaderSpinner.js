import { Spinner } from 'reactstrap';

export default function LoaderSpinner(props) {
    return (
        <>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <Spinner color={props.color} />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <label className="text-muted" style={{ margin: '10px', padding: '10px 50px 50px 50px' }}>{props.loading}</label>
                </div>
            </div>
        </>
    );
}