import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
    baseURL: "http://localhost:5000"
})
export const getAsyncTodos = createAsyncThunk("todos/getAsyncTodos", async (_, { rejectWithValue }) => {
    try {
        const res = await api.get("/todos");
        return res.data;
    } catch (error) {
        rejectWithValue(error.message)
        toast.error(error.message)
    }
})

export const addAsyncTodos = createAsyncThunk("todos/addAsyncTodos", async (payload, { rejectWithValue }) => {
    try {
        const res = await api.post("/todos", {
            id: Date.now(),
            title: payload.title,
            completed: false,
        });
        toast.success("Todo Successfully Added")
        return res.data;
    } catch (error) {
        rejectWithValue(error.message)
        toast.error(error.message);
    }
})

export const deleteAsyncTodo = createAsyncThunk("todos/deleteAsyncTodo", async (payload, { rejectWithValue }) => {
    try {
        await api.delete(`/todos/${payload.id}`)
        toast.success("Todo Successfully Deleted")
        return { id: payload.id }
    } catch (error) {
        rejectWithValue(error.message)
        toast.error(error.message);
    }
})
export const toggleAsyncTodo = createAsyncThunk("todos/toggleAsyncTodo", async (payload, { rejectWithValue }) => {
    try {
        const res = await api.patch(`/todos/${payload.id}`, {
            completed: payload.completed
        })
        return res.data;
    } catch (error) {
        rejectWithValue(error.message)
        toast.error(error.message);
    }
})

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        loading: false,
        todos: [],
        error: ""
    },
    reducers: {
        AddTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false,
            }
            state.todos.push(newTodo)
        },
        toggleTodo: (state, action) => {
            const selectedTodo = state.todos.find(t => t.id === Number(action.payload.id))
            selectedTodo.completed = !selectedTodo.completed
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(t => t.id !== Number(action.payload.id))
        }


    },
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
            state.todos.push(action.payload)
            state.error = "";
        },
        [deleteAsyncTodo.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteAsyncTodo.fulfilled]: (state, action) => {
            state.loading = false;
            state.todos = state.todos.filter(todo => todo.id !== Number(action.payload.id))
            state.error = "";

        },
        [toggleAsyncTodo.pending]: (state, action) => {
            state.loading = true;
        },
        [toggleAsyncTodo.fulfilled]: (state, action) => {
            state.loading = false;
            const selectedTodos = state.todos.find(todo => todo.id === Number(action.payload.id))
            selectedTodos.completed = action.payload.completed
        }

    }

})

export const { AddTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;