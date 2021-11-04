import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "./TodoList";

type TaskTodoListPropsType = {
    task: TaskType
    changeText: (text: string, todoListId: string, taskId: string) => void
    onHandlerRemoveTask: (id: string, todoListId: string) => void
    onCheckedTask: (id: string, valuChecked: boolean, todoListId: string) => void
    id: string
}
export const TaskTodoList = React.memo((props: TaskTodoListPropsType) => {
    console.log('Task is called')
    const onChangeHandlerCheckBox = (e: ChangeEvent<HTMLInputElement>, id: string, todoListId: string) => {
        props.onCheckedTask(id, e.currentTarget.checked, todoListId)
    }
    const onRemoveHandler = useCallback(() => props.onHandlerRemoveTask(props.task.id, props.id), [props.onHandlerRemoveTask, props.task.id, props.id])
    const changeHandlerText = useCallback((text: string) => {
        props.changeText(text, props.id, props.task.id)
    }, [props.changeText, props.id, props.task.id])

    return (
        <li className={props.task.isDone ? "completed-task" : ""}>
            <Checkbox
                onChange={(e) => onChangeHandlerCheckBox(e, props.task.id, props.id)}
                checked={props.task.isDone}/>
            <EditableSpan title={props.task.title} changeText={changeHandlerText}/>
            <IconButton aria-label="delete" onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </li>
    );
})