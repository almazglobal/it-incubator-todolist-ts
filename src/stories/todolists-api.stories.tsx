import React, {ChangeEvent, useEffect, useState} from 'react';
import {TaskType, todoListsApi, todoTasksAPI, UpdateTaskModel} from "../api/todo-lists-api";

export default {
    title: 'API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsApi.getTodolists()
            .then(res => {
                setState(res.data)
            })
    }, [])
    return (
        <div>
            {JSON.stringify(state)}
        </div>
    );
};

export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')

    /*useEffect(() => {
        todoListsApi.createTodoList('Alex todolist')
            .then(res => {
                setState(res.data)
            })
    }, [])*/
    const onClickHandler = () => {
        todoListsApi.createTodoList(title)
            .then(res => {
                setState(res.data)
            })
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input onChange={onChangeHandler}
                       type="text"
                       placeholder={'Enter a title of the todolist'} />
                <button onClick={onClickHandler}>Create TodoList</button>
            </div>
        </div>
    );
}

export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState('')

    /*useEffect(() => {
        todoListsApi.deleteTodoList(id)
            .then(res => {
                setState(res.data)
            })
    }, [])
*/
    const onClickHandler = () => {
        todoListsApi.deleteTodoList(id)
            .then(res => {
                setState(res.data)
            })
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.currentTarget.value)
    }
    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input onChange={onChangeHandler}
                       type="text"
                       placeholder={'Enter the ID todolist'} />
                <button onClick={onClickHandler}>Delete TodoList</button>
            </div>
        </div>
    );
}

export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const [id, setId] = useState('')

    /*useEffect(() => {
        todoListsApi.updateTodoListTitle('2b48c3d1-8661-4c7b-be04-f746c6679169', 'New name todolist')
            .then(res => {
                setState(res.data)
            })
    }, [])
*/
    const onClickHandler = () => {
        todoListsApi.updateTodoListTitle(id, title)
            .then(res => {
                setState(res.data)
            })
    }
    const onChangeIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.currentTarget.value)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input onChange={onChangeIdHandler}
                       type="text"
                       placeholder={'Enter the ID todolist'} />
                <input onChange={onChangeTitleHandler}
                       type="text"
                       placeholder={'Enter a title of the todolist'} />
                <button onClick={onClickHandler}>Change Title TodoList</button>
            </div>
        </div>
    );
}

const task: UpdateTaskModel = {
    description: 'fgdfggfd',
    title: 'Go to a milk',
    status: 1,
    priority: 3,
    startDate: '2020-11-30T11:19:05.5',
    deadline: '2020-11-30T11:19:05.5',
}


export const GetTodoTasks = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState('')

    const onClickHandler = () => {
        todoTasksAPI.getTodoTasks(id)
            .then(res => {
                setState(res.data)
            })
    }
    const onChangeIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.currentTarget.value)
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input onChange={onChangeIdHandler}
                       type="text"
                       placeholder={'Enter the ID todolist'} />
                <button onClick={onClickHandler}>Get tasks</button>
            </div>
        </div>
    );
};

export const CreateTodoTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const [todolistId, setTodolistId] = useState('')

    const onClickHandler = () => {
        todoTasksAPI.createTodoTask(todolistId, title)
            .then(res => {
                setState(res.data)
            })
    }
    const onChangeIdTodoListHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input onChange={onChangeIdTodoListHandler}
                       type="text"
                       placeholder={'Enter the ID todolist'} />
                <input onChange={onChangeTitleHandler}
                       type="text"
                       placeholder={'Enter a title of the task'} />
                       <button onClick={onClickHandler}>Add task</button>
            </div>
        </div>
    );
}

export const DeleteTodoTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')

    const onClickHandler = () => {
        todoTasksAPI.deleteTodoTask(todolistId, taskId)
            .then(res => {
                setState(res.data)
            })
    }

    const onChangeIdTodoListHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const onChangeIdTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input onChange={onChangeIdTodoListHandler}
                       type="text"
                       placeholder={'Enter the ID todolist'} />
                <input onChange={onChangeIdTaskHandler}
                       type="text"
                       placeholder={'Enter the ID task'} />
                <button onClick={onClickHandler}>Delete task</button>
            </div>
        </div>
    );
}

export const UpdateTodoTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')

    const onClickHandler = () => {
        todoTasksAPI.updateTodoTaskTitle(todolistId, taskId, task)
            .then(res => {
                setState(res.data)
            })
    }
    const onChangeIdTodoListHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const onChangeIdTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input onChange={onChangeIdTodoListHandler}
                       type="text"
                       placeholder={'Enter the ID todolist'} />
                <input onChange={onChangeIdTaskHandler}
                       type="text"
                       placeholder={'Enter the ID task'} />
                <button onClick={onClickHandler}>Change task</button>
            </div>
        </div>
    );
}
