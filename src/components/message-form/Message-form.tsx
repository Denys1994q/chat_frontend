import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { indigo } from "@mui/material/colors";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, chat_addMsgToAllMsgs } from "../../store/slices/chatSlice";

const MessageForm = ({ socket }: any) => {
    const dispatch = useDispatch();
    const [msgValue, setMsgValue] = useState("");
    const currentUser = useSelector((state: any) => state.usersSlice.userData);
    const activeChatUser = useSelector((state: any) => state.chatSlice.activeChatUser);
    const allMesaggesWithUser = useSelector((state: any) => state.chatSlice.allMesaggesWithUser);

    const sendMsg = () => {
        if (msgValue.length === 0) {
            return;
        }
        const obj = {
            message: msgValue,
            from: currentUser._id,
            to: activeChatUser._id,
        };
        dispatch(sendMessage(obj));

        // ми серверу присилаємо
        socket.current.emit("send-message", {
            to: activeChatUser._id,
            from: currentUser._id,
            message: msgValue,
        });
        // відразу своє повідомлення собі ж показуємо
        const msgs = [...allMesaggesWithUser];
        msgs.push({ fromSelf: true, message: msgValue });
        dispatch(chat_addMsgToAllMsgs(msgs));
        setMsgValue("");
    };

    return (
        <>
            <Grid container direction='row' gap={2} mt={2}>
                <Box sx={{ width: "100%" }}>
                    <Box>
                        <TextField
                            value={msgValue}
                            onChange={e => setMsgValue(e.target.value)}
                            multiline
                            variant='outlined'
                            fullWidth
                            maxRows={8}
                            sx={{
                                ".MuiInputBase-input": { fontSize: "14px", color: "white" },
                                ".MuiOutlinedInput-notchedOutline": { borderColor: "#e3f2fd", opacity: 0.5 },
                            }}
                        />
                    </Box>
                    <Button
                        onClick={sendMsg}
                        variant='contained'
                        size='large'
                        sx={{ fontSize: "12px", margin: "10px 0", bgcolor: indigo[500] }}>
                        Send
                    </Button>
                </Box>
            </Grid>
        </>
    );
};

export default MessageForm;
