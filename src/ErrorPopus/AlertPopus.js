import React, { useState, useContext, useEffect } from "react";
import { Alert } from "@mui/material";
import { AlertContext } from "../Context/AlertsPopusContext";

const AlertPopupMessage = () => {
    const [severetary, setSeveretri] = useState();
    const { message, setMessage, status, setStatus } = useContext(AlertContext);

    // set the status only on render status
    useEffect(() => {
        const severityArray = ['success', 'error', 'info', 'warning'];
        if (message.status) {
            setSeveretri(severityArray.filter(message => message === 'success').join(''));
        } else {
            setSeveretri(severityArray.filter(message => message === 'warning').join(''));
        }
    } , [message , status])

    return (
        <>
            {
                status && <Alert className="API_Response_Status" variant="filled" severity={severetary}>
                    {message.message}
                </Alert>
            }
        </>
    )
}

export default AlertPopupMessage;