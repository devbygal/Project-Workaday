import React, { createContext, useReducer } from "react";

const initialState = {
    isOpen: false,
};

export const BottomSheetContext = createContext(initialState);

const reducer = (state, action) => {
    switch (action.type) {
        case 'OPEN_BOTTOM_SHEET':
            return {
                ...state,
                isOpen: true,
            };
        case 'CLOSE_BOTTOM_SHEET':
            return {
                ...state,
                isOpen: false,
            };
        default:
            return state;
    }
}

export const BottomSheetProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const openBottomSheet = () => dispatch({ type: 'OPEN_BOTTOM_SHEET' });

    const closeBottomSheet = () => dispatch({ type: 'CLOSE_BOTTOM_SHEET' });

    return (
        <BottomSheetContext.Provider value={{ state, openBottomSheet, closeBottomSheet }}>
            {children}
        </BottomSheetContext.Provider>
    );
}
