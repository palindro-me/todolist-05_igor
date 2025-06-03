import './App.css';
import {v1} from 'uuid';
import {TodolistItem} from './TodolistItem.tsx';
import {useState} from 'react';

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValues
}

export const App = () => {
    // const [filter, setFilter] = useState<FilterValues>('all');

    const todolistId1 = v1()
const todolistId2 = v1()

const [todolists, setTodolists] = useState<TodolistType[]>([
  { id: todolistId1, title: 'What to learn', filter: 'all' },
  { id: todolistId2, title: 'What to buy', filter: 'all' },
])

const [tasks, setTasks] = useState({
  [todolistId1]: [
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
  ],
  [todolistId2]: [
    { id: v1(), title: 'Rest API', isDone: true },
    { id: v1(), title: 'GraphQL', isDone: false },
  ],
})


    // const [tasks, setTasks] = useState<Task[]>([
    //     {id: v1(), title: 'HTML&CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'ReactJS', isDone: false},
    // ]);

    const deleteTask = ( todolistID: string, taskId: string) => {
        setTasks({...tasks, [todolistID]:tasks[todolistID].filter(t => t.id!==taskId)})
        // const filteredTasks = tasks.filter(task => {
        //     return task.id !== taskId;
        // });
        // setTasks(filteredTasks);
    };

    const changeFilter = (todolistID: string, newFilter: FilterValues) => {
        // const currentToDo = todolists.find(el => el.id === todolistID);
       setTodolists(todolists.map(el=> el.id===todolistID ? {...el, filter:newFilter} : el) )
        }


    const createTask = (todolistID: string,title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistID]:[ ...tasks[todolistID],newTask ]})
        // const newTask = {id: v1(), title, isDone: false};
        // const newTasks = [newTask, ...tasks];
        // setTasks(newTasks);
    };

    const changeTaskStatus = (todolistID: string,taskId: string, isDone: boolean) => {

        setTasks({...tasks,[todolistID]: tasks[todolistID].map(el=> el.id ===taskId ? {...el, isDone: isDone} : el)})

        // const newState = tasks.map(task => task.id == taskId ? {...task, isDone} : task);
        // setTasks(newState);
    };

    const removeToDoList = (todolistID: string) => {
setTodolists((prevState) => prevState.filter(el => el.id !==todolistID ))
        delete tasks[todolistID]
        setTasks({...tasks})
    }

    return (
        <div className="app">
            {todolists.map(el => {
                let filteredTasks = tasks[el.id];
                if (el.filter === 'active') {
                    filteredTasks = tasks[el.id].filter(task => !task.isDone);
                }
                if (el.filter === 'completed') {
                    filteredTasks = tasks[el.id].filter(task => task.isDone);
                }
                return (
                    <TodolistItem
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={filteredTasks}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        createTask={createTask}
                        changeTaskStatus={changeTaskStatus}
                        removeToDoList={removeToDoList}
                        filter={el.filter}/>
                );
            })}

        </div>
    );
};
