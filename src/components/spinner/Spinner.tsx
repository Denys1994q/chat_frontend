import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { amber } from "@mui/material/colors";

const Spinner = ({ typeOfSpinner }: any): JSX.Element => {
    const style = {
        display: "flex",
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    };

    return (
        <>
            <Box sx={style}>
                {typeOfSpinner == "circular" && <CircularProgress sx={{ color: amber[900] }} value={30} />}
                {typeOfSpinner == "linear" && <LinearProgress color='success' sx={{ width: "100px" }} />}
            </Box>
        </>
    );
};

export default Spinner;
