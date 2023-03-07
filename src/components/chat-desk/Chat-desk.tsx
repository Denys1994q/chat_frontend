import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { getMessages, chat_addMsgToAllMsgs } from "../../store/slices/chatSlice";

import Message from "../message/Message";
import Spinner from "../spinner/Spinner";

const ChatDesk = ({ socket, empty }: any) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: any) => state.usersSlice.userData);
    const activeChatUser = useSelector((state: any) => state.chatSlice.activeChatUser);
    const allMesaggesWithUser = useSelector((state: any) => state.chatSlice.allMesaggesWithUser);
    const allMesaggesWithUserLoading = useSelector((state: any) => state.chatSlice.allMesaggesWithUserLoading);
    const [arrivalMsgs, setArrivalMsgs] = useState<any>([]);
    const scrollRef: any = useRef();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));

    const boxStyle = {
        backgroundColor: "#263238",
        color: "white",
        border: "1px solid #e1bee7",
        fontSize: "16px",
        height: "61vh",
        overflowY: "auto",
    };

    // sockets
    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-receive", (message: any) => {
                let copy: Object[] = [];
                copy.push({ fromSelf: false, message: message });
                setArrivalMsgs(copy);
            });
        }
    }, [socket.current]);

    useEffect(() => {
        let copy: Object[] = [];
        allMesaggesWithUser &&
            allMesaggesWithUser.map((it: any) => {
                copy.push(it);
            });
        arrivalMsgs &&
            arrivalMsgs.map((item: any) => {
                copy.push(item);
            });
        dispatch(chat_addMsgToAllMsgs(copy));
    }, [arrivalMsgs]);

    interface ObjGetMsgs {
        from: string;
        to: string;
    }
    useEffect(() => {
        const obj: ObjGetMsgs = {
            from: currentUser._id,
            to: activeChatUser && activeChatUser._id,
        };
        dispatch(getMessages(obj));
    }, [activeChatUser]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ alignToTop: true });
    }, [allMesaggesWithUser]);

    interface Msg {
        fromSelf: boolean;
        message: string;
    }
    const showMessages =
        allMesaggesWithUser &&
        allMesaggesWithUser.map((message: Msg, index: number) => {
            return (
                <div key={index} ref={scrollRef}>
                    <Message key={index} content={message.message} fromSelf={message.fromSelf} />
                </div>
            );
        });

    const content = (
        <Item sx={boxStyle}>
            {activeChatUser && <span>chat with: {activeChatUser.fullName}</span>}
            {allMesaggesWithUserLoading ? (
                <div style={{ position: "relative", height: "53vh" }}>
                    <Spinner typeOfSpinner={"linear"} />
                </div>
            ) : (
                <>
                    {activeChatUser && allMesaggesWithUser && allMesaggesWithUser.length > 0 ? (
                        showMessages
                    ) : (
                        <> {activeChatUser ? <div style={{ textAlign: "end" }}>no messages yet</div> : null} </>
                    )}
                </>
            )}
        </Item>
    );
    return (
        <>
            {empty ? (
                <Item sx={boxStyle}>
                    <div
                        style={{
                            textAlign: "center",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        Select a user to start a chat
                    </div>
                </Item>
            ) : (
                content
            )}
        </>
    );
};

export default ChatDesk;
