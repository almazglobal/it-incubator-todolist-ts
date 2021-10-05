import {TodoListType, ValueFilterType} from "../App";
import {v1} from "uuid";


// type ActionType = {
//     type: string
//     [key: string]: any
// }

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: ValueFilterType
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (state: TodoListType[], action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.id)
        case 'ADD-TODOLIST':
            const id = v1()
            return [...state, {id, title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find((todo => todo.id === action.id))
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(todo => todo.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }
        default:
            throw new Error("Don't' know type action")
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => (
    {
        type: 'REMOVE-TODOLIST',
        id: todolistId,

    }
)

export const addTodolistAC = (title: string): AddTodolistActionType => (
    {
        type: 'ADD-TODOLIST',
        title,
    }
)

export const changeTodolistTitleAC = (id: string, title: string,): ChangeTodolistTitleActionType => (
    {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title,
    }
)

export const changeTodolistFilterActionType = (id: string, filter: ValueFilterType): ChangeTodolistFilterActionType => (
    {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter,
    }
)
