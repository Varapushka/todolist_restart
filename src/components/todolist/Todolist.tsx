import React, {useState} from "react";

import {Button} from "../button/Button";
import {FilterType} from "../FilterType";
import {Input} from "../input/Input";
import {InputForm} from "../input_button-form/InputForm";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
type TodolistType = {
    todolistTitle: string;
    todolistID: string;
    tasks: Array<TaskType>;
    deleteTask: (taskID: string, id: string) => void
    changeFilter: (newFilter: FilterType, id: string) => void
    clearAllTasks: (id: string) => void
    addTask: (newTitle: string, todolistID: string) => void
    changeCheckbox: (taskId: string, id: string) => void
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

        return <>
            <div className={'todolist'}>
                <h3 className={'inline-text'}>{todolistTitle}</h3>
                <Button name={'X'} callback={deleteTodolistHandler} className={''}/>

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

                        return <li key={task.id}><input type="checkbox" checked={task.isDone}
                                                        onChange={() => onChangeCheckboxHandler(task.id)}/>
                            <span className={task.isDone ? 'finished-task' : ''}>{task.title}</span>
                            <Button name={'✖️'} callback={callbackHandler} className={''}/>

                        </li>
                    })}
                </ul>
                <div>
                    <Button name={'All'} callback={filterAllHandler}
                            className={filter === 'All' ? 'active-button' : ''}/>
                    <Button name={'Active'} callback={filterActiveHandler}
                            className={filter === 'Active' ? 'active-button' : ''}/>
                    <Button name={'Completed'} callback={filterCompletedHandler}
                            className={filter === 'Completed' ? 'active-button' : ''}/>
                    <Button name={'Clear'} callback={filterClearHandler}
                            className={filter === 'Clear' ? 'active-button' : ''}/>

                </div>
            </div>
        </>
    }
