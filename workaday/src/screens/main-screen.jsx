import React, { useCallback, useEffect, useState } from "react";
import { Icon, VStack, useColorModeValue, Fab } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import AnimatedColorBox from "../components/animated-color-box";
import shortid from "shortid";
import TaskList from "../components/task-list";
import Hero from "../components/hero";
import NavBar from "../components/navbar";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { I18nManager } from "react-native";
// I18nManager.allowRTL(false);

const date = new Date();
const initialData = [];

// AsyncStorage.getItem('data', (error, result) => {
//     if (result !== null) {
//         AsyncStorage.setItem('data', JSON.stringify(JSON.parse(result)), (error) => {
//             if (error) {
//                 console.log(error);
//             }
//         });
//     } else {
//         AsyncStorage.setItem('data', JSON.stringify(data), (error) => {
//             if (error) {
//                 console.log(error);
//             }
//         });
//     }
// });
AsyncStorage.setItem('data', JSON.stringify(initialData))

export default function MainScreen() {
    const [data, setData] = useState(initialData);
    const [editingItemId, setEditingItemId] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
              const data = await AsyncStorage.getItem('data');
              if (data) {
                setData(JSON.parse(data));
                console.log('Get data: ' + data)
              }
            } catch (error) {
              console.log(error);
            }
          };
          getData();
    }, [])

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
        if (_item.subject === "") {
            handleRemoveItem(_item);
        }
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
            <StatusBar style={useColorModeValue('dark', 'light')}/>
            <Hero
                title={"Keep Your Tasks on Track!"}
                day={date.toDateString()}
                hero={"main"}
            >
                <NavBar />
            </Hero>
            <VStack flex={1} space={1} bg={useColorModeValue('warmGray.50', 'primary.900')} mt="-20px" borderTopLeftRadius={"20px"} borderTopRightRadius={"20px"} pt="20px">
                <TaskList
                    data={data}
                    onToggleItem={handleToggleTaskItem}
                    onChangeSubject={handleChangeTaskItemSubject}
                    onFinishEditing={handleFinishEditingTaskItem}
                    onPressLabel={handlePressTaskItemLabel}
                    onRemoveItem={handleRemoveItem}
                    editingItemId={editingItemId}
                />
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