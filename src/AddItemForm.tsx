import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, Icon, IconButton, TextField} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";

type AddItemFormPropsType = {
    AddItem: (titleTask: string) => void
}
export const AddItemForm = React.memo(  (props: AddItemFormPropsType) => {
    console.log('AddItemForm is called')
    const ERROR_MESSAGE = "Title is required"
    const [error, setError] = useState(ERROR_MESSAGE)
    const [taskTitle, setTaskTitle] = useState('')

    const addTask = () => {
        if (!taskTitle) {
            return
        }
        props.AddItem(taskTitle)
        setTaskTitle('')
        setError(ERROR_MESSAGE)
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
            <TextField label="Type value"
                       variant="outlined"
                       error={!!error}
                       helperText={error}
                       value={taskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandlerNewTitile}
            />
            <IconButton onClick={addTask}

                    color={"primary"}>
               < AddCircleOutline/>
            </IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    )
})