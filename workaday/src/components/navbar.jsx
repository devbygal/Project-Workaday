import React, { useCallback, useContext, useEffect, useState } from "react";
import { HStack, IconButton, useColorMode, useColorModeValue } from "native-base";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { BottomSheetContext } from "./context/BottomSheetContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NavBar = () => {
    const [ theme, setTheme ] = useState('');
    const { colorMode, toggleColorMode } = useColorMode();
    const { openBottomSheet } = useContext(BottomSheetContext);

    const navigation = useNavigation();
    const handlePressMenuButton = useCallback(() => {
        navigation.openDrawer();
    }, [navigation])

    useEffect(() => {
        AsyncStorage.getItem('ColorMode', (error, result) => {
            if (result !== null) {
                setTheme(result);
            } else {
                console.log(error);
            }
        });
    }, [colorMode])

    return (
        <HStack w={"full"} h={40} justifyContent={"space-between"} alignItems="center" alignContent={"center"} p={4}>
            <IconButton onPress={handlePressMenuButton} borderRadius={100} _icon={{
                as: Feather,
                name: 'menu',
                size: 6,
                color: useColorModeValue("white", "white")
            }}/>
            <IconButton onPress={toggleColorMode} borderRadius={100} _icon={{
                as: Feather,
                name: theme === 'light' ? 'sun' : 'moon',
                size: 6,
                color: useColorModeValue("white", "white")
            }}/>
        </HStack>
    );
}

export default NavBar;