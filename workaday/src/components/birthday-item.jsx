import React, { useCallback, useContext } from "react";
import { PanGestureHandlerProps } from "react-native-gesture-handler";
import { Pressable, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { Box, HStack, useTheme, themeTools, useColorModeValue, Icon, Input } from 'native-base';
import AnimatedTimebox from "./animated-timebox";
import AnimatedTaskLabel from "./animated-task-label";
import SwipableView from "./swipable-view";
import { Feather } from '@expo/vector-icons';
import InfoButton from "./info-button";
import { AlertContext } from "./context/AlertContext";

const BirthdayItem = (props) => {
    const { isEditing, isDone, onToggleCheckbox, subject, onPressLabel, onRemove, onChangeSubject, onFinishEditing, simultaneousHandlers } = props;

    const { show, setShow, setTaskSubject } = useContext(AlertContext);

    const theme = useTheme();

    const highlightColor = themeTools.getColor(
        theme,
        useColorModeValue('yellow.500', 'yellow.400'),
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
                            <AnimatedTimebox
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
                            w={280}
                        />
                    ) : (
                        <AnimatedTaskLabel textColor={activeTextColor} inactiveTextColor={doneTextColor} onPress={onPressLabel}>
                            {subject}
                        </AnimatedTaskLabel>
                    )}
                    {subject.length > 27 &&
                        <InfoButton
                            onPress={() => {
                                setShow(true);
                                setTaskSubject(subject);
                            }}
                            icon="info"
                        />
                    }
                </HStack>
            </SwipableView>
        </HStack>
    );
}

export default BirthdayItem;