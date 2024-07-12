import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/todolist/Todolist";
import {FilterType} from "./components/FilterType";
import {v1} from "uuid";

import {InputForm} from "./components/input_button-form/InputForm";

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {



    const todolistID1 = v1();
    const todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'what to learn', filter: 'All'},
        {id: todolistID2, title: 'what to buy', filter: 'All'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}],
        [todolistID2]: [
            {id: v1(), title: "book", isDone: true},
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "coffee", isDone: false}]
    })


    const changeFilter = (newFilter: FilterType, todolistID: string) => {

        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: newFilter} : tl))
    }
    const changeTodolistTitle = (newTitle: string, todolistID: string) => {

        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title: newTitle} : tl))
    }

    const addTask = (newTitle: string, todolistID: string) => {

        setTasks({...tasks, [todolistID]: [{id: v1(), title: newTitle, isDone: false}, ...tasks[todolistID]]})
    }
    const changeCheckbox = (taskID: string, todolistID: string) => {

        tasks[todolistID] = tasks[todolistID].map(t => t.id === taskID ? {...t, isDone: !t.isDone} : t)
        setTasks({...tasks})
    }

    const changeTaskTitle = (newTitle: string, taskID: string, todolistID: string) => {

        tasks[todolistID] = tasks[todolistID].map(t => t.id === taskID ? {...t, title: newTitle} : t)
        setTasks({...tasks})

    }


    const deleteTask = (id: string, todolistID: string) => {

        tasks[todolistID] = tasks[todolistID].filter(t => t.id != id)
        setTasks({...tasks})
    }
    const clearAllTasks = (todolistID: string) => {
        tasks[todolistID] = []
        setTasks({...tasks})
    }

    const addNewTodolist = (newTitle: string) => {

        let newTodolistID = v1()
        let newTodolist: TodolistType = {id: newTodolistID, title: newTitle, filter: 'All'}
        setTodolists([newTodolist, ...todolists])
        setTasks({[newTodolistID]: [], ...tasks})

    }
    const deleteTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(tl => tl.id != todolistID))
    }
    return (
        <div className="App">
            <div>
                <InputForm callback={addNewTodolist}/>
            </div>

            {todolists.map((tl) => {


                let filteredTasks = tasks[tl.id]

                switch (tl.filter) {
                    case 'Active' :
                        filteredTasks = filteredTasks.filter(task => !task.isDone)
                        break

                    case 'Completed':
                        filteredTasks = filteredTasks.filter(task => task.isDone)
                        break

                    default :

                        filteredTasks = tasks[tl.id]
                        break

                }

                return <Todolist todolistTitle={tl.title}
                                 key={tl.id}
                                 todolistID={tl.id}
                                 tasks={filteredTasks}
                                 deleteTask={deleteTask}
                                 changeFilter={changeFilter}
                                 clearAllTasks={clearAllTasks}
                                 addTask={addTask}
                                 changeCheckbox={changeCheckbox}
                                 changeTaskTitle={changeTaskTitle}
                                 changeTodolistTitle={changeTodolistTitle}
                                 filter={tl.filter}
                                 deleteTodolist={deleteTodolist}
                />

            })}

        </div>
    );
}

export default App;
