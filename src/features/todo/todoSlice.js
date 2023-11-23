import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000"
})
export const getAsyncTodos = createAsyncThunk("todos/getAsyncTodos", async (_, { rejectWithValue }) => {
    try {
        const res = await api.get("/todos");
        return res.data;
    } catch (error) {
        rejectWithValue(error.message)
    }
})

export const addAsyncTodos = createAsyncThunk("todos/addAsyncTodos", async (payload, { rejectWithValue }) => {
    try {
        const res = await api.post("/todos", {
            id: Date.now(),
            title: payload.title,
            completed: false,
        });
        return res.data;
    } catch (error) {
        rejectWithValue(error.message)
    }
})

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        loading: false,
        todos: [],
        error: ""
    },
    // reducers: {
    //     AddTodo: (state, action) => {
    //         const newTodo = {
    //             id: Date.now(),
    //             title: action.payload.title,
    //             completed: false,
    //         }
    //         state.todo.push(newTodo)
    //     },
    //     toggleTodo: (state, action) => {
    //         const selectedTodo = state.todo.find(t => t.id === Number(action.payload.id))
    //         selectedTodo.completed = !selectedTodo.completed
    //     },
    //     deleteTodo: (state, action) => {
    //         state.todo = state.todo.filter(t => t.id !== Number(action.payload.id))
    //     }


    // },
    extraReducers: {
        [getAsyncTodos.pending]: (state, action) => {
            state.loading = true;
            state.todos = [];
            state.error = "";
        },

        [getAsyncTodos.fulfilled]: (state, action) => {
            state.loading = false;
            state.todos = action.payload;
            state.error = "";
        },

        [getAsyncTodos.rejected]: (state, action) => {
            state.loading = false;
            state.todos = [];
            state.error = action.payload
        },
        [addAsyncTodos.pending]: (state, action) => {
            state.loading = true;
        },

        [addAsyncTodos.fulfilled]: (state, action) => {
            state.loading = false;
            state.todos = action.payload;
            state.error = "";
        },

    }

})

export const { AddTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;