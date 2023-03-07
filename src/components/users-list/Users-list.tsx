import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../store/slices/usersSlice";
import { chat_setActiveChatUser } from "../../store/slices/chatSlice";

import Spinner from "../spinner/Spinner";

const UsersList = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: any) => state.usersSlice.userData);
    const allUsers = useSelector((state: any) => state.usersSlice.allUsers);
    const allUsersLoading = useSelector((state: any) => state.usersSlice.allUsersLoading);
    const [indexActiveUser, setIndexActiveUser] = useState<null | number>(null);

    useEffect(() => {
        dispatch(fetchAllUsers(currentUser._id));
    }, []);

    const userStyle = {
        marginTop: 0,
        borderBottom: "1px solid #37474f",
        cursor: "pointer",
        "&:hover": {
            bgcolor: "#455a64",
        },
    };

    const userStyleActive = {
        cursor: "pointer",
        bgcolor: "#455a64",
    };

    const selectUser = (user: Object, index: number) => {
        setIndexActiveUser(index);
        dispatch(chat_setActiveChatUser(user));
    };

    const content = allUsers && (
        <List>
            {allUsers.map((user: any, index: number) => {
                return (
                    <ListItem
                        key={index}
                        divider
                        sx={indexActiveUser === index ? userStyleActive : userStyle}
                        onClick={() => selectUser(user, index)}>
                        <ListItemAvatar>
                            <Avatar src={user.avatarUrl} />
                        </ListItemAvatar>
                        <ListItemText
                            primaryTypographyProps={{ fontSize: "14px" }}
                            primary={user.fullName}
                            sx={{ textAlign: "center" }}
                        />
                    </ListItem>
                );
            })}
        </List>
    );

    return (
        <>
            {allUsersLoading ? (
                <Spinner typeOfSpinner={"linear"} />
            ) : (
                <Grid sx={{ height: { lg: "61vh", xs: "auto" }, overflowY: "auto" }}>{content}</Grid>
            )}
        </>
    );
};

export default UsersList;
