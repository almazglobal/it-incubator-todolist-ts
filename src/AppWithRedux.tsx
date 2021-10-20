import React, {useReducer, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTextTaskAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {AppRootState} from "./state/store";

export type ValueFilterType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: ValueFilterType
}

export type TodoListsType = {
    [key: string]: TaskType[]
}

export function AppWithRedux() {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, TodoListType[]>(state => state.todolists)
    const tasks = useSelector<AppRootState,  TodoListsType>(state => state.tasks)

    const addItem = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    function addTask(taskTitle: string, todoListId: string) {
        dispatch(addTaskAC(taskTitle, todoListId))
    }

    function removeTask(id: string, todoListId: string) {
        dispatch(removeTaskAC(id, todoListId))
    }

    function changeText(text: string, todoListId: string, taskId: string) {
        dispatch(changeTextTaskAC(text, taskId, todoListId))
    }

    function changeTextTodoList(text: string, todoListId: string) {
        dispatch(changeTodolistTitleAC(text, todoListId))

    }

    function onHandleFilter(valueFilter: ValueFilterType, todoListId: string) {
        dispatch(changeTodolistFilterAC(todoListId, valueFilter))
    }


    const removeTaskHandler = (todoListId: string) => {
        dispatch(removeTodolistAC(todoListId))
    }
    const onCheckedTask = (id: string, valueChecked: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(id, valueChecked, todoListId))
    }

    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge="start"
                                color="inherit"
                                aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm AddItem={addItem}/>
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
                                        onHadleRemoveTask={removeTask}
                                        onHandleFilter={onHandleFilter}
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