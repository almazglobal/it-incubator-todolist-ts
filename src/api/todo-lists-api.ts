import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'api-key': '45e50546-81c9-440d-b330-e82f67461c3f'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings,
})

export type TodoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModel = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type ResponseGetTodoTaskType = {
    totalCount: number
    error: string | null
    items: TaskType[]
}


type ResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    data: T,
}

export const todoListsApi = {
    getTodolists() {
        return instance.get<TodoListType[]>(`todo-lists`)
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>(`todo-lists`, {title})
    },
    deleteTodoList(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoListTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    }
}


export const todoTasksAPI = {
    getTodoTasks(todolistId: string) {
        return instance.get<ResponseGetTodoTaskType>(`todo-lists/${todolistId}/tasks`)
    },
    createTodoTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTodoTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTodoTaskTitle(todolistId: string, taskId: string, task: UpdateTaskModel) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, task)
    }
}

