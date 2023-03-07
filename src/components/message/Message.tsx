import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type MsgProps = {
    content: string;
    fromSelf: boolean;
    // ref: any;
};

const Message = ({ content, fromSelf }: MsgProps): JSX.Element => {
    const messageStyle = {
        justifyContent: fromSelf ? "end" : "start",
        alignItems: "center",
        marginLeft: "auto",
    };

    return (
        <Grid container mb={0.5} gap={1} sx={messageStyle}>
            <Box>
                <Typography
                    variant='h5'
                    sx={{
                        textAlign: "start",
                        padding: "5px",
                        borderRadius: "5px",
                        bgcolor: fromSelf ? "#ef5350" : "#009688",
                    }}>
                    {content}
                </Typography>
            </Box>
        </Grid>
    );
};

export default Message;
