import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from "react";
import {ValueFilterType} from './App'

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
}
const ERROR_MESSAGE = "Title is required"
export function TodoList(props: PropsType) {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState(ERROR_MESSAGE)

    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const title = event.currentTarget.value.trim()

        if (!title) {
            setError(ERROR_MESSAGE)
            setTaskTitle(title)
            return
         }
        setTaskTitle(title)
        setError('')
    }

    const onKeyPressHandlerNewTitile = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
            setTaskTitle('')
        }
    }

    const addTask = () => {
        if (!taskTitle) {
            return
        }
        props.onHandlerAddTask(taskTitle, props.id)
        setTaskTitle('')
        setError('')
    }

    const onAllClickHandler = () => props.onHandleFilter('all', props.id)
    const onActiveClickHandler = () => props.onHandleFilter('active', props.id)
    const onCompletedClickHandler = () => props.onHandleFilter('completed', props.id)

    const onChangeHandlerCheckBox = (e: ChangeEvent<HTMLInputElement>, id: string, todoListId: string) => {
        props.onCheckedTask(id, e.currentTarget.checked, todoListId)
    }

    return (
        <div>
            <h3>{props.title} <button onClick={() => props.removeTaskHandler(props.id)}>x</button></h3>
            <div>
                <input className={error ? 'error': ''} value={taskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandlerNewTitile}
                />
                <button onClick={addTask}>+
                </button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.todo.map(item => {
                    const onRemoveHandler = () => props.onHadleRemoveTask(item.id, props.id)
                    return (
                        <li key={item.id} className={item.isDone ? "completed-task" : ""}>
                            <input type="checkbox"
                                   onChange={(e) => onChangeHandlerCheckBox(e, item.id, props.id)}
                                   checked={item.isDone} />
                            <span>{item.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button className={props.valueFilter === 'all' ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={props.valueFilter === 'active' ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.valueFilter === 'completed' ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>


        </div>

    )
}
