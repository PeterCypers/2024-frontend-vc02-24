import React from "react";
import { Box, Typography } from "@mui/material";

export default function NotificatieLeverancier({ notificatie }) {
    return (
        <Box sx={{ padding: 2, borderBottom: '1px solid gray' }}>
            <Typography variant="subtitle1">{notificatie.BERICHT}</Typography>
            <Typography variant="body2" color="text.secondary">
                Datum: {new Date(notificatie.DATUM).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Status: {notificatie.NOTIFICATIESTATUS}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Order ID: {notificatie.ORDERID}
            </Typography>
        </Box>
    );
}