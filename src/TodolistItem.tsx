import {type ChangeEvent, type KeyboardEvent, useState} from 'react';
import type {FilterValues, Task} from './App';
import {Button} from './Button';

type Props = {
    title: string
    tasks: Task[]
    deleteTask: ( todolistID: string,taskId: string) => void
    changeFilter: (todolistID: string, filter: FilterValues) => void
    createTask: (todolistID: string,title: string) => void
    changeTaskStatus: (todolistID: string,taskId: string, isDone: boolean) => void
    filter: FilterValues
    todolistId: string
    removeToDoList: (todolistID: string) => void
}

export const TodolistItem = (props: Props) => {
    const {
        title,
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        filter,
        removeToDoList,
        todolistId
    } = props;

    const [taskTitle, setTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);


    // ToDo: перенести условия из App.tsx
    // let filteredTasks = tasks;
    // if (el.filter === 'active') {
    //     filteredTasks = tasks.filter(task => !task.isDone);
    // }
    // if (el.filter === 'completed') {
    //     filteredTasks = tasks.filter(task => task.isDone);
    // }

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim();
        if (trimmedTitle !== '') {
            createTask(todolistId,trimmedTitle);
            setTaskTitle('');
        } else {
            setError('Title is required');
        }
    };

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
        setError(null);
    };

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler();
        }
    };

    const changeFilterTaskHandler = (filter: FilterValues) => {
        changeFilter(todolistId, filter);
    };
    const removeToDoListHandler=() => {
        removeToDoList(todolistId)
    }

    return (
        <div>
            <h3>{title}
            <Button title={'x'} onClick={removeToDoListHandler}/>
            </h3>
            <div>
                <input className={error ? 'error' : ''}
                       value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskOnEnterHandler}/>
                <Button title={'+'} onClick={createTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask( todolistId,task.id);
                        };

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked;
                            changeTaskStatus(todolistId,task.id, newStatusValue);
                        };

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone}
                                       onChange={changeTaskStatusHandler}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={deleteTaskHandler}/>
                            </li>
                        );
                    })}
                </ul>
            )}
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''}
                        title={'All'}
                        onClick={() => changeFilterTaskHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilterTaskHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilterTaskHandler('completed')}/>
            </div>
        </div>
    );
};
