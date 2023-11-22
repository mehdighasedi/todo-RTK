import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        loading: false,
        todo: [],
        error: ""
    },
    reducers: {
        AddTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false,
            }
            state.todo.push(newTodo)
        },
        toggleTodo: (state, action) => {
            const selectedTodo = state.todo.find(t => t.id === Number(action.payload.id))
            selectedTodo.completed = !selectedTodo.completed
        },
        deleteTodo: (state, action) => {
            state.todo = state.todo.filter(t => t.id !== Number(action.payload.id))
        }


    }
})

export const { AddTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;