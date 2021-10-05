import {TodoListsType} from "../App";

type Action1Type = {
    type: '1'
    id: string
}
type Action2Type = {
    type: '2'
    id: string
}

type ActionsType = Action1Type | Action2Type

export const tasksReducer = (state: TodoListsType, action: ActionsType) => {
    switch (action.type) {
        case '1': {
            return {...state}
        }
        case '2': {
            return {...state}
        }
        default:
            return state
    }
}

export const removeTaskAC = (id: string): Action1Type => {
    return {
        type: '1',
        id
    }
}

export const addTaskAC = (id: string): Action2Type => {
    return {
        type: '2',
        id
    }
}