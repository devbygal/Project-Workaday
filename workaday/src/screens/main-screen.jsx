import React, { useCallback, useState } from "react";
import { Icon, VStack, useColorModeValue, Fab } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import AnimatedColorBox from "../components/animated-color-box";
import ThemeToggle from "../components/theme-toggle";
import shortid from "shortid";
import TaskList from "../components/task-list";
import Masthead from "../components/masthead";

import { I18nManager } from "react-native";
I18nManager.allowRTL(false);

const initialData = [
    {
        id: shortid.generate(),
        subject: 'Buy Movie',
        done: false
    },
    {
        id: shortid.generate(),
        subject: '123456',
        done: false
    },
    {
        id: shortid.generate(),
        subject: 'Cat',
        done: false
    },
]

export default function MainScreen() {
    const [ data, setData ] = useState(initialData);
    const [ editingItemId, setEditingItemId ] = useState(null);

    const handleToggleTaskItem = useCallback((item) => {
        setData(prevData => {
            const newData = [...prevData];
            const index = prevData.indexOf(item);
            newData[index] = {
                ...item,
                done: !item.done
            }
            return newData
        });
    }, [])

    const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
        setData(prevData => {
            const newData = [...prevData];
            const index = prevData.indexOf(item);
            newData[index] = {
                ...item,
                subject: newSubject
            }
            return newData
        });
    }, [])

    const handleFinishEditingTaskItem = useCallback((_item) => {
        setEditingItemId(null);
    }, [])

    const handlePressTaskItemLabel = useCallback((item) => {
        setEditingItemId(item.id);
    }, [])

    const handleRemoveItem = useCallback((item) => {
        setData(prevData => {
            const newData = prevData.filter(i => i !== item);
            return newData;
        });
    }, [])

    return (
        <AnimatedColorBox 
            flex={1}
            bg={useColorModeValue('warmGray.50', 'primary.900')}
            w="full"
        >
            <Masthead 
                title={`What's up, Gal!`}
                image={require('../assets/main-screen.png')}>
            </Masthead>
            <VStack space={5} alignItems='center' w={"full"}>
                    <TaskList 
                        data={data}
                        onToggleItem={handleToggleTaskItem}
                        onChangeSubject={handleChangeTaskItemSubject}
                        onFinishEditing={handleFinishEditingTaskItem}
                        onPressLabel={handlePressTaskItemLabel}
                        onRemoveItem={handleRemoveItem}
                        editingItemId={editingItemId}
                    />
                <ThemeToggle />
            </VStack>
            <Fab
                position={"absolute"}
                renderInPortal={false}
                size="sm"
                icon={<Icon color="white" as={<AntDesign name="plus" size={"sm"} />} />}
                colorScheme={useColorModeValue('blue', 'darkBlue')}
                bg={useColorModeValue('blue.500', 'blue.400')}
                onPress={() => {
                    const id = shortid.generate();
                    setData([
                        {
                            id,
                            subject: '',
                            done: false
                        },
                        ...data
                    ])
                    setEditingItemId(id);
                }}
            />
        </AnimatedColorBox>
    );
}