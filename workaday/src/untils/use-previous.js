import React, { useEffect, useRef } from "react";

export default function usePrevious(props) {
    const ref = useRef();
    useEffect(() => {
        ref.current = props.value;
    }, [])

    return ref.current;
}