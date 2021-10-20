import {TodoListsType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todoListId1, todoListId2} from "./todolists-reducer";

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}

export type ChangeTextTaskActionType = {
    type: 'CHANGE-TEXT-TASK'
    text: string
    taskId: string
    todoListId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todoListId: string
}

type ActionsTaskType =
    AddTaskActionType
    | RemoveTaskActionType
    | ChangeTextTaskActionType
    | ChangeTaskStatusActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TodoListsType = {
    [todoListId1]: [
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: true},
    ],
    [todoListId2]: [
        {id: v1(), title: "Apples", isDone: false},
        {id: v1(), title: "Banana", isDone: true},
    ]
}

export const tasksReducer = (state: TodoListsType = initialState, action: ActionsTaskType): TodoListsType => {
    switch (action.type) {
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.title, isDone: false}
            let newTasks = [newTask, ...state[action.todoListId]]
            return {...state, [action.todoListId]: newTasks}
        }
        case 'REMOVE-TASK': {
            let filteredTasks = state[action.todoListId].filter(item => item.id !== action.taskId)
            return {...state, [action.todoListId]: filteredTasks}
        }
        case 'CHANGE-TEXT-TASK': {
            const task = state[action.todoListId].find((todo => todo.id === action.taskId))
            if (task) {
                task.title = action.text
            }
            return {...state}
        }
        case 'CHANGE-TASK-STATUS': {
            const task = state[action.todoListId].find(item => item.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return {...state}
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId]: []}
        }
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state
    }
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        title,
        todoListId,
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todoListId,
    }
}

export const changeTextTaskAC = (text: string, taskId: string, todoListId: string): ChangeTextTaskActionType => {
    return {
        type: 'CHANGE-TEXT-TASK',
        text,
        taskId,
        todoListId,
    }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        isDone,
        todoListId,
    }
}