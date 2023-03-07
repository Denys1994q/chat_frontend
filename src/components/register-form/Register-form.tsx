import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchRegister } from "../../store/slices/usersSlice";

import AlertComponent from "../alert/Alert";

const RegisterForm = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("");
    const inputFileRef: any = useRef(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [success, setSuccess] = useState(false);

    const style = {
        maxWidth: 400,
        margin: "40px auto",
        bgcolor: "#37474f",
        border: "1px solid #fcfcfc",
        boxShadow: 6,
        p: 4,
        textAlign: "center",
    };

    const textFieldStyle = {
        ".MuiInputLabel-root": { fontSize: "14px", color: "#ff9800" },
        ".MuiInputBase-input": { fontSize: "14px", color: "#ff9800" },
        ".MuiFormHelperText-root.Mui-error": { fontSize: "14px" },
        ".MuiOutlinedInput-root": { fontSize: "14px" },
        ".Mui-focused": { fontSize: "14px", color: "#ff9800" },
        ".MuiOutlinedInput-notchedOutline": { borderColor: "#ffa726", opacity: 0.5 },
    };

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const handleChangeFile = async (e: any) => {
        try {
            const formData = new FormData();
            formData.append("image", e.target.files[0]);
            const { data } = await axios.post("/upload", formData);
            setImageUrl(data.url);
        } catch (err) {
            console.warn(err);
            alert("Error");
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl("");
    };

    const onSubmit = async (values: any) => {
        const valueWithImg = {
            ...values,
            avatarUrl: imageUrl,
        };
        const data = await dispatch(fetchRegister(valueWithImg));

        if (!data.payload) {
            setOpenAlert(true);
            setSuccess(false);
        } else {
            setOpenAlert(true);
            setSuccess(true);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }

        if ("token" in data.payload) {
            window.localStorage.setItem("token", data.payload.token);
        }
    };

    return (
        <>
            <Box sx={style}>
                <Typography variant='h3'>Create Account</Typography>
                <PersonIcon sx={{ fontSize: 50 }} color='warning' />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box>
                        <TextField
                            {...register("fullName", {
                                required: "Please enter a name",
                                minLength: { value: 3, message: "At least 3 letters" },
                            })}
                            error={Boolean(errors.fullName?.message)}
                            helperText={errors.fullName?.message}
                            id='fullName'
                            color='warning'
                            fullWidth
                            margin='dense'
                            label='name'
                            variant='outlined'
                            sx={textFieldStyle}
                        />
                        <TextField
                            {...register("email", {
                                required: "Please enter an email",
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "Please enter a valid email",
                                },
                            })}
                            error={Boolean(errors.email?.message)}
                            helperText={errors.email?.message}
                            id='email'
                            color='warning'
                            type='email'
                            fullWidth
                            margin='dense'
                            label='email'
                            variant='outlined'
                            sx={textFieldStyle}
                        />
                        <TextField
                            {...register("password", {
                                required: "Please enter a password",
                                minLength: { value: 10, message: "At least 10 symbols" },
                                pattern: {
                                    value: /\d/,
                                    message: "Password must contains a digit",
                                },
                            })}
                            error={Boolean(errors.password?.message)}
                            helperText={errors.password?.message}
                            id='password'
                            color='warning'
                            type='password'
                            margin='dense'
                            label='password'
                            variant='outlined'
                            fullWidth
                            sx={textFieldStyle}
                        />
                        <Button
                            onClick={() => inputFileRef?.current.click()}
                            variant='outlined'
                            color='warning'
                            fullWidth
                            size='large'
                            sx={{ marginTop: "6px" }}>
                            Upload avatar
                        </Button>
                        <input ref={inputFileRef} type='file' style={{ display: "none" }} onChange={handleChangeFile} />
                        {imageUrl && (
                            <>
                                <Button
                                    variant='contained'
                                    color='error'
                                    size='large'
                                    fullWidth
                                    onClick={onClickRemoveImage}
                                    sx={{ marginTop: "10px" }}>
                                    Delete
                                </Button>
                                <div>
                                    <img
                                        style={{ maxWidth: "200px", marginTop: "10px" }}
                                        // src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
                                        src={`${imageUrl}`}
                                        alt='uploaded photo'
                                    />
                                </div>
                            </>
                        )}
                        <Button
                            type='submit'
                            disabled={!isValid}
                            variant='contained'
                            color='warning'
                            size='large'
                            fullWidth
                            sx={{ fontSize: "12px", margin: "10px 0" }}>
                            Register
                        </Button>
                        <Typography variant='h5'>
                            Already have an account?{" "}
                            <Link to='/' style={{ color: "#ff9800" }}>
                                Login
                            </Link>
                        </Typography>
                    </Box>
                </form>
                <AlertComponent
                    setOpenAlert={setOpenAlert}
                    openAlert={openAlert}
                    success={success}
                    errorText={"Registration failed"}
                />
            </Box>
        </>
    );
};

export default RegisterForm;
