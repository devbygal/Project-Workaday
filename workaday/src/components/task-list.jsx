import React, { useCallback, useRef } from "react";
import { AnimatePresence, View } from "moti";
import { ScrollView } from "react-native-gesture-handler";
import TaskItem from './task-item';
import { makeStyledComponent } from "../untils/styled";

const StyleView = makeStyledComponent(View);
const StyleScrollView = makeStyledComponent(ScrollView);

export const AnimatedTaskItem = (props) => {
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

    const handleToggleCheckbox = useCallback(() => {
        onToggleItem(data);
    }, [data, onToggleItem])

    const handleChangeSubject = useCallback((subject) => {
        onChangeSubject(data,subject);
    }, [data, onChangeSubject])

    const handleFinishEditing = useCallback(() => {
        onFinishEditing(data);
    }, [data, onPressLabel])

    const handlePressLabel = useCallback(() => {
        onPressLabel(data);
    }, [data, onPressLabel])

    const handleRemove = useCallback(() => {
        onRemove(data);
    }, [data, onRemove])

    return (
        <StyleView w="full" from={{
            opacity: 0,
            scale: 0.5,
            marginBottom: -46
        }} animate={{
            opacity: 1,
            scale: 1,
            marginBottom: 0
        }} exit={{
            opacity: 0,
            scale: 0.5,
            marginBottom: -46
        }}>
            <TaskItem 
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
        </StyleView>
    );
}

export default function TaskList(props) {
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
                    <AnimatedTaskItem 
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