import React, {useCallback} from "react";
import {ValueFilterType} from './App'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskTodoList} from "./TaskTodoList";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    todo: TaskType[]
    onHandlerRemoveTask: (id: string, todoListId: string) => void
    onHandlerFilter: (valueFilter: ValueFilterType, todoListId: string) => void
    onHandlerAddTask: (titleTask: string, todoListId: string) => void
    onCheckedTask: (id: string, valuChecked: boolean, todoListId: string) => void
    valueFilter: ValueFilterType
    removeTaskHandler: (todoListId: string) => void
    changeText: (text: string, todoListId: string, taskId: string) => void
    changeTextTodoList: (text: string, todoListId: string) => void
}

export const TodoList = React.memo( (props: PropsType) => {
    console.log('Todolist is called')
    const onAllClickHandler = useCallback( () => props.onHandlerFilter('all', props.id),[props.onHandlerFilter, props.id])
    const onActiveClickHandler = useCallback( () => props.onHandlerFilter('active', props.id),[props.onHandlerFilter, props.id])
    const onCompletedClickHandler = useCallback( () => props.onHandlerFilter('completed', props.id),[props.onHandlerFilter, props.id])

    const AddItem = useCallback( (title: string) => {
        props.onHandlerAddTask(title, props.id)
    }, [props.onHandlerAddTask, props.id])

    const changeHandlerTextTodoList =useCallback( (text: string) => {
        props.changeTextTodoList(text, props.id)
    },[props.changeTextTodoList, props.id])

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
                <IconButton aria-label="delete" onClick={() => props.removeTaskHandler(props.id)}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm AddItem={AddItem} />

            <ul>
                {taskTodoList.map(item => {
                        return  <TaskTodoList key={item.id}
                        task={item}
                        changeText={props.changeText}
                        onHandlerRemoveTask={props.onHandlerRemoveTask}
                        onCheckedTask={props.onCheckedTask}
                        id={props.id}/>
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




