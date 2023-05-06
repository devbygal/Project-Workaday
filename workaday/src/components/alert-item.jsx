import { Alert, Box, Center, CloseIcon, HStack, Icon, IconButton, PresenceTransition, Text, useColorModeValue, View, VStack } from "native-base";
import React, { useContext } from "react";
import { AlertContext } from "./context/AlertContext";

const AlertItem = ({ shopping }) => {
    const { show, setShow, taskSubject, productQuantity } = useContext(AlertContext);

    return (
        <PresenceTransition style={{
            display: show ? "flex" : "none",
            // position: 'absolute',
            // top: -350,
            // left: 0,
            // right: 0,
            // bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: useColorModeValue('#000', '#fff'),
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
        }} visible={show} initial={{
            opacity: 0,
            scale: 0
        }} animate={{
            opacity: 1,
            scale: 1,
            transition: {
                duration: 250
            }
        }}>
            <View w={"full"} px={1}>
                <Alert maxW="400" status="info" colorScheme="info" bg={useColorModeValue('warmGray.200', 'primary.800')} borderRadius={10}>
                    <VStack space={2} flexShrink={1} w="100%">
                        <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                            <HStack flexShrink={1} space={2} alignItems="center">
                                <Alert.Icon />
                                <Text fontSize="md" fontWeight="medium" color={useColorModeValue('darkText', 'warmGray.50')}>
                                    Task
                                </Text>
                            </HStack>
                            <IconButton variant="unstyled" _focus={{
                                borderWidth: 0
                            }} icon={<CloseIcon size="3" />} _icon={{
                                color: useColorModeValue('darkText', 'lightText')
                            }} onPress={() => setShow(false)} />
                        </HStack>
                        <Box pl="6" _text={{
                            color: useColorModeValue('darkText', 'lightText')
                        }}>
                            {taskSubject}
                        </Box>
                        {shopping &&
                            <Box pl="6" _text={{
                                color: useColorModeValue('darkText', 'lightText')
                            }}>
                                <HStack>
                                    <Text>
                                        <Text color={useColorModeValue('blue.600', 'blue.300')}>
                                            Quantity: {}
                                        </Text>
                                        {productQuantity}
                                    </Text>
                                </HStack>
                            </Box>
                        }
                    </VStack>
                </Alert>
            </View>
        </PresenceTransition>
    );
}

export default AlertItem;