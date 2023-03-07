import axios from "../../axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    activeChatUser: null,
    message: null,
    messageLoading: false,
    messageLoadingError: false,
    allMesaggesWithUser: null,
    allMesaggesWithUserLoading: false,
    allMesaggesWithUserError: false
};

export const sendMessage: any = createAsyncThunk("chat/sendMessage", async (obj) => {
    const { data } = await axios.post('/addMessage', obj)
    return data
});

export const getMessages: any = createAsyncThunk("chat/getMessages", async (obj: any) => {
    const { data } = await axios.post('/getMessages', obj)
    return data
});

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {        
        chat_setActiveChatUser: (state, action) => {
        state.activeChatUser = action.payload
    }, 
    chat_addMsgToAllMsgs: (state, action) => {
        state.allMesaggesWithUser = action.payload
    } 
},
    extraReducers: builder => {
        builder 
            // відправка повідомлення
            .addCase(sendMessage.pending, state => {
                state.messageLoading = true;
                state.messageLoadingError = false;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.message = action.payload;
                state.messageLoading = false;
                state.messageLoadingError = false;
            })
            .addCase(sendMessage.rejected, state => {
                state.messageLoadingError = true;
                state.messageLoading = false;
            })
            // отримати всі повідомлення з вибраним юзером
            .addCase(getMessages.pending, state => {
                state.allMesaggesWithUserLoading = true
                state.allMesaggesWithUserError = false
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.allMesaggesWithUser = action.payload;
                state.allMesaggesWithUserLoading = false
                state.allMesaggesWithUserError = false
            })
            .addCase(getMessages.rejected, state => {
                state.allMesaggesWithUserLoading = false
                state.allMesaggesWithUserError = true
            })
        }
});

const { actions, reducer } = chatSlice;

export default reducer;

export const { chat_setActiveChatUser, chat_addMsgToAllMsgs } = actions;