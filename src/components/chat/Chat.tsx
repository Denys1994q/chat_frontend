import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { login_logout } from "../../store/slices/usersSlice";

import UsersList from "../users-list/Users-list";
import MessageForm from "../message-form/Message-form";
import ChatDesk from "../chat-desk/Chat-desk";
import DialogComponent from "../dialog/Dialog";

const Chat = () => {
    const socket: any = useRef();

    const dispatch = useDispatch();
    const currentUser = useSelector((state: any) => state.usersSlice.userData);
    const activeChatUser = useSelector((state: any) => state.chatSlice.activeChatUser);
    const [openDialog, setOpenDialog] = useState(false);

    // when a person is logged in, we passed a currentUser._id to the websockets
    useEffect(() => {
        socket.current = io("http://localhost:4444");
        socket.current.emit("add-user", currentUser._id);
    }, [currentUser]);

    const onYesDialog = () => {
        dispatch(login_logout());
        window.localStorage.removeItem("token");
    };

    return (
        <>
            <Box>
                <Box sx={{ textAlign: "right" }}>
                    <PowerSettingsNewIcon
                        style={{
                            fontSize: "35px",
                            color: "#d32f2f",
                            cursor: "pointer",
                            marginBottom: "5px",
                        }}
                        onClick={() => setOpenDialog(true)}
                    />
                </Box>
                <Grid container spacing={2} wrap={"wrap"}>
                    <Grid item lg={2} md={2} sm={4} xs={12} sx={{ position: "relative" }}>
                        <UsersList />
                    </Grid>
                    <Grid item lg={10} md={10} sm={8} xs={12}>
                        <ChatDesk socket={socket} empty={activeChatUser ? false : true} />
                        {activeChatUser && <MessageForm socket={socket} />}
                    </Grid>
                </Grid>
            </Box>
            <DialogComponent
                open={openDialog}
                setOpen={setOpenDialog}
                question={"Are you sure you want to leave?"}
                onYes={onYesDialog}
            />
        </>
    );
};

export default Chat;
