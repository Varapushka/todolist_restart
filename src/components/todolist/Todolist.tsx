import React from "react";


import {FilterType} from "../FilterType";
import {InputForm} from "../input_button-form/InputForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {SuperCheckBox} from "./SuperCheckBox";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
type TodolistType = {
    todolistTitle: string;
    todolistID: string;
    tasks: Array<TaskType>;
    deleteTask: (taskID: string, todolistID: string) => void
    changeFilter: (newFilter: FilterType, todolistID: string) => void
    clearAllTasks: (todolistID: string) => void
    addTask: (newTitle: string, todolistID: string) => void
    changeCheckbox: (taskId: string, todolistID: string) => void
    changeTaskTitle: (newTitle: string, taskID: string, todolistID: string) => void;
    changeTodolistTitle: (newTitle: string,todolistID: string) => void
    filter: FilterType;
    deleteTodolist: (todolistID: string) => void
}


export const Todolist: React.FC<TodolistType> = ({
                                                     todolistTitle,
                                                     todolistID,
                                                     tasks,
                                                     deleteTask,
                                                     changeFilter,
                                                     clearAllTasks,
                                                     addTask,
                                                     changeCheckbox,
                                                     changeTaskTitle,
                                                     changeTodolistTitle,
                                                     filter,
                                                     deleteTodolist,
                                                 }) => {


    const filterAllHandler = () => {
        changeFilter('All', todolistID)
    }
    const filterActiveHandler = () => {
        changeFilter('Active', todolistID)
    }
    const filterCompletedHandler = () => {
        changeFilter('Completed', todolistID)
    }
    const filterClearHandler = () => {
        clearAllTasks(todolistID)
    }

    const addTaskHandler = (newTitle: string) => {
        addTask(newTitle, todolistID)
    }

        const deleteTodolistHandler = () => {
            deleteTodolist(todolistID)
        }


    const onChangeTodolistTitleHandler = (newTitle: string)=> {
        changeTodolistTitle(newTitle, todolistID)
    }
    const changeCheckboxHandler = (taskID: string) => {
        changeCheckbox(taskID,todolistID)
    }
        return <>
            <div className={'todolist'}>
                <h3 className={'inline-text'}><EditableSpan title={todolistTitle} className={''} onChangeTitle={onChangeTodolistTitleHandler}/></h3>

                <IconButton onClick={deleteTodolistHandler}>
                    <Delete/>
                </IconButton>

                <div>

                    <InputForm callback={addTaskHandler}/>

                </div>
                <ul>
                    {tasks.map((task) => {
                        const callbackHandler = () => {
                            deleteTask(task.id, todolistID)
                        }
                        const onChangeCheckboxHandler = (taskID: string) => {
                            changeCheckbox(taskID, todolistID)
                        }
                        const onChangeTaskTitleHandler = (newTitle: string) => {
                           changeTaskTitle(newTitle, task.id,  todolistID)
                        }

                        return <li key={task.id}>
                            {/*<input type="checkbox" checked={task.isDone}*/}
                            {/*                            onChange={() => onChangeCheckboxHandler(task.id)}/>*/}
                            <SuperCheckBox isDone={task.isDone} callback={()=>changeCheckboxHandler(task.id)}/>
                            <EditableSpan title={task.title}
                                          className={task.isDone ? 'finished-task' : ''}
                                            onChangeTitle={onChangeTaskTitleHandler}/>

                            <IconButton onClick={callbackHandler}>
                                <Delete/>
                            </IconButton>


                        </li>
                    })}
                </ul>
                <div>
                    <Button onClick={filterAllHandler} variant={filter === 'All' ? 'contained' : 'text'}>All</Button>
                    <Button  onClick={filterActiveHandler} variant={filter === 'Active' ? 'contained' : 'text'}>Active</Button>
                    <Button onClick={filterCompletedHandler} variant={filter === 'Completed' ? 'contained' : 'text'}>Completed</Button>
                    <Button color={"error"}    onClick={filterClearHandler} variant={filter === 'Clear' ? 'contained' : 'text'}>Clear</Button>


                </div>
            </div>
        </>
    }

