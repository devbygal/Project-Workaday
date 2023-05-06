import React, { useCallback } from "react";
import { Image, HStack, VStack, Center, Avatar, Heading, IconButton, useColorModeValue, useColorMode } from "native-base";
import { DrawerContentComponent } from '@react-navigation/drawer';
import AnimatedColorBox from "./animated-color-box";
import { Feather } from '@expo/vector-icons';
import MenuButton from './menu-button';
import { Dimensions } from "react-native";
import ThemeToggle from './theme-toggle';

const Sidebar = (props) => {
    const { colorMode } = useColorMode();
    const { state, navigation } = props;
    const currentRoute = state.routeNames[state.index];

    const handlePressBackButton = useCallback(() => {
        navigation.closeDrawer();
    }, [navigation])

    const handlePressMenuMain = useCallback(() => {
        navigation.navigate('Main');
    }, [navigation])

    const handlePressShopping = useCallback(() => {
        navigation.navigate('Shopping');
    }, [navigation])

    const handlePressBirthday = useCallback(() => {
        navigation.navigate('Birthday');
    }, [navigation])

    return (
        <AnimatedColorBox 
            safeArea 
            flex={1}
            bg={useColorModeValue('blue.50', 'darkBlue.800')}
            p={7}
        >
            <VStack flex={1} space={2}>
                <HStack justifyContent={"flex-end"}>
                    <IconButton 
                        onPress={handlePressBackButton}
                        borderRadius={100}
                        variant="outline"
                        borderColor={useColorModeValue('blue.300', 'darkBlue.700')}
                        _icon={{
                            as: Feather,
                            name: 'chevron-left',
                            size: 6,
                            color: useColorModeValue('blue.800', 'darkBlue.700')
                        }}
                    />
                </HStack>
                {/* <Avatar 
                    source={require('../assets/images/Masthead.png')} 
                    size="xl"
                    borderRadius={100}
                    mb={6}
                    borderColor="secondary.500"
                    borderWidth={3}
                /> */}
            {/* <Heading mb={4} size="xl">
                Gal
            </Heading> */}
            {/* <Image 
                source={colorMode === 'light' ? require('../assets/images/Logo.png') : require('../assets/images/Logo-white.png')}
                style={{
                    width: 150,
                    height: 36,
                    marginBottom: 40,
                }}
            /> */}
            <MenuButton 
                active={currentRoute === 'Main'} 
                onPress={handlePressMenuMain}
                icon="inbox"
            >
                Daily Tasks
            </MenuButton>
            <MenuButton 
                active={currentRoute === 'Shopping'} 
                onPress={handlePressShopping}
                icon="shopping-cart"
            >
                Shopping Task 
            </MenuButton>
            <MenuButton 
                active={currentRoute === 'Birthday'} 
                onPress={handlePressBirthday}
                icon="gift"
            >
                Birthday Time 
            </MenuButton>
            </VStack>
            {/* <ThemeToggle /> */}
        </AnimatedColorBox>
    );
}

export default Sidebar;