export default function BeShowed(props) {
    if (props.show) {
        return props.children;
    } else {
        return <></>
    }
}