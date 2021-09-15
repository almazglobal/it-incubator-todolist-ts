import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

export type ValueFilterType = 'all' | 'active' | 'completed'
type TodoListType = {
    id: string
    title: string
    filter: ValueFilterType
}
type TodoListsType = {
    [key: string]: TaskType[]
}

export function App() {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId1, title: "What to learn", filter: 'active'},
        {id: todoListId2, title: "What to buy", filter: 'completed'},
    ])

    function removeTask(id: string, todoListId: string) {
        let filteredTasks = tasks[todoListId].filter(item => item.id !== id)
        setTasks({...tasks, [todoListId]: filteredTasks})

    }

    function addTask(taskTitle: string, todoListId: string) {
        let newTask = {id: v1(), title: taskTitle, isDone: false}
        let newTasks = [newTask, ...tasks[todoListId]]
        setTasks({...tasks, [todoListId]: newTasks})
    }

    function onHandleFilter(valueFilter: ValueFilterType, todoListId: string) {
        const todoList = todoLists.find(todo => todo.id === todoListId)
        if (todoList) {
            todoList.filter = valueFilter
            setTodoLists([...todoLists])
        }

    }

    const [tasks, setTasks] = useState<TodoListsType>({
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
    })
    const removeTaskHandler = (todoListId: string) => {
        let todo = todoLists.filter(todo => todo.id !== todoListId)
        setTodoLists(todo)
        delete tasks[todoListId]
        setTasks({...tasks})
    }
    const onCheckedTask = (id: string, valuChecked: boolean, todoListId: string) => {
        const task = tasks[todoListId].find(item => item.id === id)
        if (task) {
            task.isDone = valuChecked
            setTasks({...tasks})
        }

    }


    return (
        <div className="App">

            {todoLists.map(todo => {

                let taskTodoList = tasks[todo.id]
                if (todo.filter === 'completed') {
                    taskTodoList = taskTodoList.filter((item) => item.isDone)
                }
                if (todo.filter === 'active') {
                    taskTodoList = taskTodoList.filter((item) => !item.isDone)
                }

                return (
                    <TodoList
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        todo={taskTodoList}
                        onHadleRemoveTask={removeTask}
                        onHandleFilter={onHandleFilter}
                        onHandlerAddTask={addTask}
                        onCheckedTask={onCheckedTask}
                        valueFilter={todo.filter}
                        removeTaskHandler={removeTaskHandler}
                    />
                )
            })
            }
        </div>
    );
}
