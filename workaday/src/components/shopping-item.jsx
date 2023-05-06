import React, { useCallback, useContext } from "react";
import { PanGestureHandlerProps } from "react-native-gesture-handler";
import { Pressable, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { Box, HStack, useTheme, themeTools, useColorModeValue, Icon, Input, Text, Button } from 'native-base';
import AnimatedCheckbox from "./animated-checkbox";
import AnimatedTaskLabel from "./animated-task-label";
import SwipableView from "./swipable-view";
import { Feather } from '@expo/vector-icons';
import InfoButton from "./info-button";
import { AlertContext } from "./context/AlertContext";
import { AntDesign } from '@expo/vector-icons';

const ShoppingItem = (props) => {
    const { isEditing, isDone, onToggleCheckbox, subject, onPressLabel, onRemove, onChangeSubject, onFinishEditing, quantity, onQuantityItem, simultaneousHandlers } = props;

    const { show, setShow, setTaskSubject, setQuantity } = useContext(AlertContext);

    const theme = useTheme();

    const highlightColor = themeTools.getColor(
        theme,
        useColorModeValue('blue.500', 'blue.400'),
    );
    const boxStroke = themeTools.getColor(
        theme,
        useColorModeValue('muted.300', 'muted.500'),
    );
    const checkmarkColor = themeTools.getColor(
        theme,
        useColorModeValue('white', 'white'),
    );
    const activeTextColor = themeTools.getColor(
        theme,
        useColorModeValue('darkText', 'lightText'),
    );
    const doneTextColor = themeTools.getColor(
        theme,
        useColorModeValue('muted.400', 'muted.600'),
    );

    const handleChangeSubject = useCallback((event) => {
        onChangeSubject && onChangeSubject(event.nativeEvent.text);
    }, [onChangeSubject])

    const handleQuantityItemMinus = useCallback((event) => {
        if (quantity <= 1) {
            onQuantityItem(quantity);
        } else {
            onQuantityItem(quantity - 1);
        }
    }, [onQuantityItem])

    const handleQuantityItemPlus = useCallback((event) => {
        onQuantityItem(quantity + 1);
    }, [onQuantityItem])

    return (
        <HStack opacity={show ? 0.2 : 1}>
            <SwipableView simultaneousHandlers={simultaneousHandlers} onSwipeLeft={onRemove} backView={
                <Box w={"full"} h={"full"} bg="red.500" alignItems={"flex-end"} justifyContent={"center"} pr={4}>
                    <Icon color={"white"} as={<Feather name="trash-2" />} size="sm" />
                </Box>
            }>
                <HStack alignItems={"center"} w={"full"} px={4} py={2} bg={useColorModeValue('warmGray.50', 'primary.900')}>
                    <Box width={30} height={30} mr={2}>
                        <Pressable onPress={onToggleCheckbox}>
                            <AnimatedCheckbox
                                highlightColor={highlightColor}
                                checkmarkColor={checkmarkColor}
                                boxOutlineColor={boxStroke}
                                checked={isDone}
                            />
                        </Pressable>
                    </Box>
                    {isEditing ? (
                        <Input
                            placeholder="Task"
                            value={subject}
                            variant={"unstyled"}
                            fontSize={19}
                            px={1}
                            py={0}
                            autoFocus
                            blurOnSubmit
                            onChange={handleChangeSubject}
                            onBlur={onFinishEditing}
                            w={180}
                        />
                    ) : (
                        <AnimatedTaskLabel quantity={quantity} textColor={activeTextColor} inactiveTextColor={doneTextColor} strikethrough={isDone} onPress={onPressLabel}>
                            {subject}
                        </AnimatedTaskLabel>
                    )}
                    <HStack backgroundColor={useColorModeValue("primary.100", "primary.100")} style={{
                            borderRadius: 50,
                            marginLeft: 10,
                        }}>
                        <Button style={{
                            backgroundColor: "transprent",
                        }}
                        onPress={handleQuantityItemMinus}
                        >
                            <AntDesign name="left" size={"sm"} color="#000" />
                        </Button>
                        <Text fontSize={20} color={"#000"}>{quantity}</Text>
                        <Button style={{
                            backgroundColor: "transprent",
                        }}
                        onPress={handleQuantityItemPlus}
                        >
                            <AntDesign name="right" size={"sm"} color="#000" />
                        </Button>
                    </HStack>
                    {subject.length > 19 &&
                        <InfoButton
                            onPress={() => {
                                setShow(true);
                                setTaskSubject(subject);
                                setQuantity(quantity);
                            }}
                            icon="info"
                        />
                    }
                </HStack>
            </SwipableView>
        </HStack>
    );
}

export default ShoppingItem;