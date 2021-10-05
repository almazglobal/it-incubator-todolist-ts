import {TodoListType} from "../App";
import {v1} from "uuid";


type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: TodoListType[], action: ActionType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
           return state.filter(todo => todo.id !== action.id)
        case 'ADD-TODOLIST':
            const id = v1()
            return [...state, {id, title: action.title, filter: 'all'}]
        default:
            throw new Error("Don't' know type action")
    }
}