import React from "react";
import { Button, Icon, useColorMode, useColorModeValue } from "native-base";
import { Feather } from '@expo/vector-icons';

const MenuButton = ({ active, icon, children, ...props }) => {
    const { colorMode } = useColorMode();
    const colorScheme = useColorModeValue('blue', 'darkBlue');
    const inactiveTextColor = useColorModeValue('blue.500', undefined);
    const pressedBgColor = useColorModeValue('primary.100', 'primary.600');

    return (
        <Button 
            size={"lg"} 
            colorScheme={colorScheme} 
            bg={active ? undefined : 'transparent'}
            _pressed={{
                bg: pressedBgColor
            }}
            _text={{
                color: active ? 'blue.50' : inactiveTextColor
            }}
            variant="solid"
            justifyContent={"flex-start"}
            leftIcon={<Icon as={Feather} name={icon} size="md" color={colorMode === 'light' ? "blue.900": "blue.50"} opacity={active ? 1 : 0.5} />}
            {...props}
        >
            {children}
        </Button>
    );
}

export default MenuButton;