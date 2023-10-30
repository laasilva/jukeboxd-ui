import { Alert, AlertColor, AlertTitle } from "@mui/material";
import { useState } from "react";

interface Props {
    message: string,
    severity: AlertColor,
}

const Toast = (props: Props) => {
    const { message, severity } = props;
    
    function title() {
        switch(severity) {
            case "success":
                return <AlertTitle>Success</AlertTitle>;
            case "info":
                return <AlertTitle>Info</AlertTitle>;
            case "warning":
                return <AlertTitle>Warning</AlertTitle>;
            case "error":
                return <AlertTitle>Error</AlertTitle>;
            default:
                return ;
        }
    }

    return (
        <Alert severity={severity}>
            {title()}
            {message}
        </Alert>
    );
}

export default Toast;