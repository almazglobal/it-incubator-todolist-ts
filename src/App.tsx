import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type ValueFilterType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: ValueFilterType
}

export type TodoListsType = {
    [key: string]: TaskType[]
}

export function App() {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId1, title: "What to learn", filter: 'all'},
        {id: todoListId2, title: "What to buy", filter: 'all'},
    ])

    const addItem = (title: string) => {
        const id = v1()
        setTodoLists([...todoLists, {id, title, filter: 'all'}])
        setTasks({...tasks, [id]: []})
    }

    function addTask(taskTitle: string, todoListId: string) {
        let newTask = {id: v1(), title: taskTitle, isDone: false}
        let newTasks = [newTask, ...tasks[todoListId]]
        let Tasks = {...tasks, [todoListId]: newTasks}
        setTasks(Tasks)
    }

    function removeTask(id: string, todoListId: string) {
        let filteredTasks = tasks[todoListId].filter(item => item.id !== id)
        setTasks({...tasks, [todoListId]: filteredTasks})
    }

    function changeText(text: string, todoListId: string, taskId: string) {
        const task = tasks[todoListId].find((todo => todo.id === taskId))
        if (task) {
            task.title = text
            setTodoLists([...todoLists])
        }
    }

    function changeTextTodoList(text: string, todoListId: string) {
        const todoList = todoLists.find((todo => todo.id === todoListId))
        if (todoList) {
            todoList.title = text
            setTodoLists([...todoLists])
        }
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
    const onCheckedTask = (id: string, valueChecked: boolean, todoListId: string) => {
        const task = tasks[todoListId].find(item => item.id === id)
        if (task) {
            task.isDone = valueChecked
            setTasks({...tasks})
        }
    }

    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge="start"
                                color="inherit"
                                aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm AddItem={addItem} />
                </Grid>
                <Grid container
                      spacing={3}>
                    {todoLists.map(todo => {

                        let taskTodoList = tasks[todo.id]
                        if (todo.filter === 'completed') {
                            taskTodoList = taskTodoList.filter((item) => item.isDone)
                        }
                        if (todo.filter === 'active') {
                            taskTodoList = taskTodoList.filter((item) => !item.isDone)
                        }

                        return (
                            <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList
                                        key={todo.id}
                                        id={todo.id}
                                        title={todo.title}
                                        todo={taskTodoList}
                                        onHandlerRemoveTask={removeTask}
                                        onHandlerFilter={onHandleFilter}
                                        onHandlerAddTask={addTask}
                                        onCheckedTask={onCheckedTask}
                                        valueFilter={todo.filter}
                                        removeTaskHandler={removeTaskHandler}
                                        changeText={changeText}
                                        changeTextTodoList={changeTextTodoList}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                    }
                </Grid>
            </Container>
        </div>
    );
}
