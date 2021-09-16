import React, {ChangeEvent} from "react";
import {ValueFilterType} from './App'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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

export function TodoList(props: PropsType) {

    const onAllClickHandler = () => props.onHandleFilter('all', props.id)
    const onActiveClickHandler = () => props.onHandleFilter('active', props.id)
    const onCompletedClickHandler = () => props.onHandleFilter('completed', props.id)

    const onChangeHandlerCheckBox = (e: ChangeEvent<HTMLInputElement>, id: string, todoListId: string) => {
        props.onCheckedTask(id, e.currentTarget.checked, todoListId)
    }
    const AddItem = (title: string) => {
        props.onHandlerAddTask(title, props.id)
    }

    const changeHandlerTextTodoList = (text: string) => {
        props.changeTextTodoList(text, props.id)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} changeText={changeHandlerTextTodoList} />
                <button onClick={() => props.removeTaskHandler(props.id)}>x</button>
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
                            <input type="checkbox"
                                   onChange={(e) => onChangeHandlerCheckBox(e, item.id, props.id)}
                                   checked={item.isDone} />
                            <EditableSpan title={item.title} changeText={changeHandlerText} />
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button className={props.valueFilter === 'all' ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.valueFilter === 'active' ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.valueFilter === 'completed' ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>


        </div>

    )
}


