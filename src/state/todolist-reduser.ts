import {TaskType} from "../components/todolist/Todolist";
import {TodolistType} from "../App";
import {v1} from "uuid";
import {FilterType} from "../components/FilterType";


type TasksType = {
    [key: string]: Array<TaskType>
}

export const todolistsReduser = (state: TodolistType[], action: todolistsReduserType):TodolistType[] => {
    switch (action.type) {
        case 'DELETE-TODOLIST': {
            return state.filter(el=>el.id != action.payload.id)
        }
        case 'ADD-TODOLIST': {

            let newTodolist: TodolistType = {id: v1(), title: action.payload.title, filter: 'All'}
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST': {
            return state.map(tl => tl.id === action.payload.todolistID ?{...tl, title: action.payload.newTitle} : tl)
        }
        case 'CHANGE-FILTER': {
            return state.map(tl => tl.id === action.payload.todolistID ?{...tl, filter: action.payload.newFilter} : tl)
        }
        default: {
            return state
        }
    }
}
type todolistsReduserType = deleteTodolistACType | addTodolistACType | changeTodolistTitleACType | changeFilterACType
type deleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (id: string) => {
    return {
        type: 'DELETE-TODOLIST', payload:{id}
    } as const
}
type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST', payload:{title}
    } as const
}
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (newTitle: string, todolistID: string) =>{
    return{
        type: 'CHANGE-TODOLIST',
        payload:{newTitle, todolistID}
    } as const 
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (newFilter: FilterType, todolistID: string) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            newFilter, todolistID
        }
    } as const
}