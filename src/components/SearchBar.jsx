import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function SearchBar({handleClick,placeholder_text}) {
  const [text, setText] = React.useState('');
    const handleKeyDown = (event) => {
      if(event.key==='Enter'){
        event.preventDefault();
        handleClick(text);
      }
      
  }
  return (
    <Paper
      component="form"
      sx={{ p: 'px 4px 2px 10px', display: 'flex', alignItems: 'center', borderRadius: '2em'}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder_text}
        inputProps={{ 'aria-label': placeholder_text }}
        value={text} onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <IconButton type="button" sx={{ p: '12px' }} aria-label="search" onClick={() => handleClick(text)}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}