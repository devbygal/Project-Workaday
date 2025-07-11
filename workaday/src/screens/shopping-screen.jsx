import React, { useCallback, useEffect, useState } from "react";
import { Icon, VStack, useColorModeValue, Fab } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import AnimatedColorBox from "../components/animated-color-box";
import shortid from "shortid";
import ShoppingList from "../components/shopping-list";
import Hero from "../components/hero";
import NavBar from "../components/navbar";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const date = new Date();
const initialData = [];

AsyncStorage.setItem('shopping-data', JSON.stringify(initialData))

export default function ShoppingScreen() {
    const [data, setData] = useState(initialData);
    const [editingItemId, setEditingItemId] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
              const data = await AsyncStorage.getItem('shopping-data');
              if (data) {
                setData(JSON.parse(data));
                console.log('Get shopping data: ' + data)
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

    const handleQuantityItem = useCallback((item, newQuantity) => {
        setData(prevData => {
            const newData = [...prevData];
            const index = prevData.indexOf(item);
            newData[index] = {
                ...item,
                quantity: newQuantity
            }
            return newData
        });
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
                title={"Remember What You Need Shop Smart,\nNot Hard!"}
                day={date.toDateString()}
                hero={"shopping"}
            >
                <NavBar />
            </Hero>
            <VStack flex={1} space={1} bg={useColorModeValue('warmGray.50', 'primary.900')} mt="-20px" borderTopLeftRadius={"20px"} borderTopRightRadius={"20px"} pt="20px">
                <ShoppingList
                    data={data}
                    onToggleItem={handleToggleTaskItem}
                    onChangeSubject={handleChangeTaskItemSubject}
                    onFinishEditing={handleFinishEditingTaskItem}
                    onPressLabel={handlePressTaskItemLabel}
                    onQuantityItem={handleQuantityItem}
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
                            quantity: 1,
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