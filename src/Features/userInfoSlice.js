import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    filteredUser : [],
    loading: false,
    error: null
};

export const createUser = createAsyncThunk('createUser', async (data, { rejectWithValue }) => {
    try {
        const response = await fetch("https://669dc4539a1bda3680044f8d.mockapi.io/CRUD", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            return rejectWithValue("Error creating user");
        }
        return await response.json();
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const showAllUsers = createAsyncThunk('showUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch("https://669dc4539a1bda3680044f8d.mockapi.io/CRUD");
        if (!response.ok) {
            return rejectWithValue("Error fetching users");
        }
        return await response.json();
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const deleteUser = createAsyncThunk('deleteUser', async (id, { rejectWithValue }) => {
    try {
        const response = await fetch(`https://669dc4539a1bda3680044f8d.mockapi.io/CRUD/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            return rejectWithValue("Error deleting user");
        }
        return id;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const editUser = createAsyncThunk('editUser', async ({ id, data }, { rejectWithValue }) => {
    try {
        const response = await fetch(`https://669dc4539a1bda3680044f8d.mockapi.io/CRUD/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            return rejectWithValue("Error updating user");
        }
        return await response.json();
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

const userInformation = createSlice({
    name: "UserInformation",
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
                state.error = null;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(showAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(showAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.filteredUser = state.users
                state.error = null;
            })
            .addCase(showAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(user => user.id !== action.payload);
                state.filteredUser = state.filteredUser.filter((user)=>user.id!==action.payload)
                state.error = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map((user=>user.id == action.payload.id ? action.payload : user))
                state.error = null;
            })
            .addCase(editUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
    reducers: {
        filteredGender: (state, action) => {
            if(action.payload === 'all'){
                state.filteredUser = state.users
            }
            else{
                const filtered = state.users.filter((user) => user.gender === action.payload);
                state.filteredUser = filtered;
            }
            console.log(state.filteredUser)
        },
        searchUser : (state,action)=>{
            console.log(action.payload)
            state.filteredUser = state.users.filter((user)=>user.name == action.payload)
        }
    }
    
});

export const {filteredGender , searchUser} = userInformation.actions

export default userInformation.reducer;
