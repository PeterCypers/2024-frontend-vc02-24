import { IoCart } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import { IconButton, Menu, MenuItem, ListItemIcon, Avatar, Divider } from '@mui/material';
import { Login, Logout, Person } from '@mui/icons-material';
import { useState } from 'react';
import { useAuth } from '../contexts/Auth.context';
import { red } from "@mui/material/colors";

const Navbar = () => {
  const { isAuthed, gebruikerLetter } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function letterAvatar(letter) {
    return {
      children: `${letter}`,
    };
  }
  
  return (
    <>
      <nav className="border-b-2 border-gray-100">
        <ul className="flex justify-between">
          <li>
            <img
              className="h-14"
              src="/images/Delaware-logo.png"
              alt="Delaware logo"
            />
          </li>
          <ul className="flex">
            <li className="items-end">
              <Link to="/winkelmand">
                <IconButton disableRipple={true}>
                  <IoCart className="text-red-600" size={38} />
                </IconButton>
              </Link>
            </li>
            <li>
              <IconButton 
                disableRipple={true}
                onClick={handleClick}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                {isAuthed && gebruikerLetter ? <div key={isAuthed}>
                  <Avatar {...letterAvatar(gebruikerLetter)} sx={{ bgcolor: red[600], width: '40px', height: '40px'}} />
                </div> : <div key={isAuthed}>
                  <Avatar sx={{ bgcolor: red[600], width: '40px', height: '40px'}} />
                </div>}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {isAuthed ? <div key={isAuthed}>
                  <Link to="/profiel">
                    <MenuItem>
                      <ListItemIcon>
                        <Person fontSize="small" />
                      </ListItemIcon>
                      Accountoverzicht 
                    </MenuItem>
                  </Link>
                  <Divider />
                  {/* <Link to="/">
                    <MenuItem>
                      <ListItemIcon>
                        <Sell fontSize="small" />
                      </ListItemIcon>
                      Producten
                    </MenuItem>
                  </Link>
                  <Link to="/bestellingen">
                    <MenuItem>
                      <ListItemIcon>
                        <LocalShipping fontSize="small" />
                      </ListItemIcon>
                      Bestellingen
                    </MenuItem>
                  </Link>
                  <Link to="/notificaties">
                    <MenuItem>
                      <ListItemIcon>
                        <Notifications fontSize="small" />
                      </ListItemIcon>
                      Notificaties
                    </MenuItem>
                  </Link> */}
                  <Link to="/logout">
                    <MenuItem>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Uitloggen
                    </MenuItem>
                  </Link>
                </div> : <div key={isAuthed}>
                  <Link to="/login">
                    <MenuItem>
                      <ListItemIcon>
                        <Login fontSize="small" />
                      </ListItemIcon>
                      Inloggen
                    </MenuItem>
                  </Link>
                  {/*<Divider />
                   <Link to="/">
                    <MenuItem>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Producten
                    </MenuItem>
                  </Link> */}
                </div>}
              </Menu>
            </li>
          </ul>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
