import axios from '../../axios'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    userDataLoading: true,
    userDataError: false,
    allUsers: null,
    allUsersLoading: false
};

export const fetchUserData: any = createAsyncThunk("login/fetchUserData", async (params) => {
    const { data } = await axios.post('/auth/login', params)
    return data
});

export const fetchRegister: any = createAsyncThunk("auth/fetchRegister", async (params) => {
    const { data } = await axios.post('/auth/register', params)
    return data
});


export const fetchAuthMe: any = createAsyncThunk("login/fetchAuthMe", async () => {
    const { data } = await axios.get('/auth/me')
    return data
});

export const fetchAllUsers: any = createAsyncThunk("fetchAllUsers", async (id) => {
    const { data } = await axios.get(`allUsers/${id}`)
    return data
});

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        login_logout: (state) => {
            state.userData = null
        }
    },
    extraReducers: builder => {
        builder 
            // авторизація 
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.userData = action.payload;
                // state.userDataLoading = false;
                state.userDataError = false;
            })
            .addCase(fetchUserData.rejected, state => {
                state.userDataError = true;
            })
            // реєстрація
            // .addCase(fetchRegister.pending, state => {
            //     state.userDataLoading = true;
            //     state.userDataError = false;
            // })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.userData = action.payload;
                // state.userDataLoading = false;
                state.userDataError = false;
            })
            .addCase(fetchRegister.rejected, state => {
                state.userDataError = true;
            })
            // перевірка юзера на доступ
            .addCase(fetchAuthMe.pending, state => {
                state.userDataLoading = true;
                state.userDataError = false;
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.userDataLoading = false;
                state.userDataError = false;
            })
            .addCase(fetchAuthMe.rejected, state => {
                state.userDataError = true;
                state.userDataLoading = false;
            })
            // список всіх юзерів
            .addCase(fetchAllUsers.pending, state => {
                // state.userDataError = false;
                state.allUsersLoading = true
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.allUsers = action.payload;
                state.allUsersLoading = false
                // state.userDataError = false;
            })
            .addCase(fetchAllUsers.rejected, state => {
                state.allUsersLoading = false
                // state.userDataError = true;
            })
        }
});

const { actions, reducer } = usersSlice;

export default reducer;

export const { login_logout
} = actions;