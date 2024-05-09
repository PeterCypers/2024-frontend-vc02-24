import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ handleClick, placeholder_text }) {
  const [text, setText] = React.useState("");
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log(text);
      handleClick(text);
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        borderRadius: "2em",
        maxWidth: "250px",
        ml: 3,
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handleClick(text);
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder_text}
        inputProps={{ "aria-label": "search products..." }}
        onChange={(e) => setText(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
