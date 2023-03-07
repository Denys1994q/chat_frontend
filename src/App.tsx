import "./styles/App.sass";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "./store/slices/usersSlice";
// import { io } from "socket.io-client";

import LoginForm from "./components/login-form/Login-form";
import RegisterForm from "./components/register-form/Register-form";

import Spinner from "./components/spinner/Spinner";
import Chat from "./components/chat/Chat";

// const socket = io("http://localhost:4444");

function App(): JSX.Element {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.usersSlice.userData);
    const userDataLoading = useSelector((state: any) => state.usersSlice.userDataLoading);

    const theme = createTheme({
        typography: {
            fontFamily: ["Montserrat"].join(","),
        },
    });

    useEffect(() => {
        dispatch(fetchAuthMe());
        // socket.emit('join_room', '5')
    }, []);

    const content = user && user._id ? <Chat /> : <LoginForm />;

    return (
        <ThemeProvider theme={theme}>
            <div className='mainContainer'>
                <Routes>
                    <Route path='/' element={userDataLoading ? <Spinner typeOfSpinner={"circular"} /> : content} />
                    <Route path='/register' element={<RegisterForm />} />
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
