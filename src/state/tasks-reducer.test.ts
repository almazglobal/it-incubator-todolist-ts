import {v1} from "uuid";
import {TodoListsType, TodoListType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTextTaskAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {start} from "repl";

let todoListId1: string
let todoListId2: string
let startState: TodoListsType

beforeEach(()=> {
    todoListId1 = v1()
    todoListId2 = v1()

    startState = {
        [todoListId1]: [
            {id: '1', title: "CSS", isDone: true},
            {id: '2', title: "JS", isDone: false},
            {id: '3', title: "React", isDone: false},
            {id: '4', title: "Redux", isDone: true},
        ],
        [todoListId2]: [
            {id: '1', title: "Apples", isDone: false},
            {id: '2', title: "Banana", isDone: true},
        ]
    }
})

test('correct tasks should be add task to todo list', () => {
    let newTaskTitle = 'Cocos'
    const endState = tasksReducer(startState, addTaskAC(newTaskTitle, todoListId2))
    expect(endState[todoListId2].length).toBe(3)
    expect(endState[todoListId2][0].title).toBe(newTaskTitle)
    expect(endState[todoListId2].some(item => item.title === newTaskTitle)).toBeTruthy()
})

test('correct tasks should be remove task', () => {
    const endState = tasksReducer(startState, removeTaskAC('3', todoListId1))
    expect(endState[todoListId1].length).toBe(3)
    expect(endState[todoListId1].every(item => item.id !== '3')).toBeTruthy()
})

test('status of specified task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC('3', true, todoListId1))
    expect(endState[todoListId1].length).toBe(4)
    expect(endState[todoListId1][2].isDone).toBeTruthy()
})

test('text of task should be changed', () => {
    const endState = tasksReducer(startState, changeTextTaskAC('New task', '3', todoListId1))
    expect(endState[todoListId1].length).toBe(4)
    expect(endState[todoListId1][2].title).toBe('New task')
})

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC('New todolist')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== todoListId1 && k !== todoListId2)

    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC(todoListId2)
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState[todoListId2]).toBeUndefined()
})