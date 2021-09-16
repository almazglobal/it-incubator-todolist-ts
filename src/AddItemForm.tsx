import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    AddItem: (titleTask: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {

    const ERROR_MESSAGE = "Title is required"
    const [error, setError] = useState(ERROR_MESSAGE)
    const [taskTitle, setTaskTitle] = useState('')

    const addTask = () => {
        if (!taskTitle) {
            return
        }
        props.AddItem(taskTitle)
        setTaskTitle('')
        setError('')
    }

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

    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={taskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandlerNewTitile}
            />
            <button onClick={addTask}>+
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}