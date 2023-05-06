import React, { useCallback, useContext, useRef } from "react";
import { AnimatePresence, View } from "moti";
import { ScrollView } from "react-native-gesture-handler";
import BirthdayItem from './birthday-item';
import { makeStyledComponent } from "../untils/styled";
import { AlertContext } from "./context/AlertContext";
import AlertItem from "./alert-item";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StyleView = makeStyledComponent(View);
const StyleScrollView = makeStyledComponent(ScrollView);

export const AnimatedBirthdayItem = (props) => {
    const {
        isEditing,
        onToggleItem,
        onChangeSubject,
        onFinishEditing,
        onPressLabel,
        onRemove,
        simultaneousHandlers,
        data
    } = props;

    const { setShow, taskSubject } = useContext(AlertContext);

    const handleToggleCheckbox = useCallback(() => {
        onToggleItem(data);

        AsyncStorage.getItem('birthday-data', (error, result) => {
            if (result !== null) {
              const currentArray = JSON.parse(result);
              const index = currentArray.findIndex((obj) => obj.id === data.id);
              if (index != -1) {
                  // Update the attribute of the object
                  currentArray[index].done = !data.done;
                  AsyncStorage.setItem('birthday-data', JSON.stringify(currentArray), (error) => {
                    if (error) {
                      console.log(error);
                    }
                  });
              }
            } else {
              AsyncStorage.setItem('birthday-data', JSON.stringify(data), (error) => {
                if (error) {
                  console.log(error);
                }
              });
            }
          });
    }, [data, onToggleItem])

    const handleChangeSubject = useCallback((subject) => {
        onChangeSubject(data,subject);
        setShow(false);
    }, [data, onChangeSubject])

    const handleFinishEditing = useCallback(() => {
        onFinishEditing(data);  
        
        AsyncStorage.getItem('birthday-data', (error, result) => {
            if (result !== null) {
              const currentArray = JSON.parse(result);
              const index = currentArray.findIndex((obj) => obj.id === data.id);
              if (index != -1) {
                  // Update the attribute of the object
                  currentArray[index].subject = data.subject;

                  AsyncStorage.setItem('birthday-data', JSON.stringify(currentArray), (error) => {
                    if (error) {
                      console.log(error);
                    }
                  });
              }
              else {
                  currentArray.unshift(data); // Add new item to the beginning of the array
                  AsyncStorage.setItem('birthday-data', JSON.stringify(currentArray), (error) => {
                      if (error) {
                          console.log(error);
                      }
                  });
              }
            } else {
              AsyncStorage.setItem('birthday-data', JSON.stringify(data), (error) => {
                if (error) {
                  console.log(error);
                }
              });
            }
          });
    }, [data, onPressLabel])

    const handlePressLabel = useCallback(() => {
        onPressLabel(data);
    }, [data, onPressLabel])

    const handleRemove = useCallback(() => {
        onRemove(data);
        setShow(false);

        AsyncStorage.getItem('birthday-data', (error, result) => {
            if (result !== null) {
                const currentArray = JSON.parse(result);
                // Find the index of the object that you want to delete
                const indexToDelete = currentArray.findIndex(item => item.id === data.id);

                // If the index is valid, remove the object from the array using splice
                if (indexToDelete !== -1) {
                    currentArray.splice(indexToDelete, 1);
                }
                AsyncStorage.setItem('birthday-data', JSON.stringify(currentArray), (error) => {
                  if (error) {
                    console.log(error);
                  }
                });
              } else {
                AsyncStorage.setItem('birthday-data', JSON.stringify(data), (error) => {
                  if (error) {
                    console.log(error);
                  }
                });
              }
        });
    }, [data, onRemove])

    return (
        <StyleView w="full" from={{
            opacity: 0,
            scale: 0.5,
        }} animate={{
            opacity: 1,
            scale: 1,
        }} exit={{
            scale: 0.5,
        }}>
            <BirthdayItem 
                simultaneousHandlers={simultaneousHandlers}
                subject={data.subject}
                isDone={data.done}
                isEditing={isEditing}
                onToggleCheckbox={handleToggleCheckbox}
                onChangeSubject={handleChangeSubject}
                onFinishEditing={handleFinishEditing}
                onPressLabel={handlePressLabel}
                onRemove={handleRemove}
            />
            {data.subject === taskSubject && <AlertItem />}
        </StyleView>
    );
}

export default function BirthdayList(props) {
    const {
        data,
        editingItemId,
        onToggleItem,
        onChangeSubject,
        onFinishEditing,
        onPressLabel,
        onRemoveItem,
    } = props;

    const refScrollView = useRef(null);

    return (
        <StyleScrollView w="full" ref={refScrollView}>
            <AnimatePresence>
                {data.map(item => (
                    <AnimatedBirthdayItem 
                        key={item.id}
                        data={item}
                        simultaneousHandlers={refScrollView}
                        isEditing={item.id === editingItemId}
                        onToggleItem={onToggleItem}
                        onChangeSubject={onChangeSubject}
                        onFinishEditing={onFinishEditing}
                        onPressLabel={onPressLabel}
                        onRemove={onRemoveItem}
                    />
                ))}
            </AnimatePresence>
        </StyleScrollView>
    );
}