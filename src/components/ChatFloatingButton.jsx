import React, { useState } from 'react';
import { Fab, Dialog, useTheme, useMediaQuery, IconButton, Paper } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import Chatbox from './chatBox/Chatbox';

const ChatFloatingButton = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
            <Fab color="primary" aria-label="chat" onClick={handleClickOpen}>
                <ChatIcon />
            </Fab>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                PaperProps={{
                    style: {
                        position: 'absolute',
                        bottom: 70,
                        right: 60,
                        margin: 0,
                        width: '350px', 
                        maxHeight: 'calc(100vh - 70px)', 
                        borderRadius: '20px 20px 0 20px', 
                        overflow: 'hidden' 
                    }
                }}
                BackdropProps={{
                    invisible: true
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    style={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <Chatbox />
            </Dialog>
        </div>
    );
};

export default ChatFloatingButton;
