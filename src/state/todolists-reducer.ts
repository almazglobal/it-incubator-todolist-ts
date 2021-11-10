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
    todolistId: string
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

type ActionsTodolistType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todoListId1 = v1()
export const todoListId2 = v1()

const initialState: TodoListType[] = [
    // {id: todoListId1, title: "What to learn", filter: 'all'},
    // {id: todoListId2, title: "What to buy", filter: 'all'},
]

export const todolistsReducer = (state: TodoListType[] = initialState, action: ActionsTodolistType): TodoListType[] => {
    debugger
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.id)
        case 'ADD-TODOLIST':
            const id = action.todolistId
            return [{id, title: action.title, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(todo => todo.id === action.id ? {...todo, title: action.title} : todo)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(todo => todo.id === action.id ? {...todo, filter: action.filter} : todo)
        }
        default:
            // throw new Error("Don't' know type action")
            return state
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
        todolistId: v1(),
    }
)

export const changeTodolistTitleAC = (title: string, id: string,): ChangeTodolistTitleActionType => (
    {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title,
    }
)

export const changeTodolistFilterAC = (id: string, filter: ValueFilterType): ChangeTodolistFilterActionType => (
    {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter,
    }
)
