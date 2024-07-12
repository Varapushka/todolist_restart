import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    todolistsReduser
} from './todolist-reduser';
import { v1 } from 'uuid';
import {TodolistType} from "../App";

class TodoListType {
}

test('correct todoList should be removed', () => {
    let todoId1 = v1();
    let todoId2 = v1();

    const startToDoLists: TodolistType[] = [
        { id: todoId1, title: "What to learn", filter: "All" },
        { id: todoId2, title: "What to buy", filter: "All" }
    ];

   const endState = todolistsReduser(startToDoLists,deleteTodolistAC(todoId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoId2);
});

test('add new todoList ', () => {
    let todoId1 = v1();
    let todoId2 = v1();

    const newTodolistTitle = 'New todolist'
    const startToDoLists: TodolistType[] = [
        { id: todoId1, title: "What to learn", filter: "All" },
        { id: todoId2, title: "What to buy", filter: "All" }
    ];

    const endState = todolistsReduser(startToDoLists,addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);

});

test('change  todoListTitle ', () => {
    let todoId1 = v1();
    let todoId2 = v1();

    const newTodolistTitle = 'changed todolist Title'
    const startToDoLists: TodolistType[] = [
        { id: todoId1, title: "What to learn", filter: "All" },
        { id: todoId2, title: "What to buy", filter: "All" }
    ];

    const endState = todolistsReduser(startToDoLists,changeTodolistTitleAC(newTodolistTitle,todoId1))

    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[1].title).toBe("What to buy");

});

test('change  Filter ', () => {
    let todoId1 = v1();
    let todoId2 = v1();

    const newFilter = 'Completed'
    const startToDoLists: TodolistType[] = [
        { id: todoId1, title: "What to learn", filter: "All" },
        { id: todoId2, title: "What to buy", filter: "All" }
    ];

    const endState = todolistsReduser(startToDoLists,changeFilterAC(newFilter,todoId1))

    expect(endState[0].filter).toBe(newFilter);


});