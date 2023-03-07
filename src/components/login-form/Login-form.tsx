import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../../store/slices/usersSlice";
import { useDispatch } from "react-redux";

import AlertComponent from "../alert/Alert";

const LoginForm = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 320,
        bgcolor: "#37474f",
        border: "1px solid #fcfcfc",
        boxShadow: 6,
        p: 4,
        textAlign: "center",
    };

    const textFieldStyle = {
        ".MuiInputLabel-root": { fontSize: "14px", color: "#ff9800" },
        ".MuiInputBase-input": { fontSize: "14px", color: "#ff9800" },
        ".Mui-focused": { fontSize: "14px", color: "#ff9800" },
        ".MuiOutlinedInput-notchedOutline": { borderColor: "#ffa726", opacity: 0.5 },
    };

    const onSubmit = async (values: any) => {
        const data = await dispatch(fetchUserData(values));

        if (!data.payload) {
            setOpenAlert(true);
            setSuccess(false);
        } else {
            setOpenAlert(true);
            setSuccess(true);
        }

        if ("token" in data.payload) {
            window.localStorage.setItem("token", data.payload.token);
        }
    };

    return (
        <>
            <Box sx={style}>
                <Typography variant='h3'>Login to the account</Typography>
                <LoginIcon sx={{ fontSize: 30 }} color='warning' />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box>
                        <TextField
                            {...register("email", {
                                required: "Enter your email",
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "Please enter a valid email",
                                },
                            })}
                            error={Boolean(errors.email?.message)}
                            helperText={errors.email?.message}
                            type='email'
                            label='email'
                            fullWidth
                            margin='dense'
                            color='warning'
                            // focused
                            variant='outlined'
                            sx={textFieldStyle}
                        />
                        <TextField
                            {...register("password", {
                                required: "Enter your password",
                                minLength: { value: 10, message: "At least 10 symbols" },
                            })}
                            error={Boolean(errors.password?.message)}
                            helperText={errors.password?.message}
                            id='password'
                            type='password'
                            margin='dense'
                            color='warning'
                            label='password'
                            variant='outlined'
                            fullWidth
                            sx={textFieldStyle}
                        />
                        <Button
                            type='submit'
                            variant='contained'
                            color='warning'
                            size='large'
                            fullWidth
                            sx={{
                                fontSize: "12px",
                                margin: "10px 0",
                            }}>
                            Login
                        </Button>
                        <Typography variant='h5'>
                            Do not have an account?{" "}
                            <Link to='/register' style={{ color: "#ff9800" }}>
                                Register
                            </Link>
                        </Typography>
                    </Box>
                </form>
            </Box>
            <AlertComponent
                setOpenAlert={setOpenAlert}
                openAlert={openAlert}
                success={success}
                errorText={"Authorization failed"}
            />
        </>
    );
};

export default LoginForm;
