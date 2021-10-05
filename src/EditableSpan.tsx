import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeText: (text: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editable, setEditable] = useState(false)
    const [text, setText] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const changeTextActive = () => {
        setEditable(true)
        setText(props.title)
    }
    const noChangeText = () => {
        setEditable(false)
        props.changeText(text)
    }
    return editable
        ? <TextField onChange={onChangeHandler}
                 onBlur={noChangeText}
                 type="text"
                 value={text}
                 autoFocus />
        : <span onDoubleClick={changeTextActive}>{props.title}</span>

}