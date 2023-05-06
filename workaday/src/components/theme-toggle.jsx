import React, { useEffect, useState } from "react";
import { Icon, useColorMode, Text, HStack, Switch, View, Row } from "native-base";
import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ThemeToggle() {
    const { colorMode, toggleColorMode } = useColorMode();
    const [ theme, setTheme ] = useState('');
    
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
        <HStack space={2} alignItems={"center"} justifyContent={"space-around"} w="full">
            <Text>System Theme</Text>
            <Row space={2} alignItems={"center"}>
                <Text textTransform={"capitalize"}>{theme}</Text>
                <Switch isChecked={colorMode === 'light'} onToggle={toggleColorMode} size="sm"/>
            </Row>
        </HStack>
    );
}

// export default function ThemeToggle() {
//     const { colorMode, toggleColorMode } = useColorMode();
//     return (
//         <HStack space={2} alignItems='center'>
//             <Text>Dark</Text>
//             <Switch isChecked={colorMode === 'light'} onToggle={toggleColorMode}/>
//             <Text>Light</Text>
//         </HStack>
//     );
// }