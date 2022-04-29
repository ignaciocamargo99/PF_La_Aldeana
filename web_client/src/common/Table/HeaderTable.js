export default function HeaderTable(props){
    return(
        <thead style={props.style}>
            <tr id={props.id}>
                {props.th}
            </tr>
        </thead>     
    );
}