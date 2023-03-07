import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDispatch } from "react-redux";

type DialogComponentProps = {
    open: boolean;
    alertMsg?: string;
    setOpen: any;
    question: string;
    onYes?: any;
    id?: string;
};

const DialogComponent = ({ open, alertMsg, setOpen, question, onYes }: DialogComponentProps): JSX.Element => {
    const handleClose = () => {
        setOpen(false);
    };

    const onYesFunc = () => {
        onYes();
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'>
                <DialogTitle id='alert-dialog-title' sx={{ fontSize: "16px", bgcolor: "#eeeeee" }}>
                    {question}
                </DialogTitle>
                <DialogActions sx={{bgcolor: "#eeeeee"}}>
                    <Button onClick={handleClose} sx={{ fontSize: "14px", bgcolor: "#bdbdbd", color: 'black' }}>
                        No
                    </Button>
                    <Button onClick={onYesFunc} sx={{ fontSize: "14px", bgcolor: "#bdbdbd", color: 'black' }} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DialogComponent;
