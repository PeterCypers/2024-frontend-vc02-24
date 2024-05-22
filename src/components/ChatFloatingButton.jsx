import React, { useState } from "react";
import {
  Fab,
  Dialog,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import Chatbox from "./chatBox/Chatbox";

const ChatFloatingButton = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5">
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
            position: "absolute",
            bottom: 40,
            right: 30,
            width: "300px",
            maxHeight: "calc(100vh - 70px)",
            backgroundColor: '#DC2626',
            borderRadius: "20px 20px 0 20px",
            overflow: "hidden",
          },
        }}
        BackdropProps={{
          invisible: true,
        }}
      >
        <Chatbox />
      </Dialog>
    </div>
  );
};

export default ChatFloatingButton;
