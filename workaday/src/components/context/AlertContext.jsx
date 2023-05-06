import React, { createContext, useState } from "react";

const initialState = {
    show: false,
    taskSubject: '',
    productQuantity: 1
};

export const AlertContext = createContext(initialState);

export const AlertProvider = ({ children }) => {
    const [ show, setShow ] = useState(false);
    const [ taskSubject, setTaskSubject ] = useState('');
    const [ productQuantity, setQuantity ] = useState(1);

    return (
        <AlertContext.Provider value={{ show, setShow, taskSubject, setTaskSubject, productQuantity, setQuantity }}>
            {children}
        </AlertContext.Provider>
    );
}
