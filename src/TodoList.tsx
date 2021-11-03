import React, {ChangeEvent, useCallback} from "react";
import {ValueFilterType} from './App'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    todo: TaskType[]
    onHadleRemoveTask: (id: string, todoListId: string) => void
    onHandleFilter: (valueFilter: ValueFilterType, todoListId: string) => void
    onHandlerAddTask: (titleTask: string, todoListId: string) => void
    onCheckedTask: (id: string, valuChecked: boolean, todoListId: string) => void
    valueFilter: ValueFilterType
    removeTaskHandler: (todoListId: string) => void
    changeText: (text: string, todoListId: string, taskId: string) => void
    changeTextTodoList: (text: string, todoListId: string) => void
}

export const TodoList = React.memo( (props: PropsType) => {
    console.log('Todolist is called')
    const onAllClickHandler = () => props.onHandleFilter('all', props.id)
    const onActiveClickHandler = () => props.onHandleFilter('active', props.id)
    const onCompletedClickHandler = () => props.onHandleFilter('completed', props.id)

    const onChangeHandlerCheckBox = (e: ChangeEvent<HTMLInputElement>, id: string, todoListId: string) => {
        props.onCheckedTask(id, e.currentTarget.checked, todoListId)
    }
    const AddItem = useCallback( (title: string) => {
        props.onHandlerAddTask(title, props.id)
    }, [])

    const changeHandlerTextTodoList = (text: string) => {
        props.changeTextTodoList(text, props.id)
    }

    let taskTodoList = props.todo

    if (props.valueFilter === 'completed') {
        taskTodoList = props.todo.filter((item) => item.isDone)
    }
    if (props.valueFilter === 'active') {
        taskTodoList = props.todo.filter((item) => !item.isDone)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} changeText={changeHandlerTextTodoList} />
                {/*<button onClick={() => props.removeTaskHandler(props.id)}>x</button>*/}
                <IconButton aria-label="delete" onClick={() => props.removeTaskHandler(props.id)}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm AddItem={AddItem} />
            <ul>
                {props.todo.map(item => {
                    const onRemoveHandler = () => props.onHadleRemoveTask(item.id, props.id)
                    const changeHandlerText = (text: string) => {
                        props.changeText(text, props.id, item.id)
                    }
                    return (
                        <li key={item.id}
                            className={item.isDone ? "completed-task" : ""}>
                            <Checkbox
                                   onChange={(e) => onChangeHandlerCheckBox(e, item.id, props.id)}
                                   checked={item.isDone} />
                            <EditableSpan title={item.title} changeText={changeHandlerText} />
                            {/*<button onClick={onRemoveHandler}>x</button>*/}
                            <IconButton aria-label="delete" onClick={onRemoveHandler}>
                                <Delete />
                            </IconButton>
                        </li>
                    )
                })}

            </ul>
            <div>
                <Button color={"inherit"} variant={props.valueFilter === 'all' ? "contained" : "text"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"} variant={props.valueFilter === 'active' ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.valueFilter === 'completed' ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>


        </div>

    )
})


