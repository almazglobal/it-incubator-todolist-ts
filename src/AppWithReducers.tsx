import React, {useReducer, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTextTaskAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type ValueFilterType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: ValueFilterType
}

export type TodoListsType = {
    [key: string]: TaskType[]
}

export function AppWithReducers() {
    console.log('App is called')
    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todoListId1, title: "What to learn", filter: 'all'},
        {id: todoListId2, title: "What to buy", filter: 'all'},
    ])

    const addItem = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    function addTask(taskTitle: string, todoListId: string) {
        dispatchToTasksReducer(addTaskAC(taskTitle, todoListId))
    }

    function removeTask(id: string, todoListId: string) {
        dispatchToTasksReducer(removeTaskAC(id, todoListId))
    }

    function changeText(text: string, todoListId: string, taskId: string) {
        dispatchToTasksReducer(changeTextTaskAC(text, taskId, todoListId))
    }

    function changeTextTodoList(text: string, todoListId: string) {
        dispatchToTodolistsReducer(changeTodolistTitleAC(text, todoListId))

    }

    function onHandleFilter(valueFilter: ValueFilterType, todoListId: string) {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todoListId, valueFilter))
    }

    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
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
        dispatchToTodolistsReducer(removeTodolistAC(todoListId))
    }
    const onCheckedTask = (id: string, valueChecked: boolean, todoListId: string) => {
        dispatchToTasksReducer(changeTaskStatusAC(id, valueChecked,todoListId))
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
