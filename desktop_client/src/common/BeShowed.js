import React from "react";

export default function BeShowed(props) {
    if (props.show) {
        return props.children;
    } else {
        return <></>
    }
}